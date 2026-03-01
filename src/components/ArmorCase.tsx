import React, { useState } from "react";
import { SegmentedRing } from "./ui/SegmentedRing";

const models = [
  {
    src: "/3d/NeilArmstrong.glb",
    name: "Neil Armstrong",
    desc: "Mô hình phi hành gia độc quyền, thiết kế tinh tế, sẵn sàng giao ngay.",
  },
  {
    src: "/3d/hộp .glb",
    name: "Armor Case",
    desc: "Bộ sưu tập các mẫu in 3D độc quyền. Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô hình, phụ kiện, đến vật dụng cá nhân hoá.",
  },
];

/* Dấu ✦ góc */
const CornerStar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 0L9 7L16 8L9 9L8 16L7 9L0 8L7 7L8 0Z"
      fill="white"
      opacity="0.7"
    />
  </svg>
);

/* Dải ✦ ─── */
const StarDividerLine = () => (
  <div className="flex items-center gap-2 w-full">
    <CornerStar />
    <div className="flex-1 border-t border-white/20" />
    <CornerStar />
    <div className="w-2" />
    <CornerStar />
    <div className="flex-1 border-t border-white/20" />
    <CornerStar />
  </div>
);

const ArmorCase = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((i) => (i - 1 + models.length) % models.length);
  const next = () => setCurrent((i) => (i + 1) % models.length);
  const model = models[current];

  return (
    <section className="w-full bg-black text-white overflow-hidden">
      {/* Border top với ✦ góc */}
      <div className="relative border border-white/15 mx-2 sm:mx-4 md:mx-8">
        {/* ✦ 4 góc */}
        <span className="absolute -top-2 -left-2">
          <CornerStar />
        </span>
        <span className="absolute -top-2 -right-2">
          <CornerStar />
        </span>
        <span className="absolute -bottom-2 -left-2">
          <CornerStar />
        </span>
        <span className="absolute -bottom-2 -right-2">
          <CornerStar />
        </span>

        {/* Dải trên */}
        <div className="px-6 pt-4">
          <StarDividerLine />
        </div>

        {/* MADE BY US */}
        <p className="text-center text-white/50 text-xs tracking-[0.3em] uppercase mt-3">
          MADE BY US
        </p>

        {/* Tiêu đề + gạch ngang */}
        <div className="px-6 sm:px-10 mt-4">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none">
            Armor Case
          </h2>
          <div className="flex gap-3 mt-3">
            <div className="w-24 h-[2px] bg-white/40 rounded" />
            <div className="w-24 h-[2px] bg-white/40 rounded" />
          </div>
        </div>

        {/* Main content: 3 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 sm:px-10 py-8">
          {/* Trái: text mô tả + nút < */}
          <div className="flex flex-col gap-6 lg:items-start items-center">
            <p className="text-sm text-white/60 leading-7 max-w-xs">
              {model.desc}
            </p>
            {/* Đường nối + chấm tròn */}
            <div className="flex items-center gap-2 w-full">
              <div className="w-3 h-3 rounded-full border border-white/40" />
              <div className="flex-1 border-t border-white/20 border-dashed" />
            </div>
            {/* Nút điều hướng trái */}
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 transition-colors"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12 5L7 10L12 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Giữa: Vòng tròn kỹ thuật số + 3D */}
          <div className="flex flex-col items-center gap-4">
            <SegmentedRing
              size={340}
              strokeWidth={8}
              segments={6}
              className="scale-75 sm:scale-90 md:scale-100"
            >
              <model-viewer
                key={model.src}
                src={model.src}
                alt={model.name}
                auto-rotate
                camera-controls
                interaction-prompt="none"
                shadow-intensity="1"
                environment-image="neutral"
                loading="eager"
                reveal="auto"
                style={{ width: "100%", height: "100%", display: "block" }}
              >
                <div
                  slot="poster"
                  className="flex items-center justify-center h-full text-white/50 text-xs"
                >
                  Đang tải...
                </div>
              </model-viewer>
            </SegmentedRing>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {models.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#44FF00]" : "bg-white/30"}`}
                  aria-label={`Model ${i + 1}`}
                />
              ))}
            </div>

            {/* Thanh xanh lá + EXPLORE MORE */}
            <div className="flex flex-col items-center gap-3 mt-1">
              <div className="w-12 h-[3px] bg-[#44FF00] rounded" />
              <button className="px-10 py-3 bg-white/10 border border-white/20 text-white text-xs font-black tracking-[0.2em] uppercase hover:bg-white/20 transition-colors">
                EXPLORE MORE
              </button>
            </div>
          </div>

          {/* Phải: text mô tả + nút > */}
          <div className="flex flex-col gap-6 lg:items-end items-center">
            <p className="text-sm text-white/60 leading-7 max-w-xs lg:text-right">
              {model.desc}
            </p>
            {/* Đường nối + chấm tròn */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 border-t border-white/20 border-dashed" />
              <div className="w-3 h-3 rounded-full border border-white/40" />
            </div>
            {/* Nút điều hướng phải */}
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 transition-colors"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 5L13 10L8 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dải dưới */}
        <div className="px-6 pb-4">
          <StarDividerLine />
        </div>
      </div>
    </section>
  );
};

export default ArmorCase;
