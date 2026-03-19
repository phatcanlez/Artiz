import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 50000; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[1240px] min-w-0">
          <div className="mb-6 sm:mb-10 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 px-2">
              <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold">
                Giỏ Hàng
              </h1>
            </div>
            <p className="text-[#F3FAF4]/70 text-base">
              {cartItems.length} {cartItems.length === 1 ? "sản phẩm" : "sản phẩm"} trong
              giỏ hàng của bạn
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="w-24 h-24 mx-auto mb-6 text-[#F3FAF4]/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-[#F3FAF4] text-2xl font-bold mb-4">
                Giỏ hàng trống
              </h2>
              <p className="text-[#F3FAF4]/70 mb-8">
                Bắt đầu mua sắm để thêm sản phẩm vào giỏ hàng
              </p>
              <Link
                to="/products"
                className="inline-block px-12 py-5 rounded-lg bg-black border border-white/30 text-white text-xl font-bold hover:bg-[#44FF00] hover:text-[#102314] hover:border-[#44FF00] transition-colors"
              >
                TIẾP TỤC MUA SẮM
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="min-w-0">
                          <h3 className="text-[#F3FAF4] text-base sm:text-xl font-bold mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          {item.color && (
                            <p className="text-[#F3FAF4]/70 text-sm mb-1">
                              Color:{" "}
                              <span className="text-[#F3FAF4]">
                                {item.color}
                              </span>
                            </p>
                          )}
                          {item.size && (
                            <p className="text-[#F3FAF4]/70 text-sm">
                              Size:{" "}
                              <span className="text-[#F3FAF4]">
                                {item.size}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#F3FAF4]/70 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="w-8 h-8 rounded border border-white/30 text-[#F3FAF4] hover:bg-white/10 transition-colors flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span className="text-[#F3FAF4] text-lg font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded border border-white/30 text-[#F3FAF4] hover:bg-white/10 transition-colors flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-[#F3FAF4] text-xl font-bold">
                            {formatPrice(item.price * item.quantity)} VND
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[#F3FAF4]/50 text-sm">
                              {formatPrice(item.price)} / cái
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-4">
                  <h2 className="text-[#F3FAF4] text-2xl font-bold mb-6">
                    Tóm Tắt Đơn Hàng
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

                  <Link
                    to="/checkout"
                    className="block w-full text-center py-4 rounded-md bg-black border border-white/30 text-white text-2xl font-bold hover:bg-[#44FF00] hover:text-[#102314] hover:border-[#44FF00] transition-colors mb-4"
                  >
                    CHECKOUT
                  </Link>

                  <Link
                    to="/products"
                    className="block text-center text-[#F3FAF4]/70 transition-colors text-sm"
                  >
                    ← Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
