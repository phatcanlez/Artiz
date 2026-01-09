import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col relative min-h-[445px] w-full mt-[143px] pt-px pb-[9px] px-[57px] rounded-[14px] max-md:mt-10 max-md:px-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/b6e4b1143bd381fb64344f1e84d4a66849b51675?placeholderIfAbsent=true"
        className="absolute h-full w-full object-cover inset-0"
        alt="Footer background"
      />
      <div className="relative w-full max-w-[1155px] mx-auto">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[39%] max-md:w-full max-md:ml-0">
            <div className="relative flex grow items-stretch gap-1 max-md:mt-10">
              <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/7aa7f58ada9ca9a536fa1c3985a06fa6a8caf95b?placeholderIfAbsent=true"
                  className="aspect-[1.78] object-contain w-full"
                  alt="Company logo"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/ea776fa9c77ab794e834d1e7526b1a4bb8a00187?placeholderIfAbsent=true"
                  className="aspect-[5.15] object-contain w-[196px] self-center max-w-full mt-6"
                  alt="Social media icons"
                />
              </div>
            </div>
          </div>
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="relative flex grow items-center gap-5 text-base text-[#F6F6F6] font-normal justify-between max-md:mt-10">
              <nav className="self-stretch flex flex-col my-auto">
                <h3 className="text-2xl font-semibold">POLICY</h3>
                <a href="#login" className="mt-[17px] hover:opacity-80 transition-opacity">Login</a>
                <a href="#privacy" className="mt-[34px] hover:opacity-80 transition-opacity">Privacy Policy</a>
                <a href="#exchange" className="self-stretch mt-[43px] max-md:mt-10 hover:opacity-80 transition-opacity">Exchange Policy</a>
                <a href="#shipping" className="self-stretch mt-[43px] max-md:mt-10 hover:opacity-80 transition-opacity">Shipping Policy</a>
                <a href="#payment" className="mt-[37px] hover:opacity-80 transition-opacity">Payment</a>
              </nav>
              <nav className="self-stretch flex flex-col my-auto">
                <h3 className="text-2xl font-semibold">LINK</h3>
                <a href="#about" className="mt-[17px] hover:opacity-80 transition-opacity">About Us</a>
                <a href="#scan-ai" className="mt-[45px] max-md:mt-10 hover:opacity-80 transition-opacity">Scan Ai</a>
                <a href="#products" className="mt-[45px] max-md:mt-10 hover:opacity-80 transition-opacity">Products</a>
                <a href="#contact" className="self-stretch mt-[45px] max-md:mt-10 hover:opacity-80 transition-opacity">Contact Us</a>
                <a href="#news" className="mt-[29px] hover:opacity-80 transition-opacity">News</a>
              </nav>
            </div>
          </div>
          <div className="w-[28%] ml-5 max-md:w-full max-md:ml-0">
            <nav className="relative flex flex-col text-base text-[#F6F6F6] font-normal mt-[54px] max-md:mt-10">
              <h3 className="text-2xl font-semibold self-stretch">CUSTOMER SUPPORT</h3>
              <a href="#ordering" className="mt-[17px] hover:opacity-80 transition-opacity">Ordering Guide</a>
              <a href="#contact" className="mt-[42px] max-md:mt-10 hover:opacity-80 transition-opacity">Contact</a>
              <a href="#faq" className="mt-[45px] max-md:mt-10 hover:opacity-80 transition-opacity">F&A</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="relative self-center flex items-center gap-1 text-sm text-[#F6F6F6] font-normal mt-[9px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/e33eb22d78b6b25f2ba13a6c6567a245102f9e23?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[21px] shrink-0 my-auto"
          alt="Copyright icon"
        />
        <span className="self-stretch my-auto">
          2025 Copyright by Artiz Studio
        </span>
      </div>
    </footer>
  );
};

export default Footer;
