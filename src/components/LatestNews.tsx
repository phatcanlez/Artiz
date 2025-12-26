import React from 'react';

const LatestNews = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          Latest News
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai nhu cầu:
          Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh tế, sẵn sàng giao ngay.
          Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng.
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