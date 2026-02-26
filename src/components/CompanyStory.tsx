import React from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const CompanyStory: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <img
              src="/images/iphone.jpg"
              alt="Our Story - Sản phẩm in 3D"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <SparkleIcon className="w-10 h-10 shrink-0" />
              <h2 className="text-white text-4xl md:text-5xl font-bold">
                Our Story
              </h2>
              <RightSparkleIcon className="h-10 w-auto shrink-0" />
            </div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Artiz Studio được thành lập với sứ mệnh mang đến những sản phẩm in
              3D chất lượng cao, độc đáo và cá nhân hóa cho mọi khách hàng.
              Chúng tôi tin rằng công nghệ in 3D không chỉ là một công cụ sản
              xuất, mà còn là một phương tiện để biến những ý tưởng sáng tạo
              thành hiện thực.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Với đội ngũ chuyên nghiệp và trang thiết bị hiện đại, chúng tôi
              cam kết mang đến những sản phẩm vượt ngoài mong đợi, từ những món
              phụ kiện thời trang đến những mô hình phức tạp, tất cả đều được
              chế tác với sự tỉ mỉ và đam mê.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
