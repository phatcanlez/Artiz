import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { apiClient } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const SHIPPING_COST = 50000;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod", // cod = cash on delivery
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Vui lòng nhập thành phố";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Vui lòng nhập mã bưu điện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || cartItems.length === 0) return;

    setSubmitting(true);
    try {
      const addressLine = [formData.address, formData.city, formData.postalCode]
        .filter(Boolean)
        .join(", ");
      const order = await apiClient.createOrder({
        shippingAddress: addressLine || formData.address,
        phone: formData.phone,
        fullName: formData.fullName,
        email: formData.email,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      if (formData.paymentMethod === "bank") {
        const sepay = await apiClient.createSePayCheckout({
          OrderInvoiceNumber: order.orderInvoiceNumber,
          OrderAmount: order.totalAmount,
          Currency: "VND",
          OrderDescription: `Don hang ${order.orderInvoiceNumber}`,
          PaymentMethod: "BANK_TRANSFER",
        });
        // Thứ tự input PHẢI đúng form doc SePay. Nếu có payment_method thì nằm sau operation.
        const formFieldOrder = ["merchant", "currency", "order_amount", "operation", "payment_method", "order_description", "order_invoice_number", "customer_id", "success_url", "error_url", "cancel_url", "signature"];
        const form = document.createElement("form");
        form.method = "POST";
        form.action = sepay.checkoutUrl;
        for (const name of formFieldOrder) {
          const value = sepay.fields[name];
          if (value == null) continue;
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
        return; // Giỏ sẽ được xóa khi user quay lại trang success (CheckoutSuccess)
      }

      clearCart();
      navigate("/checkout/success", {
        state: { orderData: formData, orderId: order.orderId, orderInvoiceNumber: order.orderInvoiceNumber, totalAmount: order.totalAmount },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đặt hàng thất bại. Vui lòng thử lại.";
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const subtotal = cartSubtotal;
  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[1240px] min-w-0">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold">
              Thanh toán
            </h1>
            <p className="text-[#F3FAF4]/70 text-base mt-2">
              Điền thông tin giao hàng và xác nhận đơn hàng
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Shipping Information */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <h2 className="text-[#F3FAF4] text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Thông tin giao hàng
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                    >
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-white/20 focus:border-[#44FF00]"
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 ${errors.email ? "border-red-500" : "border-white/20 focus:border-[#44FF00]"}`}
                        placeholder="Nhập email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                      >
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 ${errors.phone ? "border-red-500" : "border-white/20 focus:border-[#44FF00]"}`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                    >
                      Địa chỉ *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 resize-none ${errors.address ? "border-red-500" : "border-white/20 focus:border-[#44FF00]"}`}
                      placeholder="Nhập địa chỉ giao hàng"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                      >
                        Thành phố *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 ${errors.city ? "border-red-500" : "border-white/20 focus:border-[#44FF00]"}`}
                        placeholder="Nhập thành phố"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                      >
                        Mã bưu điện *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 ${errors.postalCode ? "border-red-500" : "border-white/20 focus:border-[#44FF00]"}`}
                        placeholder="Nhập mã bưu điện"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-[#F3FAF4] text-xl font-bold mb-6">
                  Phương thức thanh toán
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-[#44FF00]"
                    />
                    <div className="flex-1">
                      <span className="text-[#F3FAF4] text-lg font-medium">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <p className="text-[#F3FAF4]/70 text-sm">
                        Thanh toán khi nhận hàng
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-[#44FF00]"
                    />
                    <div className="flex-1">
                      <span className="text-[#F3FAF4] text-lg font-medium">
                        Chuyển khoản ngân hàng
                      </span>
                      <p className="text-[#F3FAF4]/70 text-sm">
                        Chuyển khoản ngân hàng
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-4">
                <h2 className="text-[#F3FAF4] text-xl font-bold mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#F3FAF4]/70">
                    <span>Tạm tính</span>
                    <span className="text-[#F3FAF4]">
                      {formatPrice(subtotal)} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-[#F3FAF4]/70">
                    <span>Vận chuyển</span>
                    <span className="text-[#F3FAF4]">
                      {formatPrice(shipping)} VND
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="text-[#F3FAF4] text-xl font-bold">
                      Tổng cộng
                    </span>
                    <span className="text-[#F3FAF4] text-xl font-bold">
                      {formatPrice(total)} VND
                    </span>
                  </div>
                </div>

{errors.submit && (
                  <p className="text-red-500 text-sm mb-2">{errors.submit}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-2xl font-bold py-4 rounded-md mb-4 bg-black border border-white/30 text-white hover:bg-[#44FF00] hover:text-[#102314] hover:border-[#44FF00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {submitting && <Spinner sizeClassName="h-6 w-6" />}
                    {submitting ? "Đang xử lý..." : "ĐẶT HÀNG"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
