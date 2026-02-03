import React from "react";

const FeaturedProducts = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Best Seller Card */}
          <div className="relative group">
            <img
              src="/public/images/left.png"
              className="w-full h-auto object-cover rounded-2xl"
              alt="Best seller product"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    BEST SELLER
                  </h2>
                  <div className="w-3 h-3 rounded-full border-2 border-foreground mt-3" />
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                  className="w-24 h-auto"
                  alt="Product rating"
                />
              </div>
            </div>
          </div>

          {/* Featured Products Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4c8dddab5ce8d8c3b5a66a3f0014bda4c2796400?placeholderIfAbsent=true"
                  className="w-full max-w-sm h-auto"
                  alt="Featured products banner"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-8 md:mt-12">
                  Featured Products
                </h1>
                <p className="text-sm text-muted-foreground mt-4 max-w-md leading-relaxed">
                  Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả
                  hai nhu cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc
                  quyền, thiết kế tinh tế, sẵn sàng giao ngay. Sản phẩm custom:
                  Nhận thiết kế và in theo yêu cầu riêng.
                </p>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/212d463d6368af99f7370d313361fed4f4639e06?placeholderIfAbsent=true"
                  className="w-full max-w-sm h-auto mt-10"
                  alt="Product showcase"
                />
              </div>

              {/* Right Column */}
              <div className="relative">
                <img
                  src="/public/images/right.png"
                  className="w-full h-auto object-cover rounded-2xl"
                  alt="Featured product display"
                />
              </div>
            </div>

            {/* Bottom Product Labels */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  MY PRODUCT
                </h3>
                <div className="w-3 h-3 rounded-full border-2 border-foreground mt-2" />
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                className="w-24 h-auto"
                alt="Product rating"
              />
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  3D PRINT + AI
                </h3>
                <div className="w-3 h-3 rounded-full border-2 border-foreground mt-2" />
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                className="w-24 h-auto"
                alt="Product rating"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
