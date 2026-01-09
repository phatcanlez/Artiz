import React from 'react';
import Header from '@/components/Header';
import HeroProductList from '@/components/HeroProductList';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

const ProductList = () => {
  return (
    <div className="w-full min-h-screen bg-[#000311]">
      <Header />
      <main>
        <HeroProductList />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;

