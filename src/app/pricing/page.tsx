import PricingCards from "../components/PricingCards";

export const metadata = {
  title: "Pricing | Promptability",
  description: "Choose the plan that fits your workflow.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
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
      <div className="relative z-40 pt-20 sm:pt-20">
        <PricingCards />
      </div>
    </main>
  );
}
