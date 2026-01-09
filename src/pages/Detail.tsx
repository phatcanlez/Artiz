import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductShowcaseDetail from '@/components/ProductShowcaseDetail';
import ProductInfo from '@/components/ProductInfo';
import ReviewsSection from '@/components/ReviewsSection';
import ReviewForm from '@/components/ReviewForm';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch product data based on the id
  // For now, we'll just use the id to demonstrate the routing
  console.log('Product ID:', id);

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311]">
      <Header />

      <main className="flex flex-col items-center">
        <ProductShowcaseDetail />

        <div className="w-full max-w-[1240px] mt-[42px] px-5 max-md:mt-10">
          <div className="w-full max-w-[400px]">
            <ProductInfo />
          </div>
        </div>

        <section className="w-full max-w-[1240px] flex gap-10 flex-wrap justify-between mt-[71px] px-5 max-md:mt-10">
          <ReviewsSection />
          <ReviewForm />
        </section>

        <div className="w-full max-w-[1240px] px-5">
          <SocialProof />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;

