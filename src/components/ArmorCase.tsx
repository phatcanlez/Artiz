import React, { useState, useRef } from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";
import { SegmentedRing } from "./ui/SegmentedRing";

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
    <section className="w-full px-4 md:px-8 mt-10 sm:mt-12 md:mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <SparkleIcon className="w-8 h-8 shrink-0" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Armor Case
              </h2>
              <RightSparkleIcon className="h-8 w-auto shrink-0" />
            </div>
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

          {/* Center: Khung vòng tròn cũ (trắng) bên ngoài, 3D ở giữa */}
          <div className="flex items-center justify-center mt-10 lg:mt-0">
            <SegmentedRing
              size={380}
              strokeWidth={10}
              segments={6}
              className="scale-75 sm:scale-90 md:scale-100"
            >
              <model-viewer
                src="/3d/hộp .glb"
                alt="Armor Case 3D"
                auto-rotate
                camera-controls
                interaction-prompt="auto"
                shadow-intensity="1"
                environment-image="neutral"
                loading="eager"
                reveal="auto"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              >
                <div
                  slot="poster"
                  className="flex items-center justify-center h-full text-white/70 text-sm"
                >
                  Đang tải 3D...
                </div>
              </model-viewer>
            </SegmentedRing>
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
