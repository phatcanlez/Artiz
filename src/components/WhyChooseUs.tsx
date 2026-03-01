import React, { useState } from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const features = [
  {
    id: "thiet-ke",
    label: "Chuẩn Thiết Kế",
    desc: "Sản phẩm đúng bản vẽ, đảm bảo thẩm mỹ và độ chính xác cao.",
    icon: "/icon/Chuẩn thiết kế.svg",
  },
  {
    id: "doi-tra",
    label: "Đổi Trả Dễ Dàng",
    desc: "Chính sách đổi trả linh hoạt, hỗ trợ khách hàng tận tâm.",
    icon: "/icon/Shoping.svg",
  },
  {
    id: "giao-hang",
    label: "Giao Hàng Đúng Hẹn",
    desc: "Cam kết giao hàng đúng thời gian, không trễ hẹn.",
    icon: "/icon/Đổi trả.svg",
  },
  {
    id: "duyet-mau",
    label: "Duyệt Mẫu Nhanh",
    desc: "Phê duyệt mẫu in nhanh chóng, tiết kiệm thời gian.",
    icon: "/icon/Duyệt mẫu.svg",
  },
];

/* Dải kẻ ngang — dùng chung */
const StarDivider = () => (
  <img
    src="/element/kẻ ngang.png"
    alt=""
    aria-hidden="true"
    className="w-full h-auto object-cover block"
  />
);

/* Hexagon clip */
const HexIcon = ({ src, active }: { src: string; active: boolean }) => (
  <div
    className={`flex items-center justify-center transition-all duration-300 ${active ? "scale-105" : ""}`}
    style={{
      width: 150,
      height: 164,
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      background: active ? "#e8e8e8" : "#7a7a7a",
    }}
  >
    <img
      src={src}
      alt=""
      className="w-16 h-16 object-contain"
      style={{ filter: active ? "invert(0)" : "invert(1) brightness(0.2)" }}
    />
  </div>
);

const WhyChooseUs = () => {
  const [active, setActive] = useState("thiet-ke");
  const current = features.find((f) => f.id === active)!;

  return (
    <section className="w-full bg-[#000311]">
      <div className="w-full overflow-hidden px-[10px]">
        {/* ① Dải sao trên */}
        <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] my-4">
          <StarDivider />
        </div>

        {/* ② Header + SparkleIcon — giống FeaturedProducts */}
        <div className="relative py-10 text-center mx-[60px] sm:mx-[80px] md:mx-[100px]">
          <div className="absolute top-0 left-0 pointer-events-none">
            <SparkleIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          </div>
          <div className="absolute top-0 right-0 pointer-events-none">
            <RightSparkleIcon className="h-20 sm:h-28 md:h-36 w-auto" />
          </div>

          <div className="relative z-10 px-40 sm:px-44 md:px-48">
            <h2
              className="text-white font-black uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight"
              style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
            >
              Why Choose Us
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-6">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu:
              <br />
              Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô
              hình, phụ kiện, đến vật dụng cá nhân hoá.
            </p>
          </div>
        </div>

        {/* ③ Diagram: Vector 64 + 4 hexagon */}
        {/* Container đủ rộng để hex thò ra 4 phía */}
        <div
          className="relative mx-auto select-none"
          style={{ width: 680, height: 480 }}
        >
          {/* Vector 64 — nhỏ, căn giữa container */}
          <img
            src="/element/Vector 64.png"
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: 560,
              height: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* TOP — giữa ngang, trùm lên cạnh trên Vector */}
          <button
            onClick={() => setActive("thiet-ke")}
            className="absolute z-10"
            style={{ top: -20, left: "50%", transform: "translateX(-50%)" }}
          >
            <HexIcon
              src="/icon/Chuẩn thiết kế.svg"
              active={active === "thiet-ke"}
            />
          </button>

          {/* LEFT — giữa dọc, trùm ra cạnh trái Vector */}
          <button
            onClick={() => setActive("doi-tra")}
            className="absolute z-10"
            style={{ top: "50%", left: 0, transform: "translateY(-50%)" }}
          >
            <HexIcon src="/icon/Shoping.svg" active={active === "doi-tra"} />
          </button>

          {/* CENTER */}
          <div
            className="absolute text-center z-10"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 180,
            }}
          >
            <p className="text-white font-black text-base leading-tight">
              {current.label}
            </p>
            <p className="text-white/50 text-xs mt-2 leading-5">
              {current.desc}
            </p>
          </div>

          {/* RIGHT — giữa dọc, trùm ra cạnh phải Vector */}
          <button
            onClick={() => setActive("giao-hang")}
            className="absolute z-10"
            style={{ top: "50%", right: 0, transform: "translateY(-50%)" }}
          >
            <HexIcon src="/icon/Đổi trả.svg" active={active === "giao-hang"} />
          </button>

          {/* BOTTOM — giữa ngang, trùm xuống cạnh dưới Vector */}
          <button
            onClick={() => setActive("duyet-mau")}
            className="absolute z-10"
            style={{ bottom: -20, left: "50%", transform: "translateX(-50%)" }}
          >
            <HexIcon
              src="/icon/Duyệt mẫu.svg"
              active={active === "duyet-mau"}
            />
          </button>
        </div>

        {/* ④ Dải sao dưới */}
        <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] my-4">
          <StarDivider />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
