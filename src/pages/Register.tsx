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
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-16 px-5">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-[#F3FAF4] text-[48px] font-bold">Register</h1>
            </div>
            <p className="text-[#F3FAF4]/70 text-base">
              Tạo tài khoản mới để bắt đầu mua sắm
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-[#F3FAF4] p-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <label htmlFor="name" className="text-[#F3FAF4] text-xl mb-2">
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
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <label htmlFor="email" className="text-[#F3FAF4] text-xl mt-6 mb-2">
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
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <label htmlFor="phone" className="text-[#F3FAF4] text-xl mt-6 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại (tùy chọn)"
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <label
              htmlFor="password"
              className="text-[#F3FAF4] text-xl mt-6 mb-2"
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
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <label
              htmlFor="confirmPassword"
              className="text-[#F3FAF4] text-xl mt-6 mb-2"
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
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <label className="flex items-start gap-2 mt-6 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-1 accent-[#D9D9D9]"
              />
              <span className="text-[#F3FAF4] text-sm">
                Tôi đồng ý với{" "}
                <Link
                  to="#terms"
                  className="text-[#F3FAF4] underline hover:opacity-80"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  to="#privacy"
                  className="text-[#F3FAF4] underline hover:opacity-80"
                >
                  Chính sách bảo mật
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-col relative aspect-[6.746] w-full items-center text-2xl text-[#102314] font-bold justify-center mt-8 px-10 py-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                className="absolute h-full w-full object-cover inset-0 rounded-md"
                alt=""
              />
              <span className="relative">
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#F3FAF4]/70 text-sm">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-[#F3FAF4] font-semibold hover:opacity-80 transition-opacity"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
