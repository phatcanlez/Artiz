import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Product3DViewer from "@/components/Product3DViewer";
import Footer from "@/components/Footer";

const View3D = () => {
  const navigate = useNavigate();
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelPath, setModelPath] = useState("/3d/hộp .glb");

  // Các model mẫu có sẵn
  const sampleModels = [
    {
      name: "Hộp",
      url: "/3d/hộp .glb",
    },
    {
      name: "Robot Expressive",
      url: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    },
    {
      name: "Neil Armstrong",
      url: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
    },
    {
      name: "Shishkebab",
      url: "https://modelviewer.dev/shared-assets/models/shishkebab.glb",
    },
    {
      name: "Local Model (NeilArmstrong)",
      url: "/3d/NeilArmstrong.glb",
    },
  ];

  const handleModelSelect = (url: string) => {
    setModelPath(url);
  };

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-8 px-4">
        <div className="w-full max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-gray-300 mb-4 flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                3D Model Viewer
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Xem và tương tác với mô hình 3D. Sử dụng chuột để xoay, scroll để
              zoom, và kéo để di chuyển.
            </p>
          </div>

          {/* Controls Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto Rotate Toggle */}
              <div className="flex items-center gap-4">
                <label className="text-white font-medium">Tự động xoay:</label>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    autoRotate
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {autoRotate ? "Bật" : "Tắt"}
                </button>
              </div>

              {/* Model Selection */}
              <div>
                <label className="text-white font-medium block mb-2">
                  Chọn mô hình mẫu:
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleModelSelect(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Chọn mô hình --</option>
                  {sampleModels.map((model, index) => (
                    <option key={index} value={model.url}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Model URL Input */}
            <div className="mt-4">
              <label className="text-white font-medium block mb-2">
                Hoặc nhập URL mô hình tùy chỉnh:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={modelPath}
                  onChange={(e) => setModelPath(e.target.value)}
                  placeholder="Nhập URL hoặc đường dẫn file GLB/GLTF"
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setModelPath("")}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <div
            className="bg-gray-900 rounded-lg p-4"
            style={{ minHeight: "600px" }}
          >
            <Product3DViewer
              modelPath={modelPath || undefined}
              className="w-full"
              autoRotate={autoRotate}
              cameraControls={true}
            />
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hướng dẫn sử dụng:
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  <strong>Xoay mô hình:</strong> Click và kéo chuột
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  <strong>Zoom:</strong> Scroll chuột hoặc pinch trên mobile
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  <strong>Di chuyển:</strong> Giữ Shift + kéo chuột
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  <strong>Định dạng hỗ trợ:</strong> GLB, GLTF
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default View3D;
