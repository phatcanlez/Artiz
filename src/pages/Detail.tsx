import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductShowcaseDetail from "@/components/ProductShowcaseDetail";
import ProductInfo from "@/components/ProductInfo";
import ReviewsSection from "@/components/ReviewsSection";
import ReviewForm from "@/components/ReviewForm";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import { SparkleIcon } from "@/components/ui/SparkleIcon";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Product ID:", id);

  return (
    <div className="flex flex-col min-h-screen bg-[#000311] overflow-x-hidden">
      <Header />

      <main className="flex flex-col items-center pt-10 pb-20">
        <div className="w-full max-w-[1240px] px-5">
          {/* Top Section: Showcase + Info */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <ProductShowcaseDetail />
            {/* Product Info - takes remaining width */}
            <div className="flex-1 max-w-[500px]">
              <ProductInfo />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 my-16 relative">
            <div className="absolute left-0 -top-4 text-white">
              <SparkleIcon className="w-10 h-10" />
            </div>
            <div className="absolute left-[30%] -top-3 text-white">
              {/* Center-left sparkle */}
              <SparkleIcon className="w-6 h-6" />
            </div>
            <div className="absolute right-[30%] -top-3 text-white">
              {/* Center-right sparkle */}
              <SparkleIcon className="w-6 h-6" />
            </div>
            <div className="absolute right-0 -top-4 text-white">
              <SparkleIcon className="w-10 h-10" />
            </div>
          </div>

          {/* Reviews Section */}
          <section className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <div className="flex-1">
              <ReviewsSection />
            </div>
            {/* Divider Vertical on Desktop */}
            <div className="hidden lg:block w-px bg-white/20 relative">
              <div className="absolute top-0 -left-[5px] w-2 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-50"></div>
            </div>
            <div className="lg:w-[400px] shrink-0">
              <ReviewForm />
            </div>
          </section>
        </div>

        <div className="w-full max-w-[1240px] px-5 mt-20">
          <SocialProof />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;
