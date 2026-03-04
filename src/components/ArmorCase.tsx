import React, { useState } from "react";

const SVN = "'SVN-Redzone', 'Arial Black', Impact, sans-serif";

const models = [
  {
    src: "/3d/hộp .glb",
    name: "Armor Case",
    desc: "Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai nhu cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh tế, sẵn sàng giao ngay. Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô hình, phụ kiện, đến vật dụng cá nhân hoá.",
  },
  {
    src: "/3d/NeilArmstrong.glb",
    name: "Neil Armstrong",
    desc: "Mô hình phi hành gia độc quyền, thiết kế tinh tế. Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô hình, phụ kiện, đến vật dụng cá nhân hoá.",
  },
];

const ArmorCase = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((i) => (i - 1 + models.length) % models.length);
  const next = () => setCurrent((i) => (i + 1) % models.length);
  const model = models[current];

  return (
    <section className="w-full bg-black text-white overflow-hidden py-10">
      {/* MADE BY US — h2 tiêu đề */}
      <h2
        className="text-center text-white uppercase leading-none mb-8"
        style={{ fontFamily: SVN, fontSize: "clamp(36px, 6vw, 80px)" }}
      >
        Made By Us
      </h2>

      {/* Main layout */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "560px" }}
      >
        {/* Ring + 3D — absolute center */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative flex items-center justify-center pointer-events-auto">
            <img
              src="/element/circle.png"
              alt=""
              className="w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] object-contain select-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
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
                style={{ width: "340px", height: "340px", display: "block" }}
              >
                <div
                  slot="poster"
                  className="flex items-center justify-center h-full text-white/50 text-xs"
                >
                  Đang tải...
                </div>
              </model-viewer>
            </div>
          </div>
        </div>

        {/* Overlay: 3-col grid so content hugs the ring */}
        <div className="absolute inset-0 z-20 grid grid-cols-[1fr_560px_1fr] pointer-events-none">
          {/* Left col */}
          <div className="flex flex-col justify-center items-end pr-6 pointer-events-auto">
            <div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">Model</p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none">{model.name}</h3>
              <div className="flex gap-2 mt-3">
                <div className="w-20 h-[2px] bg-white/40" />
                <div className="w-12 h-[2px] bg-white/40" />
              </div>
            </div>
          </div>

          {/* Center col: empty spacer */}
          <div />

          {/* Right col */}
          <div className="flex flex-col justify-center items-start pl-6 pointer-events-auto">
            <p className="text-sm text-white/60 leading-7 max-w-[220px]">{model.desc}</p>
          </div>
        </div>
      </div>

      {/* Bottom: nav + dots + explore + green bar */}
      <div className="flex items-center justify-center gap-6 px-6 mt-6">
        {/* Nav prev */}
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 transition-colors"
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 5L7 10L12 15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Center: dots + explore */}
        <div className="flex flex-col items-center gap-3">
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
          <button className="px-10 py-2.5 bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/20 transition-colors">
            EXPLORE MORE
          </button>
        </div>

        {/* Nav next + green bar */}
        <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 transition-colors"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
    </section>
  );
};

export default ArmorCase;
