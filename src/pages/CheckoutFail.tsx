import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CheckoutFail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const handleRetry = () => {
    // Navigate back to checkout with the same data
    navigate("/checkout", { state: { orderData } });
  };

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-16 px-5">
        <div className="w-full max-w-[600px] text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-[#F3FAF4] text-[48px] font-bold">
              Payment Failed
            </h1>
          </div>
          <p className="text-[#F3FAF4]/70 text-lg mb-4">
            Rất tiếc, thanh toán của bạn không thành công.
          </p>
          <p className="text-[#F3FAF4]/50 text-sm mb-8">
            Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau.
          </p>

          {/* Possible Reasons */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-[#F3FAF4] text-xl font-bold mb-4">
              Có thể do:
            </h2>
            <ul className="space-y-2 text-[#F3FAF4]/70 list-disc list-inside">
              <li>Thông tin thẻ không chính xác</li>
              <li>Số dư tài khoản không đủ</li>
              <li>Kết nối mạng không ổn định</li>
              <li>Hệ thống đang bảo trì</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="relative px-12 py-5 rounded-lg overflow-hidden group"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                className="absolute h-full w-full object-cover inset-0 rounded-lg"
                alt=""
              />
              <span className="relative z-10 text-xl font-bold text-[#102314] group-hover:opacity-90 transition-opacity">
                TRY AGAIN
              </span>
            </button>
            <Link
              to="/cart"
              className="px-12 py-5 rounded-lg border-2 border-white text-white font-bold text-xl hover:bg-white hover:text-black transition-colors"
            >
              BACK TO CART
            </Link>
          </div>

          {/* Support Info */}
          <p className="text-[#F3FAF4]/50 text-sm mt-8">
            Nếu vấn đề vẫn tiếp tục, vui lòng{" "}
            <Link
              to="#contact"
              className="text-[#F3FAF4] underline hover:opacity-80"
            >
              liên hệ hỗ trợ
            </Link>{" "}
            của chúng tôi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutFail;
