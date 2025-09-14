import type { Metadata } from 'next';
import GeminiGuideHero from './components/GeminiGuideHero';
import GuideSidebar from './components/GuideSidebar';
import CorePrinciples from './components/CorePrinciples';
import GeminiTricks from './components/GeminiTricks';
import ComparisonTable from './components/ComparisonTable';
import UseCases from './components/UseCases';
import CommonPitfalls from './components/CommonPitfalls';
import InteractiveElements from './components/InteractiveElements';
import GuideFooter from './components/GuideFooter';

export const metadata: Metadata = {
  title: 'Master Google Gemini Prompts | Promptability',
  description: 'The complete guide to getting exceptional results from Google\'s most powerful AI. Learn advanced techniques, tricks, and best practices.',
};

export default function GeminiGuidePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
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
      <GeminiGuideHero />
      
      <div className="max-w-7xl mx-auto px-4 relative z-40">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-3">
            <GuideSidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">
            <CorePrinciples />
            <GeminiTricks />
            <ComparisonTable />
            <UseCases />
            <CommonPitfalls />
            <InteractiveElements />
          </div>
        </div>
      </div>
      
      <GuideFooter />
    </div>
  );
}