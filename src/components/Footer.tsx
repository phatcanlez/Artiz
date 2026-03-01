import React from "react";
import { Facebook, Twitter, Youtube, Instagram, Copyright } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center mt-20">
      {/* Main Framework with White Border */}
      <div className="w-full max-w-[1240px] border border-white mx-5 md:mx-14 bg-black text-white px-5 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Column 1: Logo & Social Media */}
          <div className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white">
            <img
              src="/images/logo.png"
              className="w-24 md:w-32 object-contain mb-6 brightness-0 invert"
              alt="Artiz Logo"
            />
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                title="Facebook"
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook size={20} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="Twitter"
                className="hover:text-gray-300 transition-colors"
              >
                <Twitter size={20} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="YouTube"
                className="hover:text-gray-300 transition-colors"
              >
                <Youtube size={20} fill="white" className="text-white" />
              </a>
              <a
                href="#"
                title="Instagram"
                className="hover:text-gray-300 transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: POLICY */}
          <div className="flex flex-col p-8 border-b md:border-b-0 md:border-r border-white">
            <h3 className="text-lg font-bold mb-6 tracking-wide text-[#44FF00]">
              POLICY
            </h3>
            <ul className="space-y-4 text-sm font-light text-gray-300">
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

          {/* Column 3: LINK */}
          <div className="flex flex-col p-8 border-b md:border-b-0 md:border-r border-white">
            <h3 className="text-lg font-bold mb-6 tracking-wide text-[#44FF00]">
              LINK
            </h3>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#scan-ai"
                  className="hover:text-white transition-colors"
                >
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

          {/* Column 4: CUSTOMER SUPPORT */}
          <div className="flex flex-col p-8">
            <h3 className="text-lg font-bold mb-6 tracking-wide text-[#44FF00]">
              CUSTOMER SUPPORT
            </h3>
            <ul className="space-y-4 text-sm font-light text-gray-300">
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
      </div>

      {/* Copyright Line */}
      <div className="w-full max-w-[1240px] mx-5 md:mx-14 text-center pt-4 pb-5 text-[10px] md:text-xs font-light text-gray-400">
        <div className="flex items-center justify-center gap-1">
          <Copyright size={12} /> 2025 Copyright by Artiz Studio
        </div>
      </div>
    </footer>
  );
};

export default Footer;
