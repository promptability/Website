'use client';

import ClaudeGuideHero from './components/ClaudeGuideHero';
import ClaudeGuideSidebar from './components/ClaudeGuideSidebar';
import CoreRulesConstitution from './components/CoreRulesConstitution';
import AdvancedTricks from './components/AdvancedTricks';
import ClaudeVsGPT from './components/ClaudeVsGPT';
import CommonPitfalls from './components/CommonPitfalls';
import ExamplePrompts from './components/ExamplePrompts';
import InteractiveClaudeLab from './components/InteractiveClaudeLab';
import ResourcesHub from './components/ResourcesHub';

export default function ClaudeGuidePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(120,119,198,0.05)_50%,transparent_70%)]" />
      
      {/* Content */}
      <div className="relative z-10">
        <ClaudeGuideHero />
        
        <div className="flex max-w-7xl mx-auto px-4 relative">
          {/* Sticky Sidebar */}
          <ClaudeGuideSidebar />
          
          {/* Main Content */}
          <main className="flex-1 lg:ml-80">
            <CoreRulesConstitution />
            <AdvancedTricks />
            <ClaudeVsGPT />
            <CommonPitfalls />
            <ExamplePrompts />
            <InteractiveClaudeLab />
            <ResourcesHub />
          </main>
        </div>
      </div>
    </div>
  );
}