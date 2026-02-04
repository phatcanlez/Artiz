import React, { useState } from "react";
import Product3DViewer from "./Product3DViewer";

const ProductShowcaseDetail: React.FC = () => {
  const [viewMode, setViewMode] = useState<"3d" | "image">("3d");

  return (
    <section className="self-center w-full max-w-[1240px] mt-20 px-5 max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[68%] max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col items-stretch mt-5 max-md:max-w-full">
            {/* Toggle buttons để chuyển giữa 3D và hình ảnh */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setViewMode("3d")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === "3d"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode("image")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === "image"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Image View
              </button>
            </div>

            {/* Hiển thị 3D hoặc hình ảnh */}
            {viewMode === "3d" ? (
              <div className="w-full aspect-[1.13]">
                <Product3DViewer className="w-full h-full" />
              </div>
            ) : (
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a62acc892543afbb94e7244883611999c1b7a935?placeholderIfAbsent=true"
                className="aspect-[1.13] object-contain w-full max-md:max-w-full"
                alt="Men Armor Black Silver main product image"
              />
            )}

            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/487fb0253b5c84d089312a83352ccc4c19ef3dfd?placeholderIfAbsent=true"
              className="aspect-[9.9] object-contain w-[716px] max-w-full mt-[13px]"
              alt="Product gallery thumbnails"
            />
          </div>
        </div>
        <div className="w-[32%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-stretch text-xl text-white font-medium">
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/983ff0dbdc6e666ed16921a7c321f02489227a0e?placeholderIfAbsent=true"
              className="aspect-[10] object-contain w-[400px]"
              alt="Product rating stars"
            />
            <div className="flex items-center gap-2">
              <h1 className="text-[32px] font-bold mt-1.5 flex gap-2 items-center">
                Men Armor Black Silver
              </h1>
            </div>
            <div className="text-2xl font-normal mt-[27px]">3.850.000 VND</div>
            <div
              className="flex gap-1 text-xs font-normal mt-2.5"
              role="img"
              aria-label="5 star rating"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[13px] shrink-0"
                alt=""
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[13px] shrink-0"
                alt=""
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[13px] shrink-0"
                alt=""
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[13px] shrink-0"
                alt=""
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[13px] shrink-0"
                alt=""
              />
              <span className="self-stretch">( 2 reviews )</span>
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/0fc26a5190ff5d6a485dd7da3c91be04549aa42f?placeholderIfAbsent=true"
              className="aspect-[7.75] object-contain w-[395px] mt-[27px] rounded-[3px]"
              alt="Product color options"
            />
            <button className="flex flex-col relative aspect-[6.746] w-[398px] items-center text-black font-bold justify-center mt-[25px] px-[70px] py-4 rounded-md max-md:px-5 hover:opacity-90 transition-opacity">
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
                className="absolute h-full w-full object-cover inset-0 rounded-md"
                alt=""
              />
              <span className="relative">Buy it now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseDetail;
