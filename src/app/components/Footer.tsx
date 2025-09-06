import Link from "next/link";
import Image from "next/image";
import { Chrome, Twitter, Github, Mail, ArrowRight, BookOpen } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pageCategories = {
    "Main": [
      { href: "/", label: "Home" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
    "Extension": [
      { href: "/chrome-extension", label: "Chrome Extension" },
    ],
    "Guides": [
      { href: "/guides", label: "All Guides" },
      { href: "/guides/gpt", label: "ChatGPT Guide" },
      { href: "/guides/claude", label: "Claude Guide" },
      { href: "/guides/gemini", label: "Gemini Guide" },
    ]
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Promptability logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-semibold text-xl">Promptability</span>
            </Link>
            
            <p className="text-gray-400 text-sm mb-6">
              The ultimate Chrome extension for optimizing AI prompts. Transform any text into powerful, precise commands.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Page Categories */}
          {Object.entries(pageCategories).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Promptability. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}