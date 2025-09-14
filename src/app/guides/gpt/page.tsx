import type { Metadata } from 'next';
import GPTGuideHero from './components/GPTGuideHero';
import GPTGuideSidebar from './components/GPTGuideSidebar';
import Overview from './components/Overview';
import CorePrinciples from './components/CorePrinciples';
import AdvancedStrategies from './components/AdvancedStrategies';
import ModelComparisons from './components/ModelComparisons';
import CommonMistakes from './components/CommonMistakes';
import InteractivePlayground from './components/InteractivePlayground';
import ReferencesFooter from './components/ReferencesFooter';

export const metadata: Metadata = {
  title: 'Master GPT-4 & ChatGPT Prompts | Promptability',
  description: 'The definitive guide to prompt engineering for OpenAI\'s most powerful models. Learn advanced techniques, strategies, and best practices.',
};

export default function GPTGuidePage() {
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
      <GPTGuideHero />
      
      <div className="max-w-7xl mx-auto px-4 relative z-40">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-3">
            <GPTGuideSidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">
            <Overview />
            <CorePrinciples />
            <AdvancedStrategies />
            <ModelComparisons />
            <CommonMistakes />
            <InteractivePlayground />
          </div>
        </div>
      </div>
      
      <ReferencesFooter />
    </div>
  );
}