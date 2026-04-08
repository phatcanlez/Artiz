import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const ARIAL = "'Hubot Sans', sans-serif";

const socialIcons = (size: number) => [
  <a
    key="fb"
    href="#"
    title="Facebook"
    className="hover:opacity-70 transition-opacity"
  >
    <Facebook size={size} fill="white" className="text-white" />
  </a>,
  <a
    key="tw"
    href="#"
    title="Twitter"
    className="hover:opacity-70 transition-opacity"
  >
    <Twitter size={size} fill="white" className="text-white" />
  </a>,
  <a
    key="yt"
    href="#"
    title="YouTube"
    className="hover:opacity-70 transition-opacity"
  >
    <Youtube size={size} fill="white" className="text-white" />
  </a>,
  <a
    key="ig"
    href="#"
    title="Instagram"
    className="hover:opacity-70 transition-opacity"
  >
    <Instagram size={size} className="text-white" />
  </a>,
];

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-black mt-20"
      style={{ marginLeft: "-4vw", marginRight: "-4vw" }}
    >
      {/* ── MOBILE layout (< md) ── */}
      <div className="md:hidden text-white px-6 py-10 flex flex-col gap-8">
        {/* Logo + social */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/icon/logoWhite.svg"
            className="w-28 object-contain"
            alt="Artiz Logo"
          />
          ?
        </div>

        {/* POLICY */}
        <div>
          <h3
            className="font-black uppercase text-base mb-3"
            style={{ fontFamily: ARIAL }}
          >
            CHÍNH SÁCH
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Đăng nhập
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Thanh toán
              </a>
            </li>
          </ul>
        </div>

        {/* LINK */}
        <div>
          <h3
            className="font-black uppercase text-base mb-3"
            style={{ fontFamily: ARIAL }}
          >
            LIÊN KẾT
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-white transition-colors"
              >
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-white transition-colors">
                Tin tức
              </a>
            </li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3
            className="font-black uppercase text-base mb-3"
            style={{ fontFamily: ARIAL }}
          >
            HỖ TRỢ KHÁCH HÀNG
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Hướng dẫn đặt hàng
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                F&A
              </a>
            </li>
          </ul>
        </div>

        <p className="text-center text-gray-400 text-xs pt-2">
          © 2025 Copyright by Artiz Studio
        </p>
      </div>

      {/* ── DESKTOP layout (md+) ── */}
      <div className="hidden md:block relative w-full">
        <img
          src="/element/footer.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto block"
        />

        {/* Nội dung đè lên khớp theo khung ảnh */}
        <div
          className="absolute inset-0 flex text-white"
          style={{
            paddingTop: "3%",
            paddingBottom: "10%",
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          {/* Cột 1: Logo + Social */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: "38%" }}
          >
            <div className="relative mb-4" style={{ width: "28%" }}>
              <img
                src="/icon/logoWhite.svg"
                className="object-contain w-full"
                alt="Artiz Logo"
              />
            </div>
            <div className="flex gap-4">
              {[
                <Facebook
                  key="fb"
                  style={{
                    width: "clamp(14px,1.8vw,22px)",
                    height: "clamp(14px,1.8vw,22px)",
                  }}
                  fill="white"
                  className="text-white"
                />,
                <Twitter
                  key="tw"
                  style={{
                    width: "clamp(14px,1.8vw,22px)",
                    height: "clamp(14px,1.8vw,22px)",
                  }}
                  fill="white"
                  className="text-white"
                />,
                <Youtube
                  key="yt"
                  style={{
                    width: "clamp(14px,1.8vw,22px)",
                    height: "clamp(14px,1.8vw,22px)",
                  }}
                  fill="white"
                  className="text-white"
                />,
                <Instagram
                  key="ig"
                  style={{
                    width: "clamp(14px,1.8vw,22px)",
                    height: "clamp(14px,1.8vw,22px)",
                  }}
                  className="text-white"
                />,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Cột 2: POLICY */}
          <div
            className="flex flex-col"
            style={{ width: "20%", paddingLeft: "4.5%", paddingTop: "3%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: ARIAL,
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              CHÍNH SÁCH
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Thanh toán
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: LINK */}
          <div
            className="flex flex-col"
            style={{ width: "20%", paddingTop: "3%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: ARIAL,
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              LIÊN KẾT
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/news" className="hover:text-white transition-colors">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: CUSTOMER SUPPORT */}
          <div
            className="flex flex-col"
            style={{ width: "22%", paddingTop: "3%", marginLeft: "-6.5%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: ARIAL,
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              HỖ TRỢ KHÁCH HÀNG
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  F&A
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="absolute left-0 right-0 text-center text-gray-400"
          style={{ bottom: "3%", fontSize: "clamp(10px,0.85vw,13px)" }}
        >
          © 2025 Copyright by Artiz Studio
        </div>
      </div>
    </footer>
  );
};

export default Footer;
