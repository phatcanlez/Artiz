import React from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";
import StarDivider from "./ui/StarDivider";

const LatestNews = () => {
  return (
    <section className="w-full bg-[#000311] px-2 sm:px-3 md:px-4">
      <div className="w-full overflow-hidden px-[10px]">
        {/* ① Dải sao trên */}
        <StarDivider />

        {/* ② Header + SparkleIcon */}
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
              Latest News
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-6">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu:
              <br />
              Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh
              tế, sẵn sàng giao ngay.
              <br />
              Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng.
            </p>
          </div>
        </div>

        {/* ③ Content */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/62bb4814a86effad73728445463f0cf9f31f12ed?placeholderIfAbsent=true"
          className="w-full h-auto mt-4 rounded-2xl"
          alt="Latest news showcase"
        />
      </div>
    </section>
  );
};

export default LatestNews;
