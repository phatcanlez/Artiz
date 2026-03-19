import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";
import { apiClient } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const SVN = "'SVN-Redzone', sans-serif";
const ARIAL = "'Hubot Sans', sans-serif";

const S = ({ style }: { style?: React.CSSProperties }) => (
  <img
    src="/element/image 58.png"
    alt=""
    className="absolute w-5 h-5 object-contain pointer-events-none select-none z-20"
    style={{ transform: "translate(-50%, -50%)", ...style }}
  />
);

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setError(null);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiClient.submitFeedback({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      });
      setSent(true);
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi phản hồi thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* HERO TITLE */}
      <div className="text-center pt-12 pb-4 px-6">
        <h1
          className="text-white uppercase leading-none"
          style={{
            fontFamily: SVN,
            fontSize: "clamp(56px, 12vw, 160px)",
            letterSpacing: "-0.02em",
          }}
        >
          Liên Hệ
        </h1>
      </div>

      <StarDivider />

      {/* CONTACT US */}
      <section className="py-10 px-6">
        <div className="relative flex flex-col items-center text-center py-6">
          <div
            className="hidden sm:block absolute top-0 pointer-events-none"
            style={{ left: "clamp(60px, 8vw, 100px)" }}
          >
            <SparkleIcon className="w-32 sm:w-32 md:w-40" />
          </div>
          <div
            className="hidden sm:block absolute top-0 pointer-events-none"
            style={{ right: "clamp(60px, 8vw, 100px)" }}
          >
            <RightSparkleIcon className="h-28 sm:h-28 md:h-36 w-auto" />
          </div>
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl mb-4"
            style={{ fontFamily: SVN }}
          >
            Liên Hệ Chúng Tôi
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl">
            {
              "Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai nhu cầu:"
            }
            <br />
            {
              "Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh tế, sẵn sàng giao ngay."
            }
            <br />
            {
              "Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô hình, phụ kiện, đến vật dụng cá nhân hoá."
            }
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          {[
            {
              value: "+8969921233",
              desc: "Đây là số điện thoại chính thức của Artiz Studio",
            },
            {
              value: "quocphong1@gmail.com",
              desc: "Đây là email chính thức của Artiz Studio",
            },
            {
              value: "TP. HCM, Việt Nam",
              desc: "Vincom MeGa Mall, Vinhomes Grand Park TP Thủ Đức, TP.HCM",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#e8e8e8] text-black flex flex-col items-center text-center px-6 pt-10 pb-8 gap-3"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
              }}
            >
              <p
                className="font-black text-2xl uppercase tracking-wide"
                style={{ fontFamily: ARIAL }}
              >
                ICON
              </p>
              <p className="font-bold text-sm">{item.value}</p>
              <p className="text-black/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative">
        <StarDivider />
        <S
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* JOIN AS A PARTNER */}
      <section className="py-10 px-6">
        <div className="text-center mb-8">
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl leading-none"
            style={{ fontFamily: SVN }}
          >
            Trở Thành Đối Tác
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-[#e8e8e8] p-8 text-center">
                <p className="text-green-600 font-semibold text-sm">
                  Gửi thành công! Chúng tôi sẽ liên hệ sớm.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                {error && (
                  <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 px-3 py-2">
                    {error}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm mb-1 block">
                      Họ và tên:
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Quốc Phong"
                      className="w-full bg-[#e8e8e8] text-black text-sm px-3 py-2.5 outline-none border border-black/20 focus:border-black/50 placeholder:text-black/40"
                    />
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm mb-1 block">
                      Số điện thoại:
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      placeholder="Số điện thoại..."
                      className="w-full bg-[#e8e8e8] text-black text-sm px-3 py-2.5 outline-none border border-black/20 focus:border-black/50 placeholder:text-black/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white font-bold text-sm mb-1 block">
                    Email:
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="Email..."
                    type="email"
                    className="w-full bg-[#e8e8e8] text-black text-sm px-3 py-2.5 outline-none border border-black/20 focus:border-black/50 placeholder:text-black/40"
                  />
                </div>
                <div>
                  <label className="text-white font-bold text-sm mb-1 block">
                    Tin nhắn:
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Nội dung tin nhắn..."
                    rows={5}
                    className="w-full bg-[#e8e8e8] text-black text-sm px-3 py-2.5 outline-none border border-black/20 focus:border-black/50 placeholder:text-black/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-white text-black text-sm font-bold uppercase py-3 hover:bg-white/90 transition-colors tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: ARIAL,
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
                  }}
                >
                  {loading && <Spinner sizeClassName="h-4 w-4" />}
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-[#e8e8e8] p-6 flex flex-col gap-4 rounded-lg">
            <h3
              className="text-black font-black text-xl leading-snug"
              style={{ fontFamily: ARIAL }}
            >
              {"Phát Triển Cùng Chúng Tôi \u2013 Quyền Lợi Đối Tác"}
            </h3>
            {[
              {
                title: "Sản phẩm sáng tạo độc quyền",
                desc: "Các mẫu phụ kiện được thiết kế riêng, dẫn đầu xu hướng thị trường in 3D.",
              },
              {
                title: "Chiết khấu hấp dẫn",
                desc: "Chính sách giá sỉ linh hoạt, tối ưu biên lợi nhuận cho đối tác phân phối.",
              },
              {
                title: "Hỗ trợ kỹ thuật 24/7",
                desc: "Cung cấp nội dung quảng bá chuyên nghiệp.",
              },
              {
                title: "Kho mẫu thiết kế đa dạng",
                desc: "Cập nhật liên tục các tệp STL chất lượng cao và file in tối ưu.",
              },
              {
                title: "Hợp tác bền vững",
                desc: "Cam kết đồng hành phát triển thương hiệu và hỗ trợ marketing đa kênh.",
              },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-black font-bold text-sm">
                  {item.title}
                </span>
                <span className="text-black/60 text-sm">
                  {" \u2013 "}
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative">
        <StarDivider />
        <S
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* MAP */}
      <section className="py-10 px-6 pb-16">
        <div className="text-center mb-8">
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl leading-none"
            style={{ fontFamily: SVN }}
          >
            {"Bản Đồ"}
          </h2>
        </div>
        <div
          className="max-w-4xl mx-auto border border-white/20 overflow-hidden"
          style={{ height: "clamp(240px, 50vw, 360px)" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4894869583!2d106.8002816!3d10.841187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175272e94f6fb0b%3A0x9af877e7f76b9c3d!2sVinhomes%20Grand%20Park!5e0!3m2!1svi!2svn!4v1701000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
