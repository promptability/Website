"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, BookOpen, ArrowRight, User, Settings, LogOut, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [profileHoverTimeout, setProfileHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Use real auth state from Firebase
  const { user, userProfile, loading } = useAuth();

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

  const handleProfileMouseEnter = () => {
    if (profileHoverTimeout) {
      clearTimeout(profileHoverTimeout);
      setProfileHoverTimeout(null);
    }
    setProfileOpen(true);
  };

  const handleProfileMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProfileOpen(false);
    }, 200); // 200ms delay before closing
    setProfileHoverTimeout(timeout);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setProfileOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/platforms", label: "Platforms" },
    { href: "/pricing", label: "Pricing" },
  ];

  const guideLinks = [
    { href: "/guides/gpt", label: "ChatGPT" },
    { href: "/guides/claude", label: "Claude AI" },
    { href: "/guides/gemini", label: "Google Gemini" },
    { href: "/guides/perplexity", label: "Perplexity" },
    { href: "/guides/midjourney", label: "Midjourney" },
    { href: "/guides/runway", label: "Runway" },
  ];

  // Get display name for the user
  const getDisplayName = () => {
    if (userProfile?.displayName) return userProfile.displayName;
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    }
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Get user plan for display
  const getUserPlan = () => {
    // This would come from userProfile or subscription data
    // For now, default to checking if they have a subscription
    return userProfile?.planType || 'Free';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Promptability logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-xl">Promptability</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
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
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                Guides
                <ChevronDown className="w-3 h-3" />
              </button>

              {guidesOpen && (
                <div className="absolute top-full mt-2 w-64 bg-black/95 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-3">
                    {guideLinks.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <span>{guide.label}</span>
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/chrome-extension"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300"
                >
                  Get Extension
                </Link>

                <div 
                  className="relative"
                  onMouseEnter={handleProfileMouseEnter}
                  onMouseLeave={handleProfileMouseLeave}
                >
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {getDisplayName()[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <ChevronDown className="w-3 h-3 text-white/60" />
                  </button>

                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-white font-medium">{getDisplayName()}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {getUserPlan() !== 'Free' && (
                            <Crown className="w-3 h-3 text-yellow-400" />
                          )}
                          <span className="text-xs text-yellow-400">{getUserPlan()} Plan</span>
                        </div>
                      </div>
                      
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Account
                      </Link>
                      
                      <Link
                        href="/account?tab=settings"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={handleSignOut}
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
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/chrome-extension"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300"
                >
                  Get Extension
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-white/10 my-2 pt-2">
                {guideLinks.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span>{guide.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/10 my-2 pt-2">
                {loading ? (
                  <div className="px-4 py-2">
                    <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ) : user ? (
                  <>
                    <div className="px-4 py-2 mb-2">
                      <div className="text-white font-medium">{getDisplayName()}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {getUserPlan() !== 'Free' && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                        <span className="text-xs text-yellow-400">{getUserPlan()} Plan</span>
                      </div>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/chrome-extension"
                      className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Get Extension
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 mt-2 text-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}