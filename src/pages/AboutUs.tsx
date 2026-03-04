import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";

const SVN = "'SVN-Redzone', 'Arial Black', Impact, sans-serif";
const ARIAL = "'Arial Black', Impact, sans-serif";

const S = ({ style }: { style?: React.CSSProperties }) => (
  <img
    src="/element/image 58.png"
    alt=""
    className="absolute w-5 h-5 object-contain pointer-events-none select-none z-20"
    style={{ transform: "translate(-50%, -50%)", ...style }}
  />
);

const clip = "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)";

const AboutUs: React.FC = () => {
  const values = [
    {
      title: "Quality",
      desc: "Chất lượng là ưu tiên hàng đầu trong mọi sản phẩm chúng tôi tạo ra.",
    },
    {
      title: "Innovation",
      desc: "Luôn tìm kiếm và áp dụng công nghệ mới nhất để cải thiện sản phẩm.",
    },
    {
      title: "Customer Focus",
      desc: "Khách hàng là trung tâm của mọi quyết định và hoạt động của chúng tôi.",
    },
    {
      title: "Sustainability",
      desc: "Cam kết sử dụng vật liệu thân thiện với môi trường và quy trình bền vững.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* HERO */}
      <div className="text-center pt-12 pb-4 px-6">
        <h1
          className="text-white uppercase leading-none"
          style={{
            fontFamily: SVN,
            fontSize: "clamp(48px, 10vw, 140px)",
            letterSpacing: "-0.02em",
          }}
        >
          About Us
        </h1>
      </div>

      <StarDivider />

      {/* OUR STORY */}
      <section className="py-14 px-6">
        <div className="relative flex flex-col items-center text-center py-4 mb-10">
          <div className="absolute top-0 left-4 sm:left-8 md:left-12 pointer-events-none">
            <SparkleIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          </div>
          <div className="absolute top-0 right-4 sm:right-8 md:right-12 pointer-events-none">
            <RightSparkleIcon className="h-20 sm:h-28 md:h-36 w-auto" />
          </div>
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: SVN }}
          >
            Our Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
          <div className="overflow-hidden" style={{ clipPath: clip }}>
            <img
              src="/images/iphone.jpg"
              alt="Our Story"
              className="w-full h-72 lg:h-96 object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-white/70 text-sm leading-relaxed">
              Artiz Studio được thành lập với sứ mệnh mang đến những sản phẩm in
              3D chất lượng cao, độc đáo và cá nhân hóa cho mọi khách hàng.
              Chúng tôi tin rằng công nghệ in 3D không chỉ là một công cụ sản
              xuất, mà còn là một phương tiện để biến những ý tưởng sáng tạo
              thành hiện thực.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Với đội ngũ chuyên nghiệp và trang thiết bị hiện đại, chúng tôi
              cam kết mang đến những sản phẩm vượt ngoài mong đợi — từ những món
              phụ kiện thời trang đến những mô hình phức tạp, tất cả đều được
              chế tác với sự tỉ mỉ và đam mê.
            </p>
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

      {/* MISSION & VISION */}
      <section className="py-14 px-6">
        <div className="text-center mb-10">
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: SVN }}
          >
            Mission &amp; Vision
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              label: "Mission",
              text: "Mang đến những sản phẩm in 3D chất lượng cao, đáp ứng mọi nhu cầu từ sản phẩm có sẵn đến custom theo yêu cầu, với giá cả hợp lý và dịch vụ chuyên nghiệp.",
            },
            {
              label: "Vision",
              text: "Trở thành thương hiệu hàng đầu trong lĩnh vực in 3D tại Việt Nam, được biết đến với sự sáng tạo, chất lượng và dịch vụ khách hàng xuất sắc.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#e8e8e8] text-black px-8 py-10 flex flex-col gap-4"
              style={{ clipPath: clip }}
            >
              <p
                className="font-black text-2xl uppercase"
                style={{ fontFamily: ARIAL }}
              >
                {item.label}
              </p>
              <p className="text-black/70 text-sm leading-relaxed">
                {item.text}
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

      {/* OUR VALUES */}
      <section className="py-14 px-6">
        <div className="text-center mb-10">
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: SVN }}
          >
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {values.map((item, i) => (
            <div
              key={i}
              className="bg-[#e8e8e8] text-black flex flex-col items-center text-center px-6 pt-10 pb-8 gap-3"
              style={{ clipPath: clip }}
            >
              <p
                className="font-black text-xl uppercase tracking-wide"
                style={{ fontFamily: ARIAL }}
              >
                {item.title}
              </p>
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

      {/* FAQ */}
      <section className="py-14 px-6">
        <div className="text-center mb-10">
          <h2
            className="text-white uppercase text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: SVN }}
          >
            F&amp;A
          </h2>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {[
            {
              q: "Artiz Studio cung cấp những dịch vụ gì?",
              a: "Chúng tôi cung cấp dịch vụ in 3D chất lượng cao bao gồm sản phẩm có sẵn và sản phẩm custom theo yêu cầu — từ mô hình, phụ kiện đến vật dụng cá nhân hoá.",
            },
            {
              q: "Thời gian sản xuất mất bao lâu?",
              a: "Tùy theo độ phức tạp của sản phẩm, thời gian sản xuất thường từ 2–7 ngày làm việc. Chúng tôi luôn cố gắng giao hàng đúng hẹn.",
            },
            {
              q: "Tôi có thể yêu cầu thiết kế riêng không?",
              a: "Hoàn toàn có thể. Bạn chỉ cần gửi ý tưởng, hình ảnh tham khảo hoặc file thiết kế — đội ngũ của chúng tôi sẽ tư vấn và thực hiện theo yêu cầu.",
            },
            {
              q: "Chính sách đổi trả như thế nào?",
              a: "Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm có lỗi kỹ thuật từ phía nhà sản xuất.",
            },
            {
              q: "Làm thế nào để trở thành đối tác phân phối?",
              a: "Bạn có thể điền vào form liên hệ trong trang Contact và chọn mục 'Join As A Partner'. Đội ngũ của chúng tôi sẽ liên hệ trong vòng 24 giờ.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group bg-[#e8e8e8] text-black"
              style={{ clipPath: clip }}
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-sm select-none list-none">
                {item.q}
                <span className="ml-4 text-lg leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-black/60 text-sm leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <StarDivider />

      {/* CTA */}
      <section className="py-16 px-6 pb-20 text-center flex flex-col items-center gap-6">
        <h2
          className="text-white uppercase leading-none"
          style={{ fontFamily: SVN, fontSize: "clamp(48px, 8vw, 100px)" }}
        >
          Ready to Create?
        </h2>
        <p className="text-white/60 text-sm max-w-md leading-relaxed">
          Hãy liên hệ với chúng tôi để bắt đầu dự án in 3D của bạn — từ mẫu có
          sẵn đến thiết kế hoàn toàn riêng.
        </p>
        <a
          href="/contact"
          className="bg-white text-black text-sm font-bold uppercase px-10 py-3 hover:bg-white/90 transition-colors tracking-widest"
          style={{
            fontFamily: ARIAL,
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
