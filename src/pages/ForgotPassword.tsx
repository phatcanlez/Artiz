import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Vui lòng nhập email của bạn');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    // Simulate password reset (replace with actual API call)
    console.log('Password reset request for:', email);
    setSuccess(true);
    setError('');
    
    // Optionally navigate after a delay
    // setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 py-16 px-5">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-10">
            <h1 className="text-[#F3FAF4] text-[48px] font-bold mb-4">
              Forgot Password
            </h1>
            <p className="text-[#F3FAF4]/70 text-base">
              Nhập email của bạn để nhận link đặt lại mật khẩu
            </p>
          </div>

          {success ? (
            <div className="bg-green-500/20 border border-green-500 text-[#F3FAF4] p-6 rounded-md text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-green-500"
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
              <p className="text-lg font-semibold mb-2">Email đã được gửi!</p>
              <p className="text-sm">
                Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn.
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </p>
              <Link
                to="/login"
                className="inline-block mt-6 text-[#F3FAF4] font-semibold hover:opacity-80 transition-opacity underline"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
                placeholder="Nhập email của bạn"
                className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] px-4 py-3 rounded-md border-solid outline-none focus:border-[#D9D9D9]"
              />

              <button
                type="submit"
                className="flex flex-col relative aspect-[6.746] w-full items-center text-2xl text-[#102314] font-bold justify-center mt-8 px-10 py-4 rounded-md hover:opacity-90 transition-opacity"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                  className="absolute h-full w-full object-cover inset-0 rounded-md"
                  alt=""
                />
                <span className="relative">Gửi yêu cầu</span>
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-[#F3FAF4]/70 text-sm hover:text-[#F3FAF4] transition-colors"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;

