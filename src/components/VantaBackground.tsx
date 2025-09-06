'use client';

export default function VantaBackground() {
  return (
    <div className="fixed inset-0 z-10">
      {/* Dramatic visible background for testing */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(30, 58, 138, 0.2) 50%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      {/* Moving dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}