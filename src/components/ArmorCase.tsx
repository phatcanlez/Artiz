import React, { useState } from "react";

const SVN = "'SVN-Redzone', sans-serif";

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
        className="relative flex flex-col items-center justify-center"
        style={{ minHeight: "340px" }}
      >
        {/* Ring + 3D — center */}
        <div className="relative flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <img
              src="/element/circle.png"
              alt=""
              className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] object-contain select-none"
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
                style={{
                  width: "min(280px, 75vw)",
                  height: "min(280px, 75vw)",
                  display: "block",
                }}
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

        {/* Overlay (desktop only): 3-col grid so content hugs the ring */}
        <div className="hidden lg:grid absolute inset-0 z-20 grid-cols-[1fr_560px_1fr] pointer-events-none">
          {/* Left col */}
          <div className="flex flex-col justify-center items-end pr-6 pointer-events-auto">
            <div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">
                Model
              </p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none">
                {model.name}
              </h3>
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
            <p className="text-sm text-white/60 leading-7 max-w-[220px]">
              {model.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile info (below ring on mobile, hidden on lg+) */}
      <div className="lg:hidden text-center px-6 mt-4">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-1">
          Model
        </p>
        <h3 className="text-2xl font-black text-white leading-none mb-2">
          {model.name}
        </h3>
        <p className="text-sm text-white/60 leading-6 max-w-xs mx-auto">
          {model.desc}
        </p>
      </div>

      {/* Bottom: nav + strip + explore */}
      <div className="flex flex-col items-center gap-3 mt-6">
        {/* Row: prev + strip + next */}
        <div className="flex items-center gap-6 sm:gap-16 md:gap-24 lg:gap-32">
          {/* Nav prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ backgroundColor: "#D9D9D9" }}
            aria-label="Previous"
          >
            <img
              src="/icon/Qua trang.svg"
              alt="prev"
              className="w-3 h-3"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>

          {/* Progress strip */}
          <div className="flex gap-1.5 items-center">
            {models.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "40px" : "20px",
                  backgroundColor:
                    i === current ? "#44FF00" : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Model ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ backgroundColor: "#D9D9D9" }}
            aria-label="Next"
          >
            <img src="/icon/Qua trang.svg" alt="next" className="w-3 h-3" />
          </button>
        </div>

        {/* Explore More */}
        <button
          className="px-10 py-2.5 bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase transition-colors"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#44FF00")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          EXPLORE MORE
        </button>
      </div>
    </section>
  );
};

export default ArmorCase;
