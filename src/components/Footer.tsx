import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-black mt-20"
      style={{ marginLeft: "-4vw", marginRight: "-4vw" }}
    >
      <div className="relative w-full">
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
          {/* Cột 1: Logo + Social — ~38% khớp ô trái */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: "38%" }}
          >
            {/* Logo: Asset 8 1.png */}
            <div className="relative mb-4" style={{ width: "28%" }}>
              <img
                src="/element/Asset 8 1.png"
                className="object-contain w-full"
                alt="Artiz Logo"
              />
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                title="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <Facebook size={22} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="Twitter"
                className="hover:opacity-70 transition-opacity"
              >
                <Twitter size={22} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="YouTube"
                className="hover:opacity-70 transition-opacity"
              >
                <Youtube size={22} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram size={22} className="text-white" />
              </a>
            </div>
          </div>

          {/* Cột 2: POLICY — ~20% */}
          <div
            className="flex flex-col"
            style={{ width: "20%", paddingLeft: "50px", paddingTop: "3%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              POLICY
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Exchange Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Payment
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: LINK — ~20% */}
          <div
            className="flex flex-col"
            style={{ width: "20%", paddingTop: "3%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              LINK
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Scan Ai
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/news" className="hover:text-white transition-colors">
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: CUSTOMER SUPPORT — ~22% */}
          <div
            className="flex flex-col"
            style={{ width: "22%", paddingTop: "3%", marginLeft: "-6.5%" }}
          >
            <h3
              className="font-black uppercase mb-3"
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(14px,1.4vw,20px)",
                letterSpacing: "0.05em",
              }}
            >
              CUSTOMER SUPPORT
            </h3>
            <ul
              className="text-gray-300"
              style={{ fontSize: "clamp(11px,1vw,14px)", lineHeight: "2.2" }}
            >
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ordering Guide
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
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
