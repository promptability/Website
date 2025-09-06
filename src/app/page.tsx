import Hero from './components/Hero';
import DualPromptTester from './components/DualPromptTester';
import PlatformsShowcase from './components/PlatformsShowcase';
import Features from './components/Features';
import EnhancedFAQ from './components/EnhancedFAQ';
import PricingCards from './components/PricingCards';

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-spotlight" />
        <div className="absolute inset-0 opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>
      
      <Hero />
      <DualPromptTester />
      <PlatformsShowcase />
      <Features />
      <PricingCards />
      <EnhancedFAQ />
    </main>
  );
}
