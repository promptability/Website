import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Promptability Beta Survey UI (single-file React component)
 * - Tailwind CSS for styling
 * - No external UI libs required
 * - Features:
 *   • Sectioned form (sticky sidebar nav)
 *   • Required-field validation
 *   • Autosave to localStorage
 *   • Export responses to JSON
 *   • Clean, compact, keyboard-friendly UI
 */

// ---------------------------- Types ----------------------------

type QType = "multiple_choice" | "paragraph" | "linear";

type Question = {
  id: string;
  text: string;
  type: QType;
  options?: string[]; // for multiple choice
  required: boolean;
  section: string;
  // for linear scale
  scaleMin?: number;
  scaleMax?: number;
  scaleLabel?: string; // e.g., "Strongly Disagree to Strongly Agree"
};

// ------------------------- Data Source -------------------------
// Converted from the CSV you provided (1:1 mapping).
// Tip: If you edit text here, keep IDs stable for autosave to keep working.

const QUESTIONS: Question[] = [
  // Onboarding & First-Run
  {
    id: "onb_perm_clarity",
    text: "How would you rate the clarity of the permission request during installation?",
    type: "multiple_choice",
    options: [
      "Very clear",
      "Somewhat clear",
      "Neutral",
      "Somewhat confusing",
      "Very confusing",
    ],
    required: true,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_time_understand",
    text: "After installing how long did it take you to understand what Promptability does?",
    type: "multiple_choice",
    options: [
      "Under 30 seconds",
      "30 seconds - 1 minute",
      "1-2 minutes",
      "2-5 minutes",
      "Over 5 minutes",
    ],
    required: true,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_google_signin",
    text: "The Google sign-in process felt:",
    type: "multiple_choice",
    options: [
      "Very smooth",
      "Smooth",
      "Acceptable",
      "Problematic",
      "Very problematic",
    ],
    required: true,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_comfort_ai_sites",
    text: "How comfortable are you with Promptability accessing AI sites like ChatGPT and Claude?",
    type: "multiple_choice",
    options: [
      "Very comfortable",
      "Comfortable",
      "Neutral",
      "Uncomfortable",
      "Very uncomfortable",
    ],
    required: true,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_first_impression",
    text: "Describe your first impression when the floating widget appeared on an AI site.",
    type: "paragraph",
    required: false,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_unanswered_qs",
    text: "What questions did you have during the initial setup that weren't answered?",
    type: "paragraph",
    required: false,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_onboarding_intuitive",
    text: "The onboarding process was intuitive and easy to follow.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Onboarding & First-Run",
  },
  {
    id: "onb_confident_after_first_run",
    text: "I felt confident using Promptability after the first-run experience.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Onboarding & First-Run",
  },

  // Core Workflow & Features
  {
    id: "core_widget_appears",
    text: "When you select text on an AI site the floating widget appears:",
    type: "multiple_choice",
    options: [
      "Always immediately",
      "Usually within 1 second",
      "Sometimes delayed",
      "Often doesn't appear",
      "Never appears",
    ],
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_usefulness_rate",
    text: "How often does the Generate Enhanced Prompt feature produce useful results?",
    type: "multiple_choice",
    options: [
      "Always (90-100%)",
      "Usually (70-89%)",
      "Sometimes (50-69%)",
      "Rarely (30-49%)",
      "Never (0-29%)",
    ],
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_send_to_ai_success",
    text: "The Send to AI button successfully places the prompt in the correct input field:",
    type: "multiple_choice",
    options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_platform_adapt",
    text: "When switching between ChatGPT and Claude does Promptability adapt appropriately?",
    type: "multiple_choice",
    options: [
      "Always optimizes correctly",
      "Usually adapts well",
      "Sometimes adapts",
      "Rarely adapts",
      "Doesn't seem to adapt",
    ],
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_improved_interaction_story",
    text: "Describe a situation where Promptability significantly improved your AI interaction.",
    type: "paragraph",
    required: false,
    section: "Core Workflow & Features",
  },
  {
    id: "core_best_worst_text",
    text: "What types of text selections work best/worst with the prompt generator?",
    type: "paragraph",
    required: false,
    section: "Core Workflow & Features",
  },
  {
    id: "core_session_mgmt_use",
    text: "How do you typically use the session management and history features?",
    type: "paragraph",
    required: false,
    section: "Core Workflow & Features",
  },
  {
    id: "core_widget_expectations",
    text: "The floating widget appears exactly when I expect it to.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_prompt_better",
    text: "Generated prompts are significantly better than my original text.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_workflow_natural",
    text: "The workflow from text selection to sending enhanced prompts feels natural.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Core Workflow & Features",
  },
  {
    id: "core_platform_specific_helpful",
    text: "Platform-specific optimizations are noticeable and helpful.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Core Workflow & Features",
  },

  // User Interface & Design
  {
    id: "ui_size_position",
    text: "The floating widget's size and position on the screen is:",
    type: "multiple_choice",
    options: [
      "Perfect",
      "Good",
      "Acceptable",
      "Too small/large",
      "Poorly positioned",
    ],
    required: true,
    section: "User Interface & Design",
  },
  {
    id: "ui_restore_minimized",
    text: "When the widget is minimized can you easily find and restore it?",
    type: "multiple_choice",
    options: [
      "Always easy",
      "Usually easy",
      "Sometimes difficult",
      "Often difficult",
      "Always difficult",
    ],
    required: true,
    section: "User Interface & Design",
  },
  {
    id: "ui_drag_drop",
    text: "The drag-and-drop functionality for repositioning the widget works:",
    type: "multiple_choice",
    options: ["Perfectly", "Well", "Acceptably", "Poorly", "Not at all"],
    required: true,
    section: "User Interface & Design",
  },
  {
    id: "ui_unclear_elements",
    text: "What UI elements in the floating widget are unclear or confusing?",
    type: "paragraph",
    required: false,
    section: "User Interface & Design",
  },
  {
    id: "ui_layout_improvements",
    text: "Suggest improvements for the prompt generation interface layout.",
    type: "paragraph",
    required: false,
    section: "User Interface & Design",
  },
  {
    id: "ui_labels_icons_clarity",
    text: "Button labels and icons clearly indicate their functions.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "User Interface & Design",
  },
  {
    id: "ui_theme_adaptation",
    text: "The dark/light theme adapts well to different websites.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "User Interface & Design",
  },
  {
    id: "ui_error_messages",
    text: "Error messages are helpful and actionable.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "User Interface & Design",
  },

  // Performance & Speed
  {
    id: "perf_loading_slowdown",
    text: "How often do you notice AI sites loading slower when Promptability is active?",
    type: "multiple_choice",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    required: true,
    section: "Performance & Speed",
  },
  {
    id: "perf_generation_speed",
    text: "Prompt generation speed feels:",
    type: "multiple_choice",
    options: [
      "Very fast (<2 seconds)",
      "Fast (2-4 seconds)",
      "Acceptable (4-7 seconds)",
      "Slow (7-15 seconds)",
      "+Very slow (>15 seconds)",
    ].map((o) => o.replace("+", "")),
    required: true,
    section: "Performance & Speed",
  },
  {
    id: "perf_slowdowns_crashes",
    text: "Describe any situations where Promptability caused browser slowdowns or crashes.",
    type: "paragraph",
    required: false,
    section: "Performance & Speed",
  },
  {
    id: "perf_no_impact",
    text: "Promptability doesn't noticeably impact my browsing speed.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Performance & Speed",
  },
  {
    id: "perf_responsive_heavy_use",
    text: "The extension feels responsive during heavy AI usage sessions.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Performance & Speed",
  },

  // Reliability & Bugs
  {
    id: "rel_trigger_failure_rate",
    text: "How often does text selection fail to trigger the floating widget when expected?",
    type: "multiple_choice",
    options: [
      "Never",
      "Rarely (once a week)",
      "Sometimes (daily)",
      "Often (multiple times daily)",
      "Always",
    ],
    required: true,
    section: "Reliability & Bugs",
  },
  {
    id: "rel_updates_breakage",
    text: "When AI sites update their interfaces Promptability continues working:",
    type: "multiple_choice",
    options: [
      "Always adapts",
      "Usually works",
      "Sometimes breaks",
      "Often breaks",
      "Always breaks",
    ],
    required: true,
    section: "Reliability & Bugs",
  },
  {
    id: "rel_auth_stability",
    text: "Google authentication sessions remain stable:",
    type: "multiple_choice",
    options: [
      "Always logged in",
      "Occasionally need to re-login",
      "Regular re-login required",
      "Frequent auth issues",
    ],
    required: true,
    section: "Reliability & Bugs",
  },
  {
    id: "rel_unexpected_behavior",
    text: "Describe any situations where the extension stopped working or behaved unexpectedly.",
    type: "paragraph",
    required: false,
    section: "Reliability & Bugs",
  },
  {
    id: "rel_best_worst_sites",
    text: "Which AI sites work best/worst with Promptability?",
    type: "paragraph",
    required: false,
    section: "Reliability & Bugs",
  },
  {
    id: "rel_rare_issues",
    text: "Promptability rarely has technical issues or bugs.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Reliability & Bugs",
  },

  // Privacy & Trust
  {
    id: "privacy_comfort_processing",
    text: "How comfortable are you with Promptability processing your selected text?",
    type: "multiple_choice",
    options: [
      "Very comfortable",
      "Comfortable",
      "Neutral",
      "Uncomfortable",
      "Very uncomfortable",
    ],
    required: true,
    section: "Privacy & Trust",
  },
  {
    id: "privacy_transparency",
    text: "The extension's data handling transparency is:",
    type: "multiple_choice",
    options: ["Excellent", "Good", "Acceptable", "Poor", "Very poor"],
    required: true,
    section: "Privacy & Trust",
  },
  {
    id: "privacy_concerns",
    text: "What privacy concerns if any do you have about using Promptability?",
    type: "paragraph",
    required: false,
    section: "Privacy & Trust",
  },
  {
    id: "privacy_increase_trust",
    text: "What would increase your trust in how the extension handles your data?",
    type: "paragraph",
    required: false,
    section: "Privacy & Trust",
  },
  {
    id: "privacy_trust_convo_data",
    text: "I trust Promptability with my AI conversation data.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Privacy & Trust",
  },

  // Overall Experience
  {
    id: "overall_continue_use",
    text: "How likely are you to continue using Promptability after the beta?",
    type: "multiple_choice",
    options: [
      "Definitely will",
      "Probably will",
      "Might",
      "Probably won't",
      "Definitely won't",
    ],
    required: true,
    section: "Overall Experience",
  },
  {
    id: "overall_recommend",
    text: "Who would you most likely recommend Promptability to?",
    type: "multiple_choice",
    options: [
      "AI power users",
      "Content creators",
      "Researchers",
      "Business professionals",
      "Students",
      "No one",
    ],
    required: true,
    section: "Overall Experience",
  },
  {
    id: "overall_most_valuable",
    text: "What's the single most valuable feature of Promptability for your workflow?",
    type: "paragraph",
    required: false,
    section: "Overall Experience",
  },
  {
    id: "overall_improves_interactions",
    text: "Overall Promptability significantly improves my AI interactions.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    required: true,
    section: "Overall Experience",
  },
  {
    id: "overall_additional_feedback",
    text: "Any additional feedback suggestions or comments?",
    type: "paragraph",
    required: false,
    section: "Overall Experience",
  },
];

// -------------------------- UI Helpers -------------------------

const STORAGE_KEY = "promptability_beta_responses_v1";

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ---------------------------- App ------------------------------

export default function App({ submitUrl = "/api/beta/submit", apiKey }: { submitUrl?: string; apiKey?: string; }) {
  const [responses, setResponses] = useState<Record<string, string>>(Object.create(null));
  const [touched, setTouched] = useState<Record<string, boolean>>(Object.create(null));
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const startRef = useRef<number>(Date.now());
  const [utm, setUtm] = useState<{ tester?: string | null; cohort?: string | null; source?: string | null }>({});

  const sections = useMemo(() => {
    const map = new Map<string, Question[]>();
    for (const q of QUESTIONS) {
      if (!map.has(q.section)) map.set(q.section, []);
      map.get(q.section)!.push(q);
    }
    return Array.from(map.entries());
  }, []);

  // Autosave
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") setResponses(parsed);
      }
    } catch {}
  }, []);

  // Grab tester/cohort/source from URL params for attribution
  useEffect(() => {
    try {
      const p = new URLSearchParams(location.search);
      setUtm({ tester: p.get("tester"), cohort: p.get("cohort"), source: p.get("source") });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    } catch {}
  }, [responses]);

  const missingRequired = useMemo(() => {
    const missing: string[] = [];
    for (const q of QUESTIONS) {
      if (q.required && !responses[q.id]) missing.push(q.id);
    }
    return new Set(missing);
  }, [responses]);

  function handleChange(id: string, value: string) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleBlur(id: string) {
    setTouched((prev) => ({ ...prev, [id]: true }));
  }

  async function sendToBackend() {
    setSubmitStatus("sending");
    try {
      const payload = {
        email: email || null,
        consent,
        responses,
        meta: {
          collectedAt: new Date().toISOString(),
          durationMs: Date.now() - startRef.current,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          language: typeof navigator !== "undefined" ? navigator.language : "",
          tester: utm.tester || null,
          cohort: utm.cohort || null,
          source: utm.source || null,
        },
      };
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "X-Api-Key": apiKey } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitStatus("ok");
      alert("Thanks! Your responses were submitted.");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitted(true);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!consent) {
      const el = document.querySelector("#consent-box");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (missingRequired.size === 0) {
      void sendToBackend();
    } else {
      // scroll to first missing
      const first = Array.from(missingRequired)[0];
      const el = document.querySelector(`[data-qid="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleReset() {
    if (confirm("Clear all answers?")) {
      setResponses(Object.create(null));
      setTouched(Object.create(null));
      setSubmitted(false);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }


  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background Effects - matching other pages */}
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
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500" />
            <div>
              <h1 className="text-lg font-semibold leading-tight">Promptability — Beta Feedback</h1>
              <p className="text-xs text-gray-400">Fast pass: complete required items • autosaves locally</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="md:sticky md:top-16 md:self-start">
          <nav className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-3 shadow-sm">
            {/* Overall Progress */}
            <div className="mb-4 px-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Overall Progress</p>
                <OverallProgress />
              </div>
              <OverallProgressBar />
            </div>
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-gray-400">Sections</p>
            <ol className="space-y-1 text-sm">
              {sections.map(([section]) => (
                <li key={section}>
                  <a
                    href={`#${slugify(section)}`}
                    className="flex items-center justify-between rounded-xl px-2 py-2 text-gray-300 hover:bg-white/10"
                  >
                    <span>{section}</span>
                    {/* Completion dot */}
                    <SectionCompletionDot section={section} />
                  </a>
                </li>
              ))}
            </ol>
            
            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
              <button
                form="survey-form"
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitStatus === "sending" ? "Submitting…" : submitStatus === "ok" ? "Submitted" : "Submit"}
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/20 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </nav>
        </aside>

        {/* Form */}
        <section>
          <form id="survey-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Respondent */}
            <div className="scroll-mt-24">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold">Respondent</h2>
                <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">Optional email • Consent required</span>
              </div>
              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl">
                <div className="p-4 md:p-5">
                  <label className="block text-sm font-medium text-gray-300">Email (optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <p className="mt-2 text-xs text-gray-400">Used only to contact you about this beta (never shared).</p>
                </div>
                <div className="p-4 md:p-5">
                  <label id="consent-box" className="flex items-start gap-3 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4"
                      required
                    />
                    <span>I agree that my responses will be stored and analyzed to improve Promptability.</span>
                  </label>
                </div>
              </div>
            </div>
            {sections.map(([section, qs]) => (
              <div key={section} id={slugify(section)} className="scroll-mt-24">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-base font-semibold">{section}</h2>
                  <SectionBadge section={section} />
                </div>
                <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl">
                  {qs.map((q, idx) => (
                    <div key={q.id} data-qid={q.id} className="p-4 md:p-5">
                      <label className="block text-sm font-medium text-gray-300">
                        {q.text}
                        {q.required && <span className="ml-1 align-super text-xs text-rose-600">*</span>}
                      </label>

                      <div className="mt-3">
                        {q.type === "multiple_choice" && q.options && (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {q.options.map((opt) => (
                              <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-sm hover:bg-white/20">
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={opt}
                                  checked={responses[q.id] === opt}
                                  onChange={(e) => handleChange(q.id, e.target.value)}
                                  onBlur={() => handleBlur(q.id)}
                                  className="h-4 w-4"
                                  required={q.required}
                                />
                                <span className="text-sm text-white">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {q.type === "paragraph" && (
                          <textarea
                            name={q.id}
                            value={responses[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            onBlur={() => handleBlur(q.id)}
                            rows={4}
                            placeholder="Type your answer..."
                            className={classNames(
                              "w-full resize-y rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none bg-white/10 text-white placeholder-gray-400",
                              "border-white/20 focus:ring-2 focus:ring-blue-500/50",
                              submitted && q.required && !responses[q.id] && "border-rose-400 focus:ring-rose-500/20"
                            )}
                          />
                        )}

                        {q.type === "linear" && (
                          <div className="">
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>
                                {q.scaleMin} ({q.scaleLabel?.split(" to ")[0] || "Low"})
                              </span>
                              <span>
                                {q.scaleMax} ({q.scaleLabel?.split(" to ")[1] || "High"})
                              </span>
                            </div>
                            <div className="mt-2 grid grid-cols-7 gap-2">
                              {Array.from({ length: (q.scaleMax ?? 7) - (q.scaleMin ?? 1) + 1 }).map((_, i) => {
                                const value = String((q.scaleMin ?? 1) + i);
                                const selected = responses[q.id] === value;
                                return (
                                  <label
                                    key={value}
                                    className={classNames(
                                      "flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-sm shadow-sm",
                                      selected
                                        ? "border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                        : "border-white/20 bg-white/10 text-gray-300 hover:bg-white/20"
                                    )}
                                  >
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value={value}
                                      checked={selected}
                                      onChange={(e) => handleChange(q.id, e.target.value)}
                                      onBlur={() => handleBlur(q.id)}
                                      className="sr-only"
                                      required={q.required}
                                    />
                                    {value}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Validation hint */}
                        {submitted && q.required && !responses[q.id] && (
                          <p className="mt-2 text-xs text-rose-600">This question is required.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Buttons moved to sticky sidebar */}
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-4 text-xs text-gray-400">
        <p>
          Tip: you can embed this form in your extension's Options page or ship it as a hosted survey. Responses are exportable as JSON. For Google Forms/Typeform imports, I can auto-generate files from this schema on request.
        </p>
      </footer>
    </div>
  );

  function SectionCompletionDot({ section }: { section: string }) {
    const total = QUESTIONS.filter((q) => q.section === section && q.required).length;
    const done = QUESTIONS.filter((q) => q.section === section && q.required && !!responses[q.id]).length;
    const pct = total === 0 ? 100 : Math.round((done / total) * 100);

    return (
      <span
        title={`${done}/${total} required answered`}
        className={classNames(
          "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]",
          pct === 100 ? "bg-blue-100 text-blue-700" : "bg-white/10 text-gray-400"
        )}
      >
        {pct}%
      </span>
    );
  }

  function SectionBadge({ section }: { section: string }) {
    const total = QUESTIONS.filter((q) => q.section === section && q.required).length;
    const done = QUESTIONS.filter((q) => q.section === section && q.required && !!responses[q.id]).length;
    return (
      <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
        {done}/{total} required answered
      </span>
    );
  }

  function OverallProgress() {
    const totalRequired = QUESTIONS.filter((q) => q.required).length;
    const totalAnswered = QUESTIONS.filter((q) => q.required && !!responses[q.id]).length;
    const pct = totalRequired === 0 ? 100 : Math.round((totalAnswered / totalRequired) * 100);
    
    return (
      <span className="text-xs font-semibold text-blue-400">
        {totalAnswered}/{totalRequired} ({pct}%)
      </span>
    );
  }

  function OverallProgressBar() {
    const totalRequired = QUESTIONS.filter((q) => q.required).length;
    const totalAnswered = QUESTIONS.filter((q) => q.required && !!responses[q.id]).length;
    const pct = totalRequired === 0 ? 100 : (totalAnswered / totalRequired) * 100;
    
    return (
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }
}