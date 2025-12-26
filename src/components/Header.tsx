import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="relative w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3e] via-[#0f0f2a] to-transparent opacity-90" />
      
      <div className="relative z-10 flex flex-col items-center px-6 md:px-20 py-4">
        {/* Top Navigation */}
        <nav className="flex items-center gap-6 md:gap-8 text-base md:text-lg font-medium text-foreground/90">
          <a href="#about" className="hover:text-accent transition-colors">About Us</a>
          <a href="#scan-ai" className="hover:text-accent transition-colors">Scan Ai</a>
          <a href="#shop" className="hover:text-accent transition-colors">Shop</a>
          <a href="#news" className="hover:text-accent transition-colors">News</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </nav>
        
        {/* Logo and Search Row */}
        <div className="flex items-center justify-between w-full mt-6 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/257e6b1f1a0724634d46e02ccfafc11633c2ec57?placeholderIfAbsent=true"
              className="h-16 md:h-20 w-auto object-contain"
              alt="Artiz Studio Logo"
            />
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm"
                className="w-full bg-secondary/80 text-foreground placeholder-muted-foreground rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* User Icon */}
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <User className="w-8 h-8 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;