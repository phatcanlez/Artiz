import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, type OrderDto } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const statusLabel: Record<string, string> = {
  Pending: "Chờ thanh toán",
  Processing: "Đã xác nhận và đang chuẩn bị",
  Shipped: "Đang giao hàng",
  Delivered: "Thành công",
  Cancelled: "Đã hủy",
  "Đã đặt hàng": "Đã đặt hàng",
  "Chờ thanh toán": "Chờ thanh toán",
  "Chờ xác nhận": "Chờ xác nhận",
  "Đã xác nhận và đang chuẩn bị": "Đã xác nhận và đang chuẩn bị",
  "Đang giao hàng": "Đang giao hàng",
  "Thành công": "Thành công",
  "Đã hủy": "Đã hủy",
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/orders/${id}` } });
    }
  }, [isAuthenticated, id, navigate]);

  useEffect(() => {
    if (!isAuthenticated || !id) return;
    const numId = Number(id);
    if (!Number.isFinite(numId)) {
      setError("Mã đơn hàng không hợp lệ.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    apiClient
      .getOrder(numId)
      .then(setOrder)
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "Không tải được chi tiết đơn hàng.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN").format(n);
  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleString("vi-VN");
    } catch {
      return s;
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[900px] min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="text-[#F3FAF4]/70 text-sm mb-4 hover:text-[#F3FAF4] transition-colors"
          >
            ← Quay lại
          </button>

          <h1 className="text-[#F3FAF4] text-2xl sm:text-3xl font-bold mb-4">
            Chi tiết đơn hàng
          </h1>

          {loading ? (
            <div className="text-[#F3FAF4]/70 flex items-center gap-3">
              <Spinner sizeClassName="h-6 w-6" />
              <span>Đang tải...</span>
            </div>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : !order ? (
            <p className="text-[#F3FAF4]/70">
              Không tìm thấy đơn hàng hoặc bạn không có quyền xem đơn này.
            </p>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[#F3FAF4]/70 text-sm">Mã đơn</p>
                    <p className="text-[#F3FAF4] text-lg font-semibold">
                      {order.orderInvoiceNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F3FAF4]/70 text-sm">Ngày đặt</p>
                    <p className="text-[#F3FAF4] text-sm">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[#F3FAF4]/70 text-sm">Trạng thái</p>
                    <p className="text-[#44FF00] font-semibold">
                      {statusLabel[order.status] ?? order.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F3FAF4]/70 text-sm">Tổng tiền</p>
                    <p className="text-[#F3FAF4] text-lg font-bold">
                      {formatPrice(order.totalAmount)} VND
                    </p>
                  </div>
                </div>
                {order.shippingAddress && (
                  <p className="text-[#F3FAF4]/70 text-sm mt-4">
                    <span className="text-[#F3FAF4] font-medium">
                      Địa chỉ giao hàng:
                    </span>{" "}
                    {order.shippingAddress}
                  </p>
                )}
                {order.phone && (
                  <p className="text-[#F3FAF4]/70 text-sm mt-1">
                    <span className="text-[#F3FAF4] font-medium">Số điện thoại:</span>{" "}
                    {order.phone}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-[#F3FAF4] text-xl font-bold mb-4">
                  Sản phẩm trong đơn
                </h2>
                {order.items.length === 0 ? (
                  <p className="text-[#F3FAF4]/70 text-sm">
                    Không có sản phẩm nào trong đơn.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0"
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/10">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-[#F3FAF4]/50">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#F3FAF4] font-medium truncate">
                            {item.productName}
                          </p>
                          <p className="text-[#F3FAF4]/70 text-sm mt-1">
                            Số lượng:{" "}
                            <span className="text-[#F3FAF4] font-semibold">
                              {item.quantity}
                            </span>
                          </p>
                          <p className="text-[#F3FAF4]/70 text-sm">
                            Đơn giá:{" "}
                            <span className="text-[#F3FAF4] font-semibold">
                              {formatPrice(item.price)} VND
                            </span>
                          </p>
                          <p className="text-[#F3FAF4]/70 text-sm">
                            Thành tiền:{" "}
                            <span className="text-[#F3FAF4] font-semibold">
                              {formatPrice(item.price * item.quantity)} VND
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetail;

