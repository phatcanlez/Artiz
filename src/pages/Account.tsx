import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Account: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-16 px-5">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-10">
            <h1 className="text-[#F3FAF4] text-[48px] font-bold mb-4">
              Tài khoản của tôi
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Quản lý thông tin tài khoản và đơn hàng
            </p>
          </div>

          {/* User Info Section */}
          <div className="flex flex-col mb-8">
            <label htmlFor="name" className="text-[#F3FAF4] text-xl mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              readOnly
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9] cursor-not-allowed"
            />

            <label htmlFor="email" className="text-[#F3FAF4] text-xl mt-6 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              readOnly
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9] cursor-not-allowed"
            />

            {user.phone && (
              <>
                <label
                  htmlFor="phone"
                  className="text-[#F3FAF4] text-xl mt-6 mb-2"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={user.phone}
                  readOnly
                  className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9] cursor-not-allowed"
                />
              </>
            )}

            <label htmlFor="role" className="text-[#F3FAF4] text-xl mt-6 mb-2">
              Vai trò
            </label>
            <input
              type="text"
              id="role"
              value={isAdmin ? "Admin" : "User"}
              readOnly
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9] cursor-not-allowed"
            />
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => navigate("/cart")}
            className="flex flex-col relative aspect-[6.746] w-full items-center text-2xl text-[#102314] font-bold justify-center mt-8 px-10 py-4 rounded-md hover:opacity-90 transition-opacity"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
              className="absolute h-full w-full object-cover inset-0 rounded-md"
              alt=""
            />
            <span className="relative">Xem giỏ hàng</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex flex-col relative aspect-[6.746] w-full items-center text-xl text-white font-bold justify-center mt-6 px-10 py-4 rounded-md hover:opacity-90 transition-opacity bg-red-600/80 border border-red-500"
          >
            <span className="relative">Đăng xuất</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
