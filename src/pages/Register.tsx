import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Terms acceptance
    if (!acceptTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone || undefined,
      );
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[500px] min-w-0">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[#F3FAF4] text-3xl sm:text-4xl md:text-[48px] font-bold mb-2">
              Đăng ký
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Tạo tài khoản mới để bắt đầu mua sắm
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-[#F3FAF4] p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập họ và tên"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>
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
                  required
                  placeholder="Nhập email của bạn"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại (tùy chọn)"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[#F3FAF4] text-sm font-medium mb-2 block"
                >
                  Xác nhận mật khẩu *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-[#44FF00]"
                />
                <span className="text-[#F3FAF4] text-sm">
                  Tôi đồng ý với{" "}
                  <Link
                    to="#terms"
                    className="text-[#44FF00] underline hover:opacity-90"
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    to="#privacy"
                    className="text-[#44FF00] underline hover:opacity-90"
                  >
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 rounded-lg bg-[#44FF00] text-[#102314] text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-[#F3FAF4]/70 text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-[#44FF00] font-semibold hover:opacity-90"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
