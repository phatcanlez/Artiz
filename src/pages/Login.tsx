import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const parsed = JSON.parse(storedUser) as { isAdmin?: boolean };
        if (parsed.isAdmin) {
          navigate("/admin");
          return;
        }
      }
      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
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
            <h1 className="text-[#F3FAF4] text-[48px] font-bold mb-4">Login</h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Đăng nhập để tiếp tục mua sắm
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-[#F3FAF4] p-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <label htmlFor="email" className="text-[#F3FAF4] text-xl mb-2">
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

            <label
              htmlFor="password"
              className="text-[#F3FAF4] text-xl mt-6 mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Nhập mật khẩu"
              className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
            />

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#D9D9D9]" />
                <span className="text-[#F3FAF4] text-sm">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#F3FAF4]/70 text-sm hover:text-[#F3FAF4] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

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
                {loading ? "Đang đăng nhập..." : "Login"}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#F3FAF4]/70 text-sm">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-[#F3FAF4] font-semibold hover:opacity-80 transition-opacity"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
