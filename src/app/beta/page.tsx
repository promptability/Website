'use client';

import dynamic from "next/dynamic";

const Survey = dynamic(() => import("@/components/PromptabilityBetaSurvey"), { ssr: false });

export default function Page() {
  return (
    <div className="min-h-screen">
      <Survey 
        submitUrl="/api/beta/submit" 
        apiKey={process.env.NEXT_PUBLIC_BETA_API_KEY} 
      />
    </div>
  );
}