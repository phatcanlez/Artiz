import React from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const categories = [
  { id: "bestseller", label: "BEST SELLER", image: "/images/col1.jpg" },
  { id: "myproduct", label: "MY PRODUCT", image: "/images/col2.jpg" },
  { id: "3dprint", label: "3D PRINT + AI", image: "/images/col3.jpg" },
];

interface FeaturedProductsProps {
  showcaseImages?: string[];
}

/* Góc mẻ trên-phải kiểu cyber */
const cornerCutStyle: React.CSSProperties = {
  clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)",
};

/* Dải kẻ ngang — 1 component dùng chung trên & dưới */
const StarDivider = () => (
  <img
    src="/element/kẻ ngang.png"
    alt=""
    aria-hidden="true"
    className="w-full h-auto object-cover block"
  />
);

const FeaturedProducts: React.FC<FeaturedProductsProps> = () => {
  return (
    <section className="w-full bg-[#000311] px-2 sm:px-3 md:px-4">
      <div className="w-full overflow-hidden px-[10px]">
        {/* ① Dải sao trên — thu vào theo margin */}
        <div className="mx-[60px] sm:mx-[80px] md:mx-[100px]">
          <StarDivider />
        </div>

        {/* ② Header + SparkleIcon */}
        <div className="relative py-10 text-center mx-[60px] sm:mx-[80px] md:mx-[100px]">
          {/* SparkleIcon góc của section (không phải full màn hình) */}
          <div className="absolute top-0 left-0 pointer-events-none">
            <SparkleIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          </div>
          <div className="absolute top-0 right-0 pointer-events-none">
            <RightSparkleIcon className="h-20 sm:h-28 md:h-36 w-auto" />
          </div>

          {/* Tiêu đề + mô tả — chiều ngang thoải mái, không tràn dọc qua icon */}
          <div className="relative z-10 px-40 sm:px-44 md:px-48">
            <h2
              className="text-white font-black uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight"
              style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
            >
              Featured Products
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-6">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu:
              <br />
              Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh
              tế, sẵn sàng giao ngay.
              <br />
              Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô
              hình, phụ kiện, đến vật dụng cá nhân hoá.
            </p>
          </div>
        </div>

        {/* ③ Khung element 1 + 3 cột — rộng hơn header, khoảng cách với header */}
        <div className="relative mt-4 mb-2">
          {/* Khung cyber overlay */}
          <img
            src="/element/element 1.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
          />

          {/* 3 cột: ảnh + label chung 1 khung */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 px-[3%] pt-[2.5%] pb-[2.5%]">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href="/products"
                className="group cursor-pointer block overflow-hidden"
                style={cornerCutStyle}
              >
                {/* Ảnh */}
                <div className="relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Viền góc mẻ */}
                  <svg
                    className="absolute top-0 right-0 pointer-events-none z-10"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                  >
                    <polyline
                      points="0,2 42,2 42,44"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Label + element 2 — chung khung với ảnh */}
                <div className="relative bg-black">
                  <div className="absolute top-0 left-0 z-10 px-3 pt-2 sm:pt-3">
                    <span
                      className="text-white font-black uppercase text-xs sm:text-sm md:text-base tracking-widest whitespace-nowrap"
                      style={{
                        fontFamily: "'Arial Black', Impact, sans-serif",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <img
                    src="/element/element 2.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-auto object-fill"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ④ Dải sao dưới — cùng StarDivider component */}
        <div className="mx-[60px] sm:mx-[80px] md:mx-[100px]">
          <StarDivider />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
