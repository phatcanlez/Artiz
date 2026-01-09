import React from 'react';
import { Link } from 'react-router-dom';

const AboutCTA: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Hãy liên hệ với chúng tôi ngay hôm nay để biến ý tưởng của bạn thành hiện thực. 
          Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="relative px-12 py-5 rounded-lg overflow-hidden group"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
              className="absolute h-full w-full object-cover inset-0 rounded-lg"
              alt=""
            />
            <span className="relative z-10 text-xl font-bold text-[#102314] group-hover:opacity-90 transition-opacity">
              VIEW PRODUCTS
            </span>
          </Link>
          <Link
            to="#contact"
            className="px-12 py-5 rounded-lg border-2 border-white text-white font-bold text-xl hover:bg-white hover:text-black transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;

