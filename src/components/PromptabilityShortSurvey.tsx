'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Promptability Short Survey - Essential Questions Only
 * Quick 2-3 minute survey for users who don't want the full experience
 */

type QType = "multiple_choice" | "paragraph" | "linear";

type Question = {
  id: string;
  text: string;
  textHe?: string;
  type: QType;
  options?: string[];
  optionsHe?: string[];
  required: boolean;
  section: string;
  sectionHe?: string;
  scaleMin?: number;
  scaleMax?: number;
  scaleLabel?: string;
  scaleLabelHe?: string;
};

// Essential questions only - focusing on core experience
const SHORT_QUESTIONS: Question[] = [
  // Quick Setup Experience (2 questions)
  {
    id: "quick_setup_easy",
    text: "How easy was it to get started with Promptability?",
    textHe: "עד כמה היה קל להתחיל עם Promptability?",
    type: "multiple_choice",
    options: [
      "Very easy",
      "Easy", 
      "Somewhat difficult",
      "Very difficult"
    ],
    optionsHe: [
      "קל מאוד",
      "קל",
      "קצת קשה", 
      "קשה מאוד"
    ],
    required: true,
    section: "Quick Start",
    sectionHe: "התחלה מהירה",
  },
  {
    id: "quick_primary_platform",
    text: "Which AI platform do you mainly use with Promptability?",
    textHe: "באיזה פלטפורמת AI אתה בעיקר משתמש עם Promptability?",
    type: "multiple_choice",
    options: [
      "ChatGPT",
      "Claude", 
      "Gemini",
      "Perplexity",
      "Other/Multiple"
    ],
    optionsHe: [
      "ChatGPT",
      "Claude",
      "Gemini", 
      "Perplexity",
      "אחר/כמה פלטפורמות"
    ],
    required: true,
    section: "Quick Start",
    sectionHe: "התחלה מהירה",
  },

  // Core Value (3 questions)
  {
    id: "quick_usefulness",
    text: "How often does Promptability produce useful results?",
    textHe: "כמה פעמים Promptability מפיק תוצאות מועילות?",
    type: "multiple_choice",
    options: [
      "Always/Usually (80%+)",
      "Sometimes (50-80%)",
      "Rarely (20-50%)",
      "Almost never (<20%)"
    ],
    optionsHe: [
      "תמיד/בדרך כלל (80%+)",
      "לפעמים (50-80%)",
      "לעתים רחוקות (20-50%)",
      "כמעט אף פעם (<20%)"
    ],
    required: true,
    section: "Core Value",
    sectionHe: "ערך מרכזי",
  },
  {
    id: "quick_improvement",
    text: "Do enhanced prompts give you better AI responses?",
    textHe: "האם פרומפטים משופרים נותנים לך תגובות AI טובות יותר?",
    type: "multiple_choice",
    options: [
      "Much better",
      "Somewhat better",
      "About the same",
      "Worse"
    ],
    optionsHe: [
      "הרבה יותר טוב",
      "קצת יותר טוב",
      "בערך אותו דבר",
      "יותר גרוע"
    ],
    required: true,
    section: "Core Value",
    sectionHe: "ערך מרכזי",
  },
  {
    id: "quick_satisfaction",
    text: "Overall satisfaction with Promptability:",
    textHe: "שביעות רצון כללית מ-Promptability:",
    type: "linear",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabel: "Very Unsatisfied to Very Satisfied",
    scaleLabelHe: "לא מרוצה בכלל עד מרוצה מאוד",
    required: true,
    section: "Core Value",
    sectionHe: "ערך מרכזי",
  },

  // Future Use (2 questions)
  {
    id: "quick_continue_use",
    text: "Will you continue using Promptability after beta?",
    textHe: "האם תמשיך להשתמש ב-Promptability אחרי הבטא?",
    type: "multiple_choice",
    options: [
      "Definitely yes",
      "Probably yes",
      "Maybe",
      "Probably no",
      "Definitely no"
    ],
    optionsHe: [
      "בהחלט כן",
      "כנראה כן",
      "אולי",
      "כנראה לא",
      "בהחלט לא"
    ],
    required: true,
    section: "Future Use",
    sectionHe: "שימוש עתידי",
  },
  {
    id: "quick_recommendation",
    text: "How likely are you to recommend Promptability?",
    textHe: "עד כמה סביר שתמליץ על Promptability?",
    type: "linear",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabel: "Very Unlikely to Very Likely",
    scaleLabelHe: "לא סביר בכלל עד סביר מאוד",
    required: true,
    section: "Future Use",
    sectionHe: "שימוש עתידי",
  },

  // Quick Feedback (1 question)
  {
    id: "quick_main_issue",
    text: "What's the main thing that could be improved? (Optional)",
    textHe: "מה הדבר העיקרי שניתן לשפר? (אופציונלי)",
    type: "paragraph",
    required: false,
    section: "Quick Feedback",
    sectionHe: "משוב מהיר",
  },
];

const STORAGE_KEY = "promptability_short_survey_v1";

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function PromptabilityShortSurvey({ 
  submitUrl = "/api/beta/submit", 
  apiKey 
}: { 
  submitUrl?: string; 
  apiKey?: string; 
}) {
  const [responses, setResponses] = useState<Record<string, string>>(Object.create(null));
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [isHebrew, setIsHebrew] = useState(false);
  const startRef = useRef<number>(Date.now());
  const [utm, setUtm] = useState<{ tester?: string | null; cohort?: string | null; source?: string | null }>({});

  const sections = useMemo(() => {
    const map = new Map<string, Question[]>();
    for (const q of SHORT_QUESTIONS) {
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
    for (const q of SHORT_QUESTIONS) {
      if (q.required && !responses[q.id]) missing.push(q.id);
    }
    return new Set(missing);
  }, [responses]);

  function handleChange(id: string, value: string) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  async function sendToBackend() {
    setSubmitStatus("sending");
    try {
      const payload = {
        email: email || null,
        consent,
        responses,
        surveyType: "short", // Mark as short survey
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
      const first = Array.from(missingRequired)[0];
      const el = document.querySelector(`[data-qid="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleReset() {
    if (confirm("Clear all answers?")) {
      setResponses(Object.create(null));
      setSubmitted(false);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Language Toggle */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsHebrew(!isHebrew)}
              className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
            >
              <span>{isHebrew ? '🇺🇸' : '🇮🇱'}</span>
              <span>{isHebrew ? 'English' : 'עברית'}</span>
            </button>
          </div>
          
          <div className="text-center">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isHebrew ? 'font-sans' : ''}`}>
              {isHebrew ? 'סקר' : 'Quick'}
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {isHebrew ? 'מהיר' : 'Survey'}
              </span>
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 ${isHebrew ? 'font-sans text-right' : ''}`}>
              {isHebrew ? 'רק 8 שאלות - 2-3 דקות' : 'Just 8 questions - 2-3 minutes'}
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className={`inline-flex items-center gap-2 text-sm text-blue-400 ${isHebrew ? 'font-sans' : ''}`}>
                <span>⚡</span>
                <span>{isHebrew ? 'מהיר וקל' : 'Quick & Easy'}</span>
              </div>
              <a 
                href="/beta" 
                className={`text-sm text-gray-400 hover:text-gray-300 transition-colors ${isHebrew ? 'font-sans' : ''}`}
              >
                {isHebrew ? 'רוצה סקר מפורט יותר? (47 שאלות)' : 'Want the detailed survey instead? (47 questions)'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email & Consent */}
          <div className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-300 mb-2 ${isHebrew ? 'font-sans text-right' : ''}`}>
                  {isHebrew ? 'אימייל (אופציונלי)' : 'Email (optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isHebrew ? "הכנס אימייל" : "your@email.com"}
                  dir={isHebrew ? "rtl" : "ltr"}
                  className={`w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isHebrew ? 'font-sans text-right' : ''}`}
                />
              </div>
              <label id="consent-box" className={`flex items-start gap-3 text-sm text-gray-300 ${isHebrew ? 'flex-row-reverse font-sans text-right' : ''}`}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4"
                  required
                />
                <span>
                  {isHebrew ? 'אני מסכים שהתשובות שלי יאוחסנו ויותחו לשיפור Promptability.' : 'I agree my responses will be stored and analyzed to improve Promptability.'}
                </span>
              </label>
            </div>
          </div>

          {/* Questions */}
          {sections.map(([section, qs]) => (
            <div key={section} className="space-y-4">
              <h2 className={`text-lg font-semibold text-blue-400 ${isHebrew ? 'font-sans text-right' : ''}`}>
                {isHebrew && qs[0]?.sectionHe ? qs[0].sectionHe : section}
              </h2>
              
              {qs.map((q) => (
                <div key={q.id} data-qid={q.id} className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-5">
                  <label className={`block text-sm font-medium text-gray-300 mb-3 ${isHebrew ? 'font-sans text-right' : ''}`}>
                    {isHebrew && q.textHe ? q.textHe : q.text}
                    {q.required && <span className="ml-1 align-super text-xs text-rose-600">*</span>}
                  </label>

                  {q.type === "multiple_choice" && q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const displayText = isHebrew && q.optionsHe && q.optionsHe[optIndex] ? q.optionsHe[optIndex] : opt;
                        return (
                          <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-sm hover:bg-white/20 ${isHebrew ? 'flex-row-reverse' : ''}`}>
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={responses[q.id] === opt}
                              onChange={(e) => handleChange(q.id, e.target.value)}
                              className="h-4 w-4"
                              required={q.required}
                            />
                            <span className={`text-sm text-white ${isHebrew ? 'font-sans text-right' : ''}`}>{displayText}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {q.type === "paragraph" && (
                    <textarea
                      name={q.id}
                      value={responses[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      rows={3}
                      placeholder={isHebrew ? "הקלד את התשובה שלך..." : "Type your answer..."}
                      dir={isHebrew ? "rtl" : "ltr"}
                      className={classNames(
                        "w-full resize-y rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none bg-white/10 text-white placeholder-gray-400",
                        "border-white/20 focus:ring-2 focus:ring-blue-500/50",
                        isHebrew ? "font-sans text-right" : ""
                      )}
                    />
                  )}

                  {q.type === "linear" && (
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span className={isHebrew ? 'font-sans' : ''}>
                          {q.scaleMin} ({isHebrew && q.scaleLabelHe ? q.scaleLabelHe.split(" עד ")[0] : (q.scaleLabel?.split(" to ")[0] || "Low")})
                        </span>
                        <span className={isHebrew ? 'font-sans' : ''}>
                          {q.scaleMax} ({isHebrew && q.scaleLabelHe ? q.scaleLabelHe.split(" עד ")[1] : (q.scaleLabel?.split(" to ")[1] || "High")})
                        </span>
                      </div>
                      <div className={`grid gap-2 ${q.scaleMax === 10 ? 'grid-cols-10' : 'grid-cols-5'}`}>
                        {Array.from({ length: (q.scaleMax ?? 5) - (q.scaleMin ?? 1) + 1 }).map((_, i) => {
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

                  {submitted && q.required && !responses[q.id] && (
                    <p className="mt-2 text-xs text-rose-600">
                      {isHebrew ? 'שאלה זו נדרשת.' : 'This question is required.'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-center pt-6">
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className={`rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${isHebrew ? 'font-sans' : ''}`}
            >
              {submitStatus === "sending" ? 
                (isHebrew ? "שולח..." : "Submitting…") : 
                submitStatus === "ok" ? 
                  (isHebrew ? "נשלח" : "Submitted") : 
                  (isHebrew ? "שלח" : "Submit")
              }
            </button>
            <button
              onClick={handleReset}
              type="button"
              className={`rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-medium text-white shadow-sm hover:bg-white/20 transition-all duration-300 ${isHebrew ? 'font-sans' : ''}`}
            >
              {isHebrew ? 'איפוס' : 'Reset'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}