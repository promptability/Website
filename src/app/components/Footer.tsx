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
      { href: "#", label: "Contact" },
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
    <footer className="relative mt-32 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
      <div className="relative">

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.png"
                  alt="Promptability"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-white font-bold text-xl">Promptability</span>
              </Link>
              
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Transform your AI prompts into powerful commands. Works with ChatGPT, Claude, Gemini, and 1000+ AI platforms.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quick Actions */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Start</h4>
              <div className="space-y-3">
                <Link
                  href="/chrome-extension"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-all text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Install Extension
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  <Shield className="w-4 h-4" />
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <p>© {currentYear} Promptability AI. All rights reserved.</p>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-4">
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}