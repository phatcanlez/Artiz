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
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[500px] min-w-0">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold mb-2">
              Tài khoản của tôi
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Quản lý thông tin tài khoản và đơn hàng
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col gap-5 mb-8">
              <div>
                <label
                  htmlFor="name"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  readOnly
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                />
              </div>
              {user.phone && (
                <div>
                  <label
                    htmlFor="phone"
                    className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={user.phone}
                    readOnly
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4]/90 cursor-not-allowed outline-none"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="role"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Vai trò
                </label>
                <input
                  type="text"
                  id="role"
                  value={isAdmin ? "Admin" : "User"}
                  readOnly
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
