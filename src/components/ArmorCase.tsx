import React, { useState, useRef } from "react";

const ArmorCase = () => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="w-full px-4 md:px-8 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Armor Case
            </h2>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6c29d9b0b6f725075dd14c455c008cf4661ea7e8?placeholderIfAbsent=true"
              className="w-full max-w-sm h-auto mt-8 md:mt-12"
              alt="Armor case product showcase"
            />
            <p className="text-sm text-muted-foreground mt-6 max-w-xs leading-relaxed">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền,
              thiết kế tinh tế, sẵn sàng giao ngay.
            </p>
            <button
              className="w-20 h-20 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors mt-10"
              aria-label="View product details"
            />
          </div>

          {/* Center Image */}
          <div
            className="flex items-center justify-center perspective-1000"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-full max-w-lg h-auto object-contain transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/41ae12015e67a124b568235324467030515a8463?placeholderIfAbsent=true"
                className="w-full h-auto object-contain"
                alt="Armor case main product image"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai
              nhu cầu: Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền,
              thiết kế tinh tế, sẵn sàng giao ngay. Sản phẩm custom: Nhận thiết
              kế và in theo yêu cầu riêng.
            </p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/58876fc99918f5c425dc2d356bc0266afba717f1?placeholderIfAbsent=true"
              className="w-full max-w-sm h-auto mt-10"
              alt="Additional product showcase"
            />
            <button
              className="w-20 h-20 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors mt-10 md:mt-20"
              aria-label="View more products"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArmorCase;
