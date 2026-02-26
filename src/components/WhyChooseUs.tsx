import React from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const WhyChooseUs = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-10 sm:mt-12 md:mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Left Image */}
          <div className="hidden lg:block">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cd7e1aa2e5f0d7f7a83ad12730fd581cbff6680b?placeholderIfAbsent=true"
              className="w-full h-auto object-contain"
              alt="Why choose us illustration left"
            />
          </div>

          {/* Center Content */}
          <div className="lg:col-span-2 text-center">
            <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
              <SparkleIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 shrink-0" />
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-foreground uppercase text-center min-w-0 flex-1">
                Why Choose Us
              </h2>
              <RightSparkleIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 shrink-0" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu: Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng –
              từ mô hình, phụ kiện, đến vật dụng cá nhân hoá.
            </p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/07cd44eea2fc282efe1888d012fd8ae29308783b?placeholderIfAbsent=true"
              className="w-full h-auto mt-10 md:mt-16"
              alt="Why choose us features showcase"
            />
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/19762ec7b6824bd30931d0938ad04642d1ffba5a?placeholderIfAbsent=true"
              className="w-full h-auto object-contain"
              alt="Why choose us illustration right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
