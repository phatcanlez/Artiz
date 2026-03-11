import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, type FeedbackDto, type OrderDto } from "@/lib/api";

const statusLabel: Record<string, string> = {
  // Trạng thái tiếng Anh cũ
  Pending: "Chờ thanh toán",
  Processing: "Đã xác nhận và đang chuẩn bị",
  Shipped: "Đang giao hàng",
  Delivered: "Thành công",
  Cancelled: "Đã hủy",
  // Trạng thái tiếng Việt mới
  "Đã đặt hàng": "Đã đặt hàng",
  "Chờ thanh toán": "Chờ thanh toán",
  "Chờ xác nhận": "Chờ xác nhận",
  "Đã xác nhận và đang chuẩn bị": "Đã xác nhận và đang chuẩn bị",
  "Đang giao hàng": "Đang giao hàng",
  "Thành công": "Thành công",
  "Đã hủy": "Đã hủy",
};

const paymentStatusLabel: Record<string, string> = {
  Pending: "Chờ thanh toán",
  Processing: "Đã thanh toán",
  Shipped: "Đã thanh toán",
  Delivered: "Đã thanh toán",
  Cancelled: "Đã hủy",
  "Chờ thanh toán": "Chờ thanh toán",
  "Chờ xác nhận": "Chờ thanh toán (COD)",
  "Đã xác nhận và đang chuẩn bị": "Đã thanh toán / chuẩn bị",
  "Đang giao hàng": "Đang giao / đã thanh toán",
  "Thành công": "Thành công",
  "Đã hủy": "Đã hủy",
};

const Account: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [payingOrderId, setPayingOrderId] = useState<number | null>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackDto[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setOrdersLoading(true);
    setOrdersError(null);
    apiClient
      .getMyOrders()
      .then(setOrders)
      .catch((e) => setOrdersError(e instanceof Error ? e.message : "Không tải được đơn hàng"))
      .finally(() => setOrdersLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setFeedbackLoading(true);
    setFeedbackError(null);
    apiClient
      .getMyFeedback()
      .then(setFeedback)
      .catch((e) => setFeedbackError(e instanceof Error ? e.message : "Không tải được phản hồi"))
      .finally(() => setFeedbackLoading(false));
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatPrice = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return s;
    }
  };

  const formatDateTime = (s?: string) => {
    if (!s) return "";
    try {
      return new Date(s).toLocaleString("vi-VN");
    } catch {
      return s;
    }
  };

  const submitSePayForm = (checkoutUrl: string, fields: Record<string, string>) => {
    // Thứ tự input theo doc SePay (có payment_method).
    const formFieldOrder = [
      "merchant",
      "currency",
      "order_amount",
      "operation",
      "payment_method",
      "order_description",
      "order_invoice_number",
      "customer_id",
      "success_url",
      "error_url",
      "cancel_url",
      "signature",
    ];
    const form = document.createElement("form");
    form.method = "POST";
    form.action = checkoutUrl;
    for (const name of formFieldOrder) {
      const value = fields[name];
      if (value == null) continue;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  };

  const handlePayNow = async (order: OrderDto, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOrdersError(null);
    setPayingOrderId(order.id);
    try {
      const sepay = await apiClient.createSePayCheckoutForOrder(order.id);
      submitSePayForm(sepay.checkoutUrl, sepay.fields);
    } catch (err) {
      setOrdersError(err instanceof Error ? err.message : "Không thể tạo thanh toán SePay");
    } finally {
      setPayingOrderId(null);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[700px] min-w-0">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold mb-2">
              Tài khoản của tôi
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Quản lý thông tin tài khoản và đơn hàng
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex flex-col gap-5 mb-8">
              <div>
                <label htmlFor="account-name" className="text-[#F3FAF4] text-sm font-medium mb-2 block">Họ và tên</label>
                <input
                  id="account-name"
                  type="text"
                  value={user.name}
                  readOnly
                  aria-label="Họ và tên"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label htmlFor="account-email" className="text-[#F3FAF4] text-sm font-medium mb-2 block">Email</label>
                <input
                  id="account-email"
                  type="email"
                  value={user.email}
                  readOnly
                  aria-label="Email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                />
              </div>
              {user.phone && (
                <div>
                  <label htmlFor="account-phone" className="text-[#F3FAF4] text-sm font-medium mb-2 block">Số điện thoại</label>
                  <input
                    id="account-phone"
                    type="tel"
                    value={user.phone}
                    readOnly
                    aria-label="Số điện thoại"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                  />
                </div>
              )}
              <div>
                <label htmlFor="account-role" className="text-[#F3FAF4] text-sm font-medium mb-2 block">Vai trò</label>
                <input
                  id="account-role"
                  type="text"
                  value={isAdmin ? "Admin" : "User"}
                  readOnly
                  aria-label="Vai trò"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="w-full py-4 rounded-lg bg-black border border-white/30 text-white text-lg font-bold hover:bg-[#44FF00] hover:text-[#102314] hover:border-[#44FF00] transition-colors"
            >
              Xem giỏ hàng
            </button>
            <button
              onClick={handleLogout}
              className="w-full mt-4 py-4 rounded-lg border-2 border-red-500 text-red-400 font-bold hover:bg-red-500/10 transition-colors"
            >
              Đăng xuất
            </button>
          </div>

          {/* Lịch sử đơn hàng */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-[#F3FAF4] text-xl font-bold">Lịch sử đơn hàng</h2>
              {!ordersLoading && !ordersError && orders.length > 5 && (
                <button
                  onClick={() => setShowAllOrders((v) => !v)}
                  className="px-3 py-1.5 rounded-md border border-white/30 text-[#F3FAF4] text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  {showAllOrders ? "Thu gọn" : "Xem tất cả"}
                </button>
              )}
            </div>
            {ordersLoading ? (
              <p className="text-[#F3FAF4]/70">Đang tải...</p>
            ) : ordersError ? (
              <p className="text-red-400">{ordersError}</p>
            ) : orders.length === 0 ? (
              <p className="text-[#F3FAF4]/70">Bạn chưa có đơn hàng nào.</p>
            ) : (
              <div className="space-y-4">
                {(showAllOrders ? orders : orders.slice(0, 5)).map((order) => (
                  <div
                    key={order.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer hover:border-[#44FF00]/60 transition-colors"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[#F3FAF4] font-semibold">{order.orderInvoiceNumber}</span>
                      <span className="text-[#F3FAF4]/70 text-sm">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-[#F3FAF4]/70">
                        {order.items.length} sản phẩm · {formatPrice(order.totalAmount)} VND
                      </span>
                      <span className="text-[#44FF00]">
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </div>
                    {(order.status === "Chờ thanh toán" || order.status === "Pending") && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={(e) => handlePayNow(order, e)}
                          disabled={payingOrderId === order.id}
                          className="px-4 py-2 rounded-md bg-[#44FF00] text-[#102314] font-bold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {payingOrderId === order.id ? "Đang chuyển..." : "Thanh toán ngay"}
                        </button>
                      </div>
                    )}
                    {order.shippingAddress && (
                      <p className="text-[#F3FAF4]/50 text-xs mt-2 truncate" title={order.shippingAddress}>
                        {order.shippingAddress}
                      </p>
                    )}
                  </div>
                ))}
                {!showAllOrders && orders.length > 5 && (
                  <p className="text-[#F3FAF4]/50 text-xs">
                    Đang hiển thị 5/{orders.length} đơn gần nhất.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Phản hồi của tôi */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-[#F3FAF4] text-xl font-bold">Phản hồi của tôi</h2>
              <button
                onClick={() => {
                  setFeedbackLoading(true);
                  setFeedbackError(null);
                  apiClient
                    .getMyFeedback()
                    .then(setFeedback)
                    .catch((e) => setFeedbackError(e instanceof Error ? e.message : "Không tải được phản hồi"))
                    .finally(() => setFeedbackLoading(false));
                }}
                className="px-3 py-1.5 rounded-md border border-white/30 text-[#F3FAF4] text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-60"
                disabled={feedbackLoading}
              >
                {feedbackLoading ? "Đang tải..." : "Tải lại"}
              </button>
            </div>

            {feedbackError ? (
              <p className="text-red-400">{feedbackError}</p>
            ) : feedbackLoading ? (
              <p className="text-[#F3FAF4]/70">Đang tải...</p>
            ) : feedback.length === 0 ? (
              <p className="text-[#F3FAF4]/70">Bạn chưa gửi phản hồi nào.</p>
            ) : (
              <div className="space-y-4">
                {feedback.map((f) => (
                  <div key={f.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[#F3FAF4] font-semibold">
                        {formatDateTime(f.createdAt)}
                      </span>
                      <span className={f.repliedAt ? "text-[#44FF00] text-sm font-semibold" : "text-[#F3FAF4]/60 text-sm"}>
                        {f.repliedAt ? "Đã được phản hồi" : "Chưa phản hồi"}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-[#F3FAF4]/70 text-xs mb-1">Nội dung bạn gửi</p>
                      <p className="text-[#F3FAF4] whitespace-pre-wrap text-sm">{f.message}</p>
                    </div>
                    {f.adminReply && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <p className="text-[#44FF00] text-xs mb-1">
                          Phản hồi từ Artiz {f.repliedAt ? `(${formatDateTime(f.repliedAt)})` : ""}
                        </p>
                        <p className="text-[#F3FAF4] whitespace-pre-wrap text-sm">{f.adminReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Lịch sử thanh toán */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-[#F3FAF4] text-xl font-bold mb-4">Lịch sử thanh toán</h2>
            {ordersLoading ? (
              <p className="text-[#F3FAF4]/70">Đang tải...</p>
            ) : ordersError ? (
              <p className="text-red-400">{ordersError}</p>
            ) : orders.length === 0 ? (
              <p className="text-[#F3FAF4]/70">Chưa có giao dịch thanh toán nào.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[#F3FAF4]/70 border-b border-white/20">
                      <th className="py-2 pr-2">Mã đơn</th>
                      <th className="py-2 pr-2">Số tiền</th>
                      <th className="py-2 pr-2">Ngày</th>
                      <th className="py-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/10">
                        <td className="py-3 pr-2 text-[#F3FAF4] font-medium">{order.orderInvoiceNumber}</td>
                        <td className="py-3 pr-2 text-[#F3FAF4]">{formatPrice(order.totalAmount)} VND</td>
                        <td className="py-3 pr-2 text-[#F3FAF4]/80">{formatDate(order.createdAt)}</td>
                        <td className="py-3 text-[#44FF00]">
                          {paymentStatusLabel[order.status] ?? order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
