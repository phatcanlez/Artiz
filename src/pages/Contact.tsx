import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "feedback", // feedback or contact
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Vui lòng nhập chủ đề";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulate form submission
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "feedback",
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-16 px-5">
        <div className="w-full max-w-[1240px]">
          {/* Header Section */}
          <div className="text-center mb-12 flex flex-col items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-[#F3FAF4] text-[48px] font-bold">
                Contact Us
              </h1>
            </div>
            <p className="text-[#F3FAF4]/70 text-lg mt-4">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h2 className="text-[#F3FAF4] text-2xl font-bold mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
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
                  <p className="text-lg font-semibold mb-2">Cảm ơn bạn!</p>
                  <p className="text-sm">
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm
                    nhất có thể.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type Selection */}
                  <div>
                    <label className="text-[#F3FAF4] text-lg mb-2 block">
                      Loại liên hệ *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-neutral-400 text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9]"
                    >
                      <option value="feedback">Feedback / Góp ý</option>
                      <option value="contact">Liên hệ nhân viên</option>
                      <option value="support">Hỗ trợ kỹ thuật</option>
                      <option value="partnership">Hợp tác</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[#F3FAF4] text-lg mb-2 block"
                    >
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white border text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9] ${
                        errors.name ? "border-red-500" : "border-neutral-400"
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-[#F3FAF4] text-lg mb-2 block"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-white border text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9] ${
                          errors.email ? "border-red-500" : "border-neutral-400"
                        }`}
                        placeholder="Nhập email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-[#F3FAF4] text-lg mb-2 block"
                      >
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-white border text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9] ${
                          errors.phone ? "border-red-500" : "border-neutral-400"
                        }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="text-[#F3FAF4] text-lg mb-2 block"
                    >
                      Chủ đề *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full bg-white border text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9] ${
                        errors.subject ? "border-red-500" : "border-neutral-400"
                      }`}
                      placeholder="Nhập chủ đề"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-[#F3FAF4] text-lg mb-2 block"
                    >
                      Nội dung *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full bg-white border text-base text-[rgba(152,152,152,1)] px-4 py-3 rounded-md outline-none focus:border-[#D9D9D9] resize-none ${
                        errors.message ? "border-red-500" : "border-neutral-400"
                      }`}
                      placeholder="Nhập nội dung tin nhắn của bạn"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full relative aspect-[6.746] flex items-center justify-center text-2xl text-[#102314] font-bold py-4 rounded-md hover:opacity-90 transition-opacity"
                  >
                    <img
                      src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                      className="absolute h-full w-full object-cover inset-0 rounded-md"
                      alt=""
                    />
                    <span className="relative text-center">SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                <h2 className="text-[#F3FAF4] text-2xl font-bold mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#F3FAF4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#F3FAF4] font-bold mb-1">Email</h3>
                      <p className="text-[#F3FAF4]/70">
                        support@artizstudio.com
                      </p>
                      <p className="text-[#F3FAF4]/70">info@artizstudio.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#F3FAF4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#F3FAF4] font-bold mb-1">Phone</h3>
                      <p className="text-[#F3FAF4]/70">+84 123 456 789</p>
                      <p className="text-[#F3FAF4]/70">+84 987 654 321</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#F3FAF4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#F3FAF4] font-bold mb-1">Address</h3>
                      <p className="text-[#F3FAF4]/70">
                        123 Đường ABC, Quận XYZ
                        <br />
                        Thành phố Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#F3FAF4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#F3FAF4] font-bold mb-1">
                        Business Hours
                      </h3>
                      <p className="text-[#F3FAF4]/70">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-[#F3FAF4]/70">
                        Saturday: 9:00 AM - 4:00 PM
                      </p>
                      <p className="text-[#F3FAF4]/70">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
