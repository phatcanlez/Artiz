import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";
import { Facebook, Youtube, Instagram } from "lucide-react";

const SVN = "'SVN-Redzone', 'Arial Black', Impact, sans-serif";
const ARIAL = "'Arial Black', Impact, sans-serif";

// ── Stats data ──────────────────────────────────────────────
const stats = [
  { value: "10+", label: "Chứng từ cung cấp\ndịch vụ in 3D nhỏ lẻ" },
  { value: "10+", label: "Chứng từ cung cấp\ndịch vụ theo 3D nhỏ lẻ" },
  { value: "10+", label: "Chứng từ cung cấp\ndịch vụ in 3D nhỏ lẻ" },
  { value: "10+", label: "Chứng từ cung cấp\ndịch vụ in 3D nhỏ lẻ" },
];

// ── Gallery images ───────────────────────────────────────────
const galleryImages = [
  "/images/col1.jpg",
  "/images/col2.jpg",
  "/images/col3.jpg",
];

// NFC bracket frames
const nfcFrames = [
  "/images/Rectangle 4660.png",
  "/images/Rectangle 4661.png",
  "/images/Rectangle 4662.png",
];

// ── Makers data ───────────────────────────────────────────────
const makers = [
  {
    name: "THE MAKERS",
    role: "Art Director",
    image: "/images/col1.jpg",
  },
  {
    name: "THE MAKERS",
    role: "Lead Designer",
    image: "/images/col2.jpg",
  },
  {
    name: "THE MAKERS",
    role: "3D Artist",
    image: "/images/col3.jpg",
  },
];

// ── Section: Hero ────────────────────────────────────────────
const NFCHero: React.FC = () => (
  <section className="relative w-full bg-black overflow-hidden">
    {/* ── Background banner image ── */}
    <img
      src="/images/nfc banner.png"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    {/* Subtle dark veil so text stays legible */}
    <div className="absolute inset-0 bg-black/40 pointer-events-none" />

    {/* ── Inner content wrapper ── */}
    <div className="relative z-10 w-full min-h-[480px] sm:min-h-[560px] md:min-h-[640px] flex flex-col">
      {/* Title row — behind product image vertically */}
      <div className="w-full text-center pt-10 sm:pt-14 px-4">
        <h1
          className="text-white font-black uppercase leading-none tracking-tighter select-none"
          style={{
            fontFamily: SVN,
            fontSize: "clamp(52px, 11vw, 160px)",
            letterSpacing: "-0.02em",
          }}
        >
          Airpods Pro Case
        </h1>
      </div>

      {/* Product image — removed-bg, layered on top of title */}
      <div className="flex-1 flex items-center justify-center -mt-10 sm:-mt-16 md:-mt-24">
        <img
          src="/images/tải_xuống__8_-removebg-preview 1.png"
          alt="Sản phẩm"
          className="relative z-20 w-[360px] sm:w-[520px] md:w-[680px] lg:w-[820px] object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 8px 60px rgba(0,0,0,0.7))" }}
        />
      </div>

      {/* Bottom bar: subtitle left — social right */}
      <div className="flex items-end justify-between px-6 sm:px-10 md:px-16 pb-6 sm:pb-8 mt-auto gap-4">
        <p className="text-white/60 text-xs sm:text-sm leading-5 max-w-[200px]">
          Chúng tôi cung cấp dịch vụ in 3D chất lượng
          <br />
          Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D
        </p>

        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="#"
            className="text-white hover:text-[#44FF00] transition-colors"
          >
            <Facebook size={20} fill="white" />
          </a>
          <a
            href="#"
            className="text-white hover:text-[#44FF00] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.727-8.836-8.156-10.664h7.124l4.26 5.644 5.528-5.644Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white hover:text-[#44FF00] transition-colors"
          >
            <Youtube size={20} fill="white" />
          </a>
          <a
            href="#"
            className="text-white hover:text-[#44FF00] transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ── Section: Unique Identity ──────────────────────────────────
const UniqueIdentity: React.FC = () => (
  <section className="w-full bg-black py-10">
    <StarDivider />

    {/* Header — sparkles in outer corners, title+badge centred */}
    <div className="relative py-10 px-6">
      {/* SparkleIcon absolute — outside the mx margin */}
      <div
        className="hidden sm:block absolute top-0 pointer-events-none"
        style={{ left: "clamp(60px, 8vw, 100px)" }}
      >
        <SparkleIcon className="w-28 sm:w-36 md:w-44" />
      </div>
      <div
        className="hidden sm:block absolute top-0 pointer-events-none"
        style={{ right: "clamp(60px, 8vw, 100px)" }}
      >
        <RightSparkleIcon className="h-24 sm:h-32 md:h-40 w-auto" />
      </div>

      {/* Title + badge — centred, inside StarDivider margin */}
      <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] relative z-10 text-center ">
        <h2
          className="text-white font-black uppercase leading-tight"
          style={{ fontFamily: SVN, fontSize: "clamp(26px, 4vw, 56px)" }}
        >
          UNIQUE IDENTITY IN THE
          <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-4">
            DIGITAL ERA
            <span className="inline-flex items-center border-2 border-white px-6 py-2 rounded-lg align-middle">
              <span
                className="text-white font-bold tracking-wider normal-case"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontSize: "clamp(14px, 1.6vw, 22px)",
                }}
              >
                Digital Birth Certificate
              </span>
            </span>
          </span>
        </h2>
      </div>
    </div>

    {/* Two-column text with vertical divider */}
    <div className="mx-[60px] sm:mx-[80px] md:mx-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 text-white/60 text-sm leading-7">
        <p className="pr-0 md:pr-10">
          Every ARTIZ masterpiece carries more than just a serial number. It
          possesses a unique Digital ID integrated via an NFC chip embedded
          beneath the solid resin surface. We establish the highest security
          standard for collectors through a Real-time Tracking system, recording
          the origin, creation date, and specific position within each limited
          batch.
        </p>
        {/* vertical divider */}
        <div className="hidden md:block w-px bg-white/20 mx-2" />
        <p className="pl-0 md:pl-10 mt-6 md:mt-0">
          By applying Anti-Counterfeit encryption algorithms, ARTIZ ensures
          absolute protection of collectible value and prevents any duplication
          efforts. With a simple tap of your phone, you can instantly unlock
          your personal heritage and verify the authentic proof of your unique
          possession.
        </p>
      </div>

      {/* Stats — /element/nfc.png as frame */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="relative flex items-center justify-center">
            <img
              src="/element/nfc.png"
              alt=""
              aria-hidden="true"
              className="w-full object-contain pointer-events-none select-none"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-3">
              <div
                className="text-white font-black text-3xl sm:text-4xl"
                style={{ fontFamily: ARIAL }}
              >
                {s.value}
              </div>
              <p className="text-white/50 text-xs mt-1 leading-5 whitespace-pre-line text-center">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Section: Gallery ─────────────────────────────────────────
const NFCGallery: React.FC = () => (
  <section className="w-full bg-black pb-12">
    <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] grid grid-cols-3 gap-4 sm:gap-6">
      {galleryImages.map((src, i) => (
        <div key={i} className="relative group">
          {/* Photo — fixed aspect so frame fits perfectly */}
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full object-cover object-center block transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ aspectRatio: "16/10" }}
          />
          {/* NFC bracket frame overlay */}
          <img
            src={nfcFrames[i]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
          />
        </div>
      ))}
    </div>
  </section>
);

// ── Section: Pulse of Matter ──────────────────────────────────
const PulseOfMatter: React.FC = () => (
  <section className="w-full bg-black py-10">
    <StarDivider />
    <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* Left — 2 images side by side */}
      <div className="grid grid-cols-2 gap-3">
        <img
          src="/images/Rectangle 4664.png"
          alt="Pulse of Matter 1"
          className="w-full object-cover"
        />
        <img
          src="/images/Rectangle 4665.png"
          alt="Pulse of Matter 2"
          className="w-full object-cover"
        />
      </div>

      {/* Right — text */}
      <div>
        {/* Corner bracket decoration */}
        <div className="flex items-start gap-1 mb-4">
          <svg
            width="52"
            height="52"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 26V2H26"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <div className="pl-6 sm:pl-10">
          <h2
            className="text-white font-black uppercase leading-tight mb-2"
            style={{ fontFamily: SVN, fontSize: "clamp(26px, 4vw, 52px)" }}
          >
            THE PULSE OF MATTER
          </h2>
          <p className="text-white/70 text-sm font-semibold tracking-widest mb-4">
            Where Sculptural Form Meets Soul
          </p>
          <p className="text-white/60 text-sm leading-7 mb-4">
            ARTIZ redefines personal accessories through the philosophy of
            Physical Sculpture — a convergence of physical form and digital
            soul. We do not mass-produce utility; we create functional art based
            on Brutalist Aesthetics, utilizing bold lines and Hard Shadow
            effects to create dramatic visual depth.
          </p>
          <p className="text-white/50 text-sm leading-7">
            The Solid Resin Structure provides a substantial and premium tactile
            feel, standing as an artistic rebellion against the hollow nature of
            industrial plastics. Every detail is meticulously engineered to
            achieve perfect weight balance, ensuring comfort and fluidity in
            your everyday carry experience.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <StarDivider />
    </div>
  </section>
);

// ── Section: Crafting the Future ─────────────────────────────
const CraftingFuture: React.FC = () => (
  <section className="w-full bg-black py-0">
    {/* Inset container — same margins as StarDivider */}
    <div className="mx-[60px] sm:mx-[80px] md:mx-[100px] relative overflow-hidden">
      <video
        src="/video/quá trình.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover block"
        style={{ minHeight: "clamp(260px, 40vw, 500px)" }}
      />
    </div>
  </section>
);

// ── Arrow icon (Qua trang.svg) ────────────────────────────────
const ArrowIcon: React.FC<{ flipped?: boolean; className?: string }> = ({
  flipped,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13.58 22.79"
    className={className}
    style={flipped ? { transform: "scaleX(-1)" } : undefined}
    fill="currentColor"
  >
    <path d="M0,0l8.88,11.39L0,22.79c4.53-3.8,9.06-7.6,13.58-11.39C9.06,7.6,4.53,3.8,0,0Z" />
  </svg>
);

// ── Section: The Makers ───────────────────────────────────────
const TheMakers: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + makers.length) % makers.length);
  const next = () => setIdx((i) => (i + 1) % makers.length);

  const prevIdx = (idx - 1 + makers.length) % makers.length;
  const nextIdx = (idx + 1) % makers.length;

  return (
    <section className="w-full bg-black py-16">
      {/* ── Inset wrapper — same width as StarDivider ── */}
      <div className="mx-[60px] sm:mx-[80px] md:mx-[100px]">
        {/* Header */}
        <div className="relative text-center mb-10">
          <div className="hidden sm:block absolute top-0 left-0 pointer-events-none">
            <SparkleIcon className="w-28 sm:w-36" />
          </div>
          <div className="hidden sm:block absolute top-0 right-0 pointer-events-none">
            <RightSparkleIcon className="h-24 sm:h-32 w-auto" />
          </div>
          <div className="relative z-10 py-4">
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: ARIAL, fontSize: "clamp(28px, 5vw, 60px)" }}
            >
              THE MAKERS
            </h2>
            <p className="text-white text-sm font-semibold tracking-widest uppercase mt-1">
              The Passion Behind The Atelier
            </p>
          </div>
        </div>

        {/* Two-column text */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 text-white/60 text-sm leading-7 mb-12">
          <p className="pr-0 md:pr-10">
            Behind every concept is a collective of disciplined and passionate
            creators. Our strategic team includes a Creative Director who
            defines the aesthetic rhythms, a Technical Architect maintaining
            print structures, and Master Artisans who personally infuse emotion
            into the finished surfaces.
          </p>
          <div className="hidden md:block w-px bg-white/20 mx-2" />
          <p className="pl-0 md:pl-10 mt-6 md:mt-0">
            Operational excellence is ensured by our Systems Management team
            handling digital infrastructure, UI/UX Designers optimizing user
            journeys, and our Marketing and Editorial department crafting the
            brand narrative. We believe that only human devotion can breathe
            warmth and vitality into inanimate surfaces.
          </p>
        </div>

        {/* 3-card carousel */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Prev button */}
          <button
            onClick={prev}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ArrowIcon flipped className="w-4 sm:w-5 h-auto" />
          </button>

          {/* Left card — smaller */}
          <div className="flex-1 opacity-50 transition-all duration-300">
            <div
              className="overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}
            >
              <img
                src={makers[prevIdx].image}
                alt={makers[prevIdx].name}
                className="w-full aspect-[3/4] object-cover object-center"
              />
            </div>
          </div>

          {/* Center card — larger */}
          <div className="flex-[1.5] transition-all duration-300">
            <div
              className="overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
              }}
            >
              <img
                src={makers[idx].image}
                alt={makers[idx].name}
                className="w-full aspect-[3/4] object-cover object-center"
              />
            </div>
            <div className="text-center mt-4">
              <p
                className="text-white font-black uppercase text-base"
                style={{ fontFamily: ARIAL }}
              >
                {makers[idx].name}
              </p>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                {makers[idx].role}
              </p>
            </div>
          </div>

          {/* Right card — smaller */}
          <div className="flex-1 opacity-50 transition-all duration-300">
            <div
              className="overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}
            >
              <img
                src={makers[nextIdx].image}
                alt={makers[nextIdx].name}
                className="w-full aspect-[3/4] object-cover object-center"
              />
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ArrowIcon className="w-4 sm:w-5 h-auto" />
          </button>
        </div>
      </div>

      <div className="mt-16">
        <StarDivider />
      </div>
    </section>
  );
};

// ── Section: Smart Stewardship ────────────────────────────────
const SmartStewardship: React.FC = () => (
  <section className="w-full bg-black py-16 px-4 sm:px-8">
    <div className="relative text-center mb-10">
      <div
        className="hidden sm:block absolute top-0 pointer-events-none"
        style={{ left: "clamp(60px, 8vw, 100px)" }}
      >
        <SparkleIcon className="w-28 sm:w-36" />
      </div>
      <div
        className="hidden sm:block absolute top-0 pointer-events-none"
        style={{ right: "clamp(60px, 8vw, 100px)" }}
      >
        <RightSparkleIcon className="h-24 sm:h-32 w-auto" />
      </div>
      <div className="relative z-10">
        <h2
          className="text-white font-black uppercase"
          style={{ fontFamily: ARIAL, fontSize: "clamp(28px, 5vw, 60px)" }}
        >
          SMART STEWARDSHIP
        </h2>
        <p className="text-[#44FF00] text-sm font-semibold tracking-widest uppercase mt-1">
          Comprehensive After-Sales Management
        </p>
      </div>
    </div>

    {/* Service card */}
    <div className="max-w-4xl mx-auto">
      <div
        className="bg-white/5 border border-white/10 p-8 sm:p-12"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Warranty Tracking",
              desc: "Theo dõi bảo hành qua NFC chip tích hợp, đảm bảo chính sách sau bán hàng minh bạch.",
            },
            {
              title: "Authentication",
              desc: "Xác thực nguồn gốc sản phẩm tức thì bằng một lần chạm điện thoại vào chip NFC.",
            },
            {
              title: "Ownership Transfer",
              desc: "Chuyển nhượng quyền sở hữu kỹ thuật số an toàn giữa các collectors.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#44FF00]/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#44FF00]" />
              </div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-white/50 text-xs leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Main NFC Page ─────────────────────────────────────────────
const NFC: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main>
        <NFCHero />
        <UniqueIdentity />
        <NFCGallery />
        <PulseOfMatter />
        <CraftingFuture />
        <TheMakers />
        <SmartStewardship />
      </main>
      <Footer />
    </div>
  );
};

export default NFC;
