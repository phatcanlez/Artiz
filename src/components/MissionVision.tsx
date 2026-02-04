import React from "react";

const MissionVision: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-24 bg-gradient-to-b from-[#000311] to-[#0a0a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="text-center">
            <div className="mb-6 flex justify-center flex-col items-center">
              <h3 className="text-white text-3xl font-bold mb-4 flex items-center gap-3">
                Mission
              </h3>
            </div>
            <p className="text-white/80 text-base leading-relaxed">
              Mang đến những sản phẩm in 3D chất lượng cao, đáp ứng mọi nhu cầu
              từ sản phẩm có sẵn đến custom theo yêu cầu, với giá cả hợp lý và
              dịch vụ chuyên nghiệp.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <div className="mb-6 flex justify-center flex-col items-center">
              <h3 className="text-white text-3xl font-bold mb-4 flex items-center gap-3">
                Vision
              </h3>
            </div>
            <p className="text-white/80 text-base leading-relaxed">
              Trở thành thương hiệu hàng đầu trong lĩnh vực in 3D tại Việt Nam,
              được biết đến với sự sáng tạo, chất lượng và dịch vụ khách hàng
              xuất sắc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
