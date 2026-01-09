import React, { useEffect, useRef } from "react";
import "@google/model-viewer";

// Type definitions cho model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.AllHTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean;
          "camera-controls"?: boolean;
          "interaction-prompt"?: "auto" | "when-focused" | "none";
          "ar-modes"?: string;
          ar?: boolean;
          "ios-src"?: string;
          poster?: string;
          loading?: "auto" | "lazy" | "eager";
          reveal?: "auto" | "interaction" | "manual";
          "shadow-intensity"?: string;
          exposure?: string;
          "environment-image"?: string;
          "skybox-image"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "camera-target"?: string;
          "interpolation-decay"?: string;
          "disable-zoom"?: boolean;
          "disable-pan"?: boolean;
          "disable-tap"?: boolean;
          "touch-action"?: string;
          "animation-name"?: string;
          "animation-crossfade-duration"?: string;
          autoplay?: boolean;
          name?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface Product3DViewerProps {
  modelPath?: string;
  className?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

const Product3DViewer: React.FC<Product3DViewerProps> = ({
  modelPath,
  className = "",
  autoRotate = false,
  cameraControls = true,
}) => {
  const modelViewerRef = useRef<HTMLElement>(null);

  // Sử dụng model mẫu từ internet nếu không có modelPath
  // Model mẫu từ Google - Astronaut
  const defaultModel =
    modelPath || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

  // Các model mẫu khác có thể dùng:
  // 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb'
  // 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb'
  // 'https://modelviewer.dev/shared-assets/models/shishkebab.glb'

  useEffect(() => {
    // Log để debug
    console.log("Product3DViewer mounted, loading model from:", defaultModel);

    // Kiểm tra xem model-viewer đã được load chưa
    if (modelViewerRef.current) {
      const modelViewer = modelViewerRef.current as HTMLElement & {
        addEventListener: (
          type: string,
          listener: (event?: Event) => void
        ) => void;
      };

      // Xử lý sự kiện khi model được load
      modelViewer.addEventListener("load", () => {
        console.log("3D model loaded successfully");
      });

      modelViewer.addEventListener("error", (event?: Event) => {
        const customEvent = event as CustomEvent;
        console.error("Error loading 3D model:", customEvent?.detail);
        console.error("Model path:", defaultModel);
      });
    }
  }, [defaultModel]);

  return (
    <div
      className={`w-full bg-gradient-to-br from-gray-900 to-black rounded-lg ${className}`}
      style={{
        height: "600px",
        minHeight: "600px",
        position: "relative",
      }}
    >
      <model-viewer
        ref={modelViewerRef}
        src={defaultModel}
        alt="3D Product Model"
        auto-rotate={autoRotate}
        camera-controls={cameraControls}
        interaction-prompt="auto"
        shadow-intensity="1"
        environment-image="neutral"
        loading="eager"
        reveal="auto"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Fallback message nếu model không load được */}
        <div
          slot="poster"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", marginBottom: "8px" }}>
              Đang tải mô hình 3D...
            </div>
            <div style={{ fontSize: "14px", color: "#9ca3af" }}>
              {defaultModel}
            </div>
          </div>
        </div>
      </model-viewer>
    </div>
  );
};

export default Product3DViewer;
