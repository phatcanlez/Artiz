import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full mt-16 md:mt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/57f63c4c3a7a4bfb23f59bd6bb3914498125d1fe?placeholderIfAbsent=true"
          className="w-full h-full object-cover"
          alt="Footer background"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      <div className="relative z-10 px-6 md:px-16 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Logo Section */}
            <div className="flex flex-col items-start">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7aa7f58ada9ca9a536fa1c3985a06fa6a8caf95b?placeholderIfAbsent=true"
                className="h-20 w-auto"
                alt="Company logo"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/77e64672954220272a9337534a06b0a3d83b472c?placeholderIfAbsent=true"
                className="h-10 w-auto mt-6"
                alt="Company tagline"
              />
            </div>
            
            {/* Policy Links */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">POLICY</h3>
              <nav className="flex flex-col gap-4">
                <a href="#login" className="text-muted-foreground hover:text-foreground transition-colors">Login</a>
                <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#exchange" className="text-muted-foreground hover:text-foreground transition-colors">Exchange Policy</a>
                <a href="#shipping" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Policy</a>
                <a href="#payment" className="text-muted-foreground hover:text-foreground transition-colors">Payment</a>
              </nav>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">LINK</h3>
              <nav className="flex flex-col gap-4">
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a>
                <a href="#scan-ai" className="text-muted-foreground hover:text-foreground transition-colors">Scan Ai</a>
                <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors">Products</a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a>
                <a href="#news" className="text-muted-foreground hover:text-foreground transition-colors">News</a>
              </nav>
            </div>
            
            {/* Customer Support */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">CUSTOMER SUPPORT</h3>
              <nav className="flex flex-col gap-4">
                <a href="#ordering" className="text-muted-foreground hover:text-foreground transition-colors">Ordering Guide</a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">F&A</a>
              </nav>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-border">
            <span className="text-sm text-muted-foreground">© 2025 Copyright by Artiz Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;