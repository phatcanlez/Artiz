import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { apiClient, OrderDto } from "@/lib/api";

const CheckoutSuccess: React.FC = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  useEffect(() => {
    clearCart(); // Xóa giỏ khi vào trang success (từ COD hoặc quay lại từ SePay)
  }, [clearCart]);

  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const orderInvoiceFromQuery = search.get("orderId") ?? undefined;
  const paymentFromQuery = search.get("payment") ?? undefined;

  const state = location.state as {
    orderData?: Record<string, unknown>;
    orderId?: number;
    orderInvoiceNumber?: string;
    totalAmount?: number;
  } | null;
  const orderData = state?.orderData;
  const orderId = state?.orderId;
  const orderInvoiceNumber = state?.orderInvoiceNumber ?? orderInvoiceFromQuery;
  const totalAmount = state?.totalAmount ?? order?.totalAmount;

  useEffect(() => {
    if (!orderInvoiceNumber) return;
    if (paymentFromQuery?.toLowerCase() === "success") {
      // Update order status in BE: "Chờ thanh toán" -> "Chờ xác nhận"
      apiClient
        .markOrderPaid(orderInvoiceNumber)
        .then(() => setStatusUpdateError(null))
        .catch((e) => setStatusUpdateError(e instanceof Error ? e.message : "Không thể cập nhật trạng thái đơn"));
    }
    // Nếu user đang đăng nhập, lấy đơn theo danh sách "my orders" để hiển thị thêm thông tin.
    (async () => {
      try {
        const my = await apiClient.getMyOrders();
        const found = my.find((o) => o.orderInvoiceNumber === orderInvoiceNumber) ?? null;
        setOrder(found);
      } catch {
        // ignore (chưa đăng nhập / token hết hạn / không fetch được)
      }
    })();
  }, [orderInvoiceNumber, paymentFromQuery]);

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-16 px-5">
        <div className="w-full max-w-[600px] text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold">
              Đặt Hàng Thành Công!
            </h1>
          </div>
          <p className="text-[#F3FAF4]/70 text-lg mb-8">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và sẽ được
            xử lý sớm nhất.
          </p>
          {paymentFromQuery && (
            <p className="text-[#F3FAF4]/50 text-sm mb-6">
              Trạng thái thanh toán: <strong className="text-[#F3FAF4]">{paymentFromQuery}</strong>
            </p>
          )}
          {statusUpdateError && (
            <p className="text-red-400 text-sm mb-6">
              Không thể cập nhật trạng thái đơn hàng tự động. {statusUpdateError}
            </p>
          )}

          {/* Order Details */}
          {(orderData || orderInvoiceNumber) && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-[#F3FAF4] text-xl font-bold mb-4">
                Chi Tiết Đơn Hàng
              </h2>
              {(orderInvoiceNumber || orderId) && (
                <p className="text-[#F3FAF4]/80 mb-2">
                  Mã đơn: <strong>{orderInvoiceNumber ?? `#${orderId}`}</strong>
                </p>
              )}
              {totalAmount != null && (
                <p className="text-[#F3FAF4]/80 mb-2">
                  Tổng tiền: <strong>{new Intl.NumberFormat("vi-VN").format(totalAmount)} VND</strong>
                </p>
              )}
              {orderData && (
                <>
                  <h2 className="text-[#F3FAF4] text-xl font-bold mb-4 mt-4">
                    Thông tin giao hàng
                  </h2>
                  <div className="space-y-2 text-[#F3FAF4]/70">
                    <p>
                      <span className="text-[#F3FAF4]">Họ và tên:</span>{" "}
                      {(orderData as Record<string, unknown>).fullName as string}
                    </p>
                    <p>
                      <span className="text-[#F3FAF4]">Email:</span>{" "}
                      {(orderData as Record<string, unknown>).email as string}
                    </p>
                    <p>
                      <span className="text-[#F3FAF4]">SĐT:</span>{" "}
                      {(orderData as Record<string, unknown>).phone as string}
                    </p>
                    <p>
                      <span className="text-[#F3FAF4]">Địa chỉ:</span>{" "}
                      {(orderData as Record<string, unknown>).address as string}
                    </p>
                    <p>
                      <span className="text-[#F3FAF4]">Thành phố:</span>{" "}
                      {(orderData as Record<string, unknown>).city as string}
                    </p>
                    <p>
                      <span className="text-[#F3FAF4]">Thanh toán:</span>{" "}
                      {(orderData as Record<string, unknown>).paymentMethod === "cod"
                        ? "Thanh toán khi nhận hàng"
                        : "Chuyển khoản ngân hàng"}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="relative px-12 py-5 rounded-lg overflow-hidden group"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                className="absolute h-full w-full object-cover inset-0 rounded-lg"
                alt=""
              />
              <span className="relative z-10 text-xl font-bold text-[#102314] group-hover:opacity-90 transition-opacity">
                TIẾP TỤC MUA SẮM
              </span>
            </Link>
            <Link
              to="/"
              className="px-12 py-5 rounded-lg border-2 border-white text-white font-bold text-xl hover:bg-white transition-colors"
            >
              VỀ TRANG CHỦ
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-[#F3FAF4]/50 text-sm mt-8">
            Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
