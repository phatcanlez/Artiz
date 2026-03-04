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
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="w-full max-w-[500px] min-w-0">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[#F3FAF4] text-3xl sm:text-4xl md:text-[48px] font-bold mb-2">
              Login
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Đăng nhập để tiếp tục mua sắm
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
                  placeholder="Nhập mật khẩu"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:border-[#44FF00] focus:ring-1 focus:ring-[#44FF00]/50 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-[#44FF00]"
                  />
                  <span className="text-[#F3FAF4] text-sm">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#44FF00] text-sm hover:opacity-90 transition-opacity"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 rounded-lg bg-[#44FF00] text-[#102314] text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-[#F3FAF4]/70 text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-[#44FF00] font-semibold hover:opacity-90"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
