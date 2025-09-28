import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, MessageCircle, Shield, Zap, Users } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Product": [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/chrome-extension", label: "Chrome Extension" },
      { href: "/platforms", label: "Supported Platforms" },
    ],
    "Resources": [
      { href: "/guides", label: "AI Guides" },
      { href: "/docs", label: "Documentation" },
      { href: "/faq", label: "FAQ" },
      { href: "/guides/gpt", label: "ChatGPT Guide" },
    ],
    "Company": [
      { href: "#", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ]
  };

  const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Users, label: "LinkedIn" },
    { href: "https://discord.com", icon: MessageCircle, label: "Discord" },
  ];

  return (
    <footer className="relative mt-16 sm:mt-24 lg:mt-32 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
      <div className="relative">

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
            
            {/* Brand Section - Full width on mobile */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Image
                  src="/logo.png"
                  alt="Promptability"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                <span className="text-white font-bold text-lg sm:text-xl">Promptability</span>
              </Link>
              
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 max-w-xs">
                Transform your AI prompts into powerful commands. Works with ChatGPT, Claude, Gemini, and 1000+ AI platforms.
              </p>
              
              {/* Social Links - Responsive sizing */}
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links - Responsive grid */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-1">
                <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{category}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors inline-flex items-center gap-1 group py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quick Actions - Better mobile layout */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Start</h4>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  href="/chrome-extension"
                  className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-all text-xs sm:text-sm"
                >
                  <Zap className="w-4 h-4" />
                  <span>Install Extension</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm"
                >
                  <Shield className="w-4 h-4" />
                  <span>Start Free Trial</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Better mobile stacking */}
          <div className="pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <p className="text-center sm:text-left">© {currentYear} Promptability AI. All rights reserved.</p>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link href="#" className="hover:text-white transition-colors py-1">
                    Privacy
                  </Link>
                  <span className="text-white/20">•</span>
                  <Link href="#" className="hover:text-white transition-colors py-1">
                    Terms
                  </Link>
                  <span className="text-white/20">•</span>
                  <Link href="#" className="hover:text-white transition-colors py-1">
                    Security
                  </Link>
                </div>
              </div>
              
              {/* Mobile-friendly trust badges */}
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <span className="text-xs text-gray-500">Secured by</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}