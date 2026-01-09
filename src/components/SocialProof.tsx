import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section className="mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[33%] max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/15e58cb16debd75ba1b3797d6ce971e513933447?placeholderIfAbsent=true"
            className="aspect-[0.55] object-contain w-full grow"
            alt="Social proof image 1"
          />
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-center mt-[76px] max-md:mt-10">
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/5561a4c249e1e62ffcd67110f57cb3442827f9b5?placeholderIfAbsent=true"
              className="aspect-[8.93] object-contain w-[401px] max-w-full"
              alt="Company logo"
            />
            <h2 className="text-white text-[64px] font-normal mt-[59px] max-md:text-[40px] max-md:mt-10">
              SOCIAL PROOF
            </h2>
            <p className="text-white text-sm font-normal text-center self-stretch mt-[9px]">
              Chúng tôi cung cấp dịch vụ in 3D chất lượng cao, đáp ứng cả hai nhu cầu:
              <br />
              Sản phẩm có sẵn: Bộ sưu tập các mẫu in 3D độc quyền, thiết kế tinh tế, sẵn sàng giao ngay.
              <br />
              Sản phẩm custom: Nhận thiết kế và in theo yêu cầu riêng – từ mô hình, phụ kiện, đến vật dụng cá nhân hoá.
            </p>
            <img
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9c7480d2842ff3d62d9115a8cf40fb1f3db4249e?placeholderIfAbsent=true"
              className="aspect-[0.97] object-contain w-[397px] max-w-full mt-16 max-md:mt-10"
              alt="Social media post"
            />
            <div className="flex w-[396px] max-w-full items-stretch gap-1 mt-[13px]">
              <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
                <h3 className="text-white text-2xl font-bold">
                  @_Phong2402_
                </h3>
                <div className="flex items-center">
                  <div className="border flex w-3.5 shrink-0 h-3.5 mt-[13px] rounded-full border-white border-solid" />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/7a134e46d22aa70e5ecaa266895705308b169d67?placeholderIfAbsent=true"
                    className="aspect-[14.29] object-contain w-fit grow shrink-0 basis-0"
                    alt="Social media verification"
                  />
                </div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/88ca87d22080ee1b4d0c8075f9af8271ec9522b3?placeholderIfAbsent=true"
                className="aspect-[2.94] object-contain w-[94px] shrink-0 mt-2"
                alt="Social media platform logo"
              />
            </div>
          </div>
        </div>
        <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/49db294d6fe4125f811f215804939c75ae23ef7b?placeholderIfAbsent=true"
            className="aspect-[0.56] object-contain w-full grow"
            alt="Social proof image 2"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

