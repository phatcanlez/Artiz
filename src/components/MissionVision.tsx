import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-24 bg-gradient-to-b from-[#000311] to-[#0a0a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="text-center">
            <div className="mb-6">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                <path d="M30 15L30 45M15 30L45 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-white text-3xl font-bold mb-4">Mission</h3>
            <p className="text-white/80 text-base leading-relaxed">
              Mang đến những sản phẩm in 3D chất lượng cao, đáp ứng mọi nhu cầu từ sản phẩm có sẵn 
              đến custom theo yêu cầu, với giá cả hợp lý và dịch vụ chuyên nghiệp.
            </p>
          </div>
          
          {/* Vision */}
          <div className="text-center">
            <div className="mb-6">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                <path d="M30 20L35 30L30 40L25 30L30 20Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-white text-3xl font-bold mb-4">Vision</h3>
            <p className="text-white/80 text-base leading-relaxed">
              Trở thành thương hiệu hàng đầu trong lĩnh vực in 3D tại Việt Nam, được biết đến với 
              sự sáng tạo, chất lượng và dịch vụ khách hàng xuất sắc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

