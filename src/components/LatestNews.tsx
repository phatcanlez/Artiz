import React from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const LatestNews = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-10 sm:mt-12 md:mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center min-w-0">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
          <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 shrink-0" />
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Latest News
          </h2>
          <RightSparkleIcon className="h-8 w-auto sm:h-10 md:h-14 shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai nhu
          cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế
          tinh tế, sẵn sàng giao ngay. Sản phẩm custom: Nhận thiết kế và in theo
          yêu cầu riêng.
        </p>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/62bb4814a86effad73728445463f0cf9f31f12ed?placeholderIfAbsent=true"
          className="w-full h-auto mt-10 rounded-2xl"
          alt="Latest news showcase"
        />
      </div>
    </section>
  );
};

export default LatestNews;
