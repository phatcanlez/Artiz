import React from "react";

const FeaturedProducts = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-10 sm:mt-12 md:mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Thu nhỏ toàn bộ block trên mobile, giữ nguyên trên desktop */}
        <div className="transform scale-75 sm:scale-90 md:scale-100 origin-top mx-auto">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {/* Best Seller Card */}
            <div className="relative group min-w-0">
              <img
                src="/images/left.png"
                className="w-full h-auto object-cover rounded-lg sm:rounded-2xl min-h-0"
                alt="Best seller product"
              />
              <div className="absolute bottom-1 left-1 right-1 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="flex items-center justify-between gap-1">
                  <div className="min-w-0">
                    <h2 className="text-[10px] sm:text-xl md:text-3xl font-bold text-foreground truncate">
                      BEST SELLER
                    </h2>
                    <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-2 border-foreground mt-1 sm:mt-3" />
                  </div>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                    className="w-12 sm:w-24 h-auto shrink-0"
                    alt="Product rating"
                  />
                </div>
              </div>
            </div>

            {/* Featured Products Section */}
            <div className="col-span-2 min-w-0">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 min-w-0">
                {/* Left Column */}
                <div className="flex flex-col items-center text-center min-w-0">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/4c8dddab5ce8d8c3b5a66a3f0014bda4c2796400?placeholderIfAbsent=true"
                    className="w-full max-w-full sm:max-w-sm h-auto object-contain"
                    alt="Featured products banner"
                  />
                  <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 mt-2 sm:mt-8 md:mt-12">
                    <h1 className="text-xs sm:text-2xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight">
                      Featured Products
                    </h1>
                  </div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-1 sm:mt-4 max-w-full leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả
                    hai nhu cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc
                    quyền, thiết kế tinh tế, sẵn sàng giao ngay. Sản phẩm
                    custom: Nhận thiết kế và in theo yêu cầu riêng.
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
                    src="/images/right.png"
                    className="w-full h-auto object-cover rounded-2xl"
                    alt="Featured product display"
                  />
                </div>
              </div>

              {/* Bottom Product Labels */}
              <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-4 mt-2 sm:mt-6">
                <div className="min-w-0">
                  <h3 className="text-[10px] sm:text-xl md:text-2xl font-semibold text-foreground truncate">
                    MY PRODUCT
                  </h3>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-2 border-foreground mt-1 sm:mt-2" />
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                  className="w-12 sm:w-24 h-auto shrink-0"
                  alt="Product rating"
                />
                <div className="min-w-0">
                  <h3 className="text-[10px] sm:text-xl md:text-2xl font-semibold text-foreground truncate">
                    3D PRINT
                  </h3>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-2 border-foreground mt-1 sm:mt-2" />
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/67085565f6fd46364b88bb74f5ca03e4c14069cf?placeholderIfAbsent=true"
                  className="w-12 sm:w-24 h-auto shrink-0"
                  alt="Product rating"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
