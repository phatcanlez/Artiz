import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductShowcaseDetail from "@/components/ProductShowcaseDetail";
import ProductInfo from "@/components/ProductInfo";
import ReviewsSection from "@/components/ReviewsSection";
import ReviewForm from "@/components/ReviewForm";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import { apiClient, type Product } from "@/lib/api";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const numId = id ? parseInt(id, 10) : NaN;
    if (!Number.isFinite(numId)) return;
    apiClient
      .getProduct(numId)
      .then((p) => setProduct(p))
      .catch(() => setProduct(null));
  }, [id]);

  const productForInfo = product
    ? {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        averageRating: product.averageRating,
        reviewCount: product.reviewCount,
        description: product.description,
        size: product.size,
        material: product.material,
        productPolicy: product.productPolicy,
        productPreservation: product.productPreservation,
        deliveryTax: product.deliveryTax,
        stock: product.stock,
      }
    : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Header />

      <main className="flex flex-col items-center pt-4 sm:pt-8 pb-10 sm:pb-20">
        <div className="w-full max-w-[1240px] px-4 sm:px-5 min-w-0">
          {/* Top Section: Showcase + Info */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 min-w-0">
            <ProductShowcaseDetail product={product ?? undefined} />
            <div className="flex-1 min-w-0 lg:max-w-[500px] mt-6 lg:mt-0">
              <ProductInfo product={productForInfo} />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 my-10 sm:my-16 relative">
            <img
              src="/element/star.png"
              alt=""
              className="absolute left-0 -top-[10px] w-5 h-5 object-contain"
            />
            <img
              src="/element/star.png"
              alt=""
              className="absolute left-[30%] -top-[8px] w-4 h-4 object-contain"
            />
            <img
              src="/element/star.png"
              alt=""
              className="absolute right-[30%] -top-[8px] w-4 h-4 object-contain"
            />
            <img
              src="/element/star.png"
              alt=""
              className="absolute right-0 -top-[10px] w-5 h-5 object-contain"
            />
          </div>

          {/* Reviews Section */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-20 min-w-0">
            <div className="flex-1 min-w-0">
              <ReviewsSection />
            </div>
            {/* Divider Vertical on desktop */}
            <div className="hidden lg:block w-px bg-white/20 relative shrink-0">
              <div className="absolute top-0 -left-[5px] w-2 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-50"></div>
            </div>
            <div className="w-full lg:w-[400px] shrink-0 max-w-full">
              <ReviewForm />
            </div>
          </section>
        </div>

        {/* SocialProof — full width, outside constrained container */}
        <div className="w-full mt-12 sm:mt-20">
          <SocialProof />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;
