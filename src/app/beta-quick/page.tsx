'use client';

import dynamic from "next/dynamic";

const ShortSurvey = dynamic(() => import("@/components/PromptabilityShortSurvey"), { ssr: false });

export default function QuickBetaPage() {
  return (
    <div className="min-h-screen">
      <ShortSurvey 
        submitUrl="/api/beta/submit" 
        apiKey={process.env.NEXT_PUBLIC_BETA_API_KEY} 
      />
    </div>
  );
}