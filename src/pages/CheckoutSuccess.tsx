import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CheckoutSuccess: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

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
              Order Successful!
            </h1>
          </div>
          <p className="text-[#F3FAF4]/70 text-lg mb-8">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và sẽ được
            xử lý sớm nhất.
          </p>

          {/* Order Details */}
          {orderData && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-[#F3FAF4] text-xl font-bold mb-4">
                Order Details
              </h2>
              <div className="space-y-2 text-[#F3FAF4]/70">
                <p>
                  <span className="text-[#F3FAF4]">Name:</span>{" "}
                  {orderData.fullName}
                </p>
                <p>
                  <span className="text-[#F3FAF4]">Email:</span>{" "}
                  {orderData.email}
                </p>
                <p>
                  <span className="text-[#F3FAF4]">Phone:</span>{" "}
                  {orderData.phone}
                </p>
                <p>
                  <span className="text-[#F3FAF4]">Address:</span>{" "}
                  {orderData.address}
                </p>
                <p>
                  <span className="text-[#F3FAF4]">City:</span> {orderData.city}
                </p>
                <p>
                  <span className="text-[#F3FAF4]">Payment:</span>{" "}
                  {orderData.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Bank Transfer"}
                </p>
              </div>
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
                CONTINUE SHOPPING
              </span>
            </Link>
            <Link
              to="/"
              className="px-12 py-5 rounded-lg border-2 border-white text-white font-bold text-xl hover:bg-white transition-colors"
            >
              BACK TO HOME
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
