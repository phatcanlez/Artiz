import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductShowcase from "@/components/ProductShowcase";
import ArmorCase from "@/components/ArmorCase";
import WhyChooseUs from "@/components/WhyChooseUs";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";

const Index = () => {
  const productImages1 = [
    "https://api.builder.io/api/v1/image/assets/TEMP/02de465c6f80619f3b40f7852f664ccbdcc42d26?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/02de465c6f80619f3b40f7852f664ccbdcc42d26?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/926a8766a9d2ed790b007ff70b05b0ad06a0703a?placeholderIfAbsent=true",
  ];

  const productImages2 = [
    "https://api.builder.io/api/v1/image/assets/TEMP/f37030e2aa768fc76f98baeb1fd27e1a39e677f8?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/12e420666764b5bead5ccf6db5fbda95585fed80?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/e924b5863dc57cdc18779fa3495688ece884205e?placeholderIfAbsent=true",
  ];

  const productImages3 = [
    "https://api.builder.io/api/v1/image/assets/TEMP/69fee17ce1ee64da7fa192eba9e7209fb5559641?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/325621dafd31fb2e7eaad0cf2b8e1649aa001cfa?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/0aee8d0e256b05e4948d37601b9ad384602b97ce?placeholderIfAbsent=true",
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="">
        <Hero />

        <FeaturedProducts />

        <ArmorCase />

        {/* Explore More Button */}
        {/* <div className="flex justify-center mt-8 sm:mt-10 px-4">
          <Link
            to="/products"
            className="relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-lg overflow-hidden group w-full max-w-sm touch-manipulation"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/95f13e3fb8dd90e6c9e795cc6c566748e9655416?placeholderIfAbsent=true"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Explore more products background"
            />
            <span className="relative z-10 text-base sm:text-xl font-bold text-background group-hover:opacity-80 transition-opacity tracking-wide">
              EXPLORE MORE
            </span>
          </Link>
        </div> */}

        <WhyChooseUs />

        {/* GET EXCLUSIVE OFFERS */}
        <div className="relative mx-[60px] sm:mx-[80px] md:mx-[100px] mt-10 sm:mt-12 md:mt-20">
          <img
            src="/element/GET EXCLUSIVE OFFERS.png"
            alt="Get Exclusive Offers"
            className="w-full h-auto block"
          />
          {/* Input email đè lên ô Email của ảnh */}
          <input
            type="email"
            className="absolute bg-transparent text-white/70 placeholder-white/40 text-sm outline-none"
            style={{ left: "31%", top: "62%", width: "55%", height: "10%" }}
          />
          {/* Button Subscribe đè lên ô Subscribe của ảnh */}
          <button
            className="absolute cursor-pointer"
            aria-label="Subscribe"
            style={{ left: "8%", top: "62%", width: "22%", height: "10%" }}
          />
        </div>

        {/* <div className="mt-8">
          <ProductShowcase
            images={productImages3}
            className="mt-16 md:mt-24 px-4 md:px-8"
          />
        </div> */}

        <LatestNews />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
