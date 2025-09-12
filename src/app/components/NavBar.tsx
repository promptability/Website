"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, BookOpen, ArrowRight, User, Settings, LogOut } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // TODO: Replace with actual auth state from Firebase
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com', avatar: null });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setGuidesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setGuidesOpen(false);
    }, 200); // 200ms delay before closing
    setHoverTimeout(timeout);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/platforms", label: "Supported Platforms" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
  ];

  const guideCategories = {
    "Chat AI": [
      { href: "/guides/gpt", label: "ChatGPT/GPT-4" },
      { href: "/guides/claude", label: "Claude 3" },
      { href: "/guides/gemini", label: "Google Gemini" },
      { href: "#", label: "Perplexity", comingSoon: true },
    ],
    "Image AI": [
      { href: "#", label: "Midjourney", comingSoon: true },
      { href: "#", label: "DALL-E 3", comingSoon: true },
      { href: "#", label: "Stable Diffusion", comingSoon: true },
    ],
    "Code AI": [
      { href: "#", label: "GitHub Copilot", comingSoon: true },
      { href: "#", label: "Cursor", comingSoon: true },
    ],
    "Video AI": [
      { href: "#", label: "Runway", comingSoon: true },
      { href: "#", label: "Pika Labs", comingSoon: true },
    ]
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Promptability AI logo"
              width={72}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
            <span className="text-white font-semibold tracking-tight text-lg">Promptability</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-base">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Guides Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/guides"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                Guides
                <ChevronDown className={`w-4 h-4 transition-transform ${guidesOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {guidesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg py-3 shadow-xl z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-2 border-b border-white/10 mb-2">
                    <Link
                      href="/guides"
                      className="text-white font-semibold hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      All Guides Hub
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <p className="text-gray-400 text-xs mt-1">Browse all 45+ platform guides</p>
                  </div>
                  
                  {Object.entries(guideCategories).map(([category, items]) => (
                    <div key={category} className="mb-3 last:mb-0">
                      <div className="px-4 py-1">
                        <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wide">{category}</h4>
                      </div>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-6 py-2 text-sm transition-colors ${
                              item.comingSoon 
                                ? 'text-white/40 cursor-not-allowed' 
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.label}</span>
                              {item.comingSoon && (
                                <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded">
                                  Soon
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border border-white/20"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-white text-sm font-medium hidden md:block">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg py-2 shadow-xl z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                      
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Account
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={() => {
                            // TODO: Connect to Firebase auth.signOut()
                            setIsLoggedIn(false);
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className={`md:hidden transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black/90'
        }`}>
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 rounded text-white/85 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Guides Section */}
            <div className="border-t border-white/10 mt-2 pt-2">
              <Link
                href="/guides"
                onClick={() => setOpen(false)}
                className="text-white/60 text-sm font-medium px-2 py-2 flex items-center gap-2 hover:text-white hover:bg-white/10 rounded"
              >
                <BookOpen className="w-4 h-4" />
                All Guides Hub
                <ArrowRight className="w-3 h-3" />
              </Link>
              
              {Object.entries(guideCategories).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-2 py-1">
                    <h4 className="text-white/50 text-xs font-semibold uppercase tracking-wide">{category}</h4>
                  </div>
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-2 rounded text-sm transition-colors ${
                        item.comingSoon 
                          ? 'text-white/40 cursor-not-allowed' 
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.comingSoon && (
                          <span className="text-xs text-orange-400">Soon</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
                <div className="px-2 py-2 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded text-white/85 hover:text-white hover:bg-white/10"
                >
                  <User className="w-4 h-4" />
                  Account
                </Link>
                
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded text-white/85 hover:text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                
                <button
                  onClick={() => {
                    // TODO: Connect to Firebase auth.signOut()
                    setIsLoggedIn(false);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-2 py-2 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 rounded text-white/85 hover:text-white hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
