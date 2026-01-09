import React from 'react';

const CompanyStory: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="3D Printing Process"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          
          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Artiz Studio được thành lập với sứ mệnh mang đến những sản phẩm in 3D chất lượng cao, 
              độc đáo và cá nhân hóa cho mọi khách hàng. Chúng tôi tin rằng công nghệ in 3D không chỉ 
              là một công cụ sản xuất, mà còn là một phương tiện để biến những ý tưởng sáng tạo thành hiện thực.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Với đội ngũ chuyên nghiệp và trang thiết bị hiện đại, chúng tôi cam kết mang đến những 
              sản phẩm vượt ngoài mong đợi, từ những món phụ kiện thời trang đến những mô hình phức tạp, 
              tất cả đều được chế tác với sự tỉ mỉ và đam mê.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;

