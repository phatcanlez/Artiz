import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError("Vui lòng nhập email của bạn");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    // Simulate password reset (replace with actual API call)
    console.log("Password reset request for:", email);
    setSuccess(true);
    setError("");

    // Optionally navigate after a delay
    // setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[500px] min-w-0">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold mb-2">
              Quên mật khẩu
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Nhập email để nhận link đặt lại mật khẩu
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
            {success ? (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#44FF00]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#44FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#F3FAF4] text-lg font-semibold mb-2">Email đã được gửi!</p>
                <p className="text-[#F3FAF4]/70 text-sm mb-6">
                  Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư.
                </p>
                <Link to="/login" className="inline-block w-full py-3 rounded-lg bg-[#44FF00] text-[#102314] font-bold text-center hover:opacity-90 transition-opacity">
                  Quay lại đăng nhập
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-[#F3FAF4] p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="text-[#F3FAF4] text-sm font-medium mb-2 block">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    required
                    placeholder="Nhập email của bạn"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                  />
                </div>
                <button type="submit" className="w-full py-4 rounded-lg bg-[#44FF00] text-[#102314] text-lg font-bold hover:opacity-90 transition-opacity">
                  Gửi yêu cầu
                </button>
              </form>
            )}
          </div>

          <p className="text-center mt-6">
            <Link to="/login" className="text-[#44FF00] text-sm hover:opacity-90 transition-opacity">
              ← Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
