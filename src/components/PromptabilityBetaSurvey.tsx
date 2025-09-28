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
  textHe?: string; // Hebrew translation
  type: QType;
  options?: string[]; // for multiple choice
  optionsHe?: string[]; // Hebrew options
  required: boolean;
  section: string;
  sectionHe?: string; // Hebrew section name
  // for linear scale
  scaleMin?: number;
  scaleMax?: number;
  scaleLabel?: string; // e.g., "Strongly Disagree to Strongly Agree"
  scaleLabelHe?: string; // Hebrew scale label
};

// ------------------------- Data Source -------------------------
// Converted from the CSV you provided (1:1 mapping).
// Tip: If you edit text here, keep IDs stable for autosave to keep working.

const QUESTIONS: Question[] = [
  // Onboarding & First-Run
  {
    id: "onb_time_understand",
    text: "After installing how long did it take you to understand what Promptability does?",
    textHe: "כמה זמן לקח לך להבין מה Promptability עושה לאחר ההתקנה?",
    type: "multiple_choice",
    options: [
      "Under 30 seconds",
      "30 seconds - 1 minute",
      "1-2 minutes",
      "2-5 minutes",
      "Over 5 minutes",
    ],
    optionsHe: [
      "פחות מ-30 שניות",
      "30 שניות - דקה",
      "1-2 דקות",
      "2-5 דקות",
      "יותר מ-5 דקות",
    ],
    required: true,
    section: "Onboarding & First-Run",
    sectionHe: "הטמעה והשימוש הראשון",
  },
  {
    id: "onb_google_signin",
    text: "The Google sign-in process felt:",
    textHe: "תהליך ההתחברות עם Google הרגיש:",
    type: "multiple_choice",
    options: [
      "Very smooth",
      "Smooth",
      "Acceptable",
      "Problematic",
      "Very problematic",
    ],
    optionsHe: [
      "חלק מאוד",
      "חלק",
      "מקובל",
      "בעייתי",
      "בעייתי מאוד",
    ],
    required: true,
    section: "Onboarding & First-Run",
    sectionHe: "הטמעה והשימוש הראשון",
  },
  {
    id: "onb_onboarding_intuitive",
    text: "The onboarding process was intuitive and easy to follow.",
    textHe: "תהליך ההטמעה היה אינטואיטיבי וקל לביצוע.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Onboarding & First-Run",
    sectionHe: "הטמעה והשימוש הראשון",
  },
  {
    id: "onb_confident_after_first_run",
    text: "I felt confident using Promptability after the first-run experience.",
    textHe: "הרגשתי בטוח בשימוש ב-Promptability לאחר חוויית השימוש הראשונה.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Onboarding & First-Run",
    sectionHe: "הטמעה והשימוש הראשון",
  },

  // Core Workflow & Features
  {
    id: "core_widget_appears",
    text: "When you select text on an AI site the floating widget appears:",
    textHe: "כאשר אתה בוחר טקסט באתר AI הוידג'ט הצף מופיע:",
    type: "multiple_choice",
    options: [
      "Always immediately",
      "Usually within 1 second",
      "Sometimes delayed",
      "Often doesn't appear",
      "Never appears",
    ],
    optionsHe: [
      "תמיד מיד",
      "בדרך כלל תוך שנייה",
      "לפעמים עם עיכוב",
      "לעתים קרובות לא מופיע",
      "אף פעם לא מופיע",
    ],
    required: true,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
  },
  {
    id: "core_send_to_ai_success",
    text: "The Send to AI button successfully places the prompt in the correct input field:",
    textHe: "כפתור השליחה ל-AI מציב בהצלחה את הפרומפט בשדה הקלט הנכון:",
    type: "multiple_choice",
    options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    optionsHe: ["תמיד", "בדרך כלל", "לפעמים", "לעתים רחוקות", "אף פעם"],
    required: true,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
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
    textHe: "כיצד אתה בדרך כלל משתמש בתכונות ניהול הסשן וההיסטוריה?",
    type: "paragraph",
    required: false,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
  },
  {
    id: "core_workflow_improvements",
    text: "What specific improvements would make your workflow with Promptability better?",
    textHe: "אילו שיפורים ספציפיים ישפרו את זרימת העבודה שלך עם Promptability?",
    type: "paragraph",
    required: false,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
  },
  {
    id: "core_widget_expectations",
    text: "The floating widget appears exactly when I expect it to.",
    textHe: "הוידג'ט הצף מופיע בדיוק כשאני מצפה לו.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
  },
  {
    id: "core_platform_specific_helpful",
    text: "Platform-specific optimizations are noticeable and helpful.",
    textHe: "אופטימיזציות ספציפיות לפלטפורמה ניכרות ומועילות.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Core Workflow & Features",
    sectionHe: "זרימת עבודה ותכונות עיקריות",
  },

  // User Interface & Design
  {
    id: "ui_overall_ease",
    text: "How easy is Promptability to use overall?",
    textHe: "עד כמה קל להשתמש ב-Promptability באופן כללי?",
    type: "multiple_choice",
    options: [
      "Very easy",
      "Easy",
      "Somewhat easy",
      "Difficult",
      "Very difficult",
    ],
    optionsHe: [
      "קל מאוד",
      "קל",
      "קל יחסית",
      "קשה",
      "קשה מאוד",
    ],
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_size_position",
    text: "The floating widget's size and position on the screen is:",
    textHe: "גודל ומיקום הוידג'ט הצף על המסך:",
    type: "multiple_choice",
    options: [
      "Perfect",
      "Good",
      "Acceptable",
      "Too small/large",
      "Poorly positioned",
    ],
    optionsHe: [
      "מושלם",
      "טוב",
      "מקובל",
      "קטן/גדול מדי",
      "ממוקם רע",
    ],
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_restore_minimized",
    text: "When the widget is minimized can you easily find and restore it?",
    textHe: "כשהוידג'ט ממוקטן האם ניתן למצוא אותו בקלות ולשחזר אותו?",
    type: "multiple_choice",
    options: [
      "Always easy",
      "Usually easy",
      "Sometimes difficult",
      "Often difficult",
      "Always difficult",
    ],
    optionsHe: [
      "תמיד קל",
      "בדרך כלל קל",
      "לפעמים קשה",
      "לעתים קרובות קשה",
      "תמיד קשה",
    ],
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_drag_drop",
    text: "The drag-and-drop functionality for repositioning the widget works:",
    textHe: "תכונת הגרירה והשלכה למיקום מחדש של הוידג'ט עובדת:",
    type: "multiple_choice",
    options: ["Perfectly", "Well", "Acceptably", "Poorly", "Not at all"],
    optionsHe: ["מושלם", "טוב", "באופן מקובל", "רע", "כלל לא"],
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_unclear_elements",
    text: "What UI elements in the floating widget are unclear or confusing?",
    textHe: "אילו רכיבי ממשק בוידג'ט הצף לא ברורים או מבלבלים?",
    type: "paragraph",
    required: false,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_layout_improvements",
    text: "Suggest improvements for the prompt generation interface layout.",
    textHe: "הצע שיפורים לפריסת ממשק יצירת הפרומפט.",
    type: "paragraph",
    required: false,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_labels_icons_clarity",
    text: "Button labels and icons clearly indicate their functions.",
    textHe: "תוויות הכפתורים והאיקונים מציינים בבירור את התפקידים שלהם.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_theme_adaptation",
    text: "The dark/light theme adapts well to different websites.",
    textHe: "הערכה הכהה/בהירה מסתגלת טוב לאתרים שונים.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_error_messages",
    text: "Error messages are helpful and actionable.",
    textHe: "הודעות שגיאה מועילות וניתנות לביצוע.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_intuitiveness",
    text: "How intuitive did you find the interface on first use?",
    textHe: "עד כמה אינטואיטיבי מצאת את הממשק בשימוש הראשון?",
    type: "multiple_choice",
    options: [
      "Extremely intuitive",
      "Very intuitive", 
      "Somewhat intuitive",
      "Not very intuitive",
      "Confusing",
    ],
    optionsHe: [
      "אינטואיטיבי במידה קיצונית",
      "אינטואיטיבי מאוד",
      "אינטואיטיבי במידת מה",
      "לא אינטואיטיבי במיוחד",
      "מבלבל",
    ],
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },
  {
    id: "ui_satisfaction",
    text: "Overall, how satisfied are you with the user experience?",
    textHe: "בסך הכול, עד כמה אתה מרוצה מחוויית המשתמש?",
    type: "linear",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabel: "Very Dissatisfied to Very Satisfied",
    scaleLabelHe: "לא מרוצה בכלל עד מרוצה מאוד",
    required: true,
    section: "User Interface & Design",
    sectionHe: "ממשק משתמש ועיצוב",
  },

  // Performance & Speed
  {
    id: "perf_loading_slowdown",
    text: "How often do you notice AI sites loading slower when Promptability is active?",
    textHe: "כמה פעמים אתה שם לב שאתרי AI נטענים לאט יותר כש-Promptability פעיל?",
    type: "multiple_choice",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    optionsHe: ["אף פעם", "לעתים רחוקות", "לפעמים", "לעתים קרובות", "תמיד"],
    required: true,
    section: "Performance & Speed",
    sectionHe: "ביצועים ומהירות",
  },
  {
    id: "perf_generation_speed",
    text: "Prompt generation speed feels:",
    textHe: "מהירות יצירת הפרומפט מרגישה:",
    type: "multiple_choice",
    options: [
      "Very fast (<2 seconds)",
      "Fast (2-4 seconds)",
      "Acceptable (4-7 seconds)",
      "Slow (7-15 seconds)",
      "+Very slow (>15 seconds)",
    ].map((o) => o.replace("+", "")),
    optionsHe: [
      "מהיר מאוד (פחות מ-2 שניות)",
      "מהיר (2-4 שניות)",
      "מקובל (4-7 שניות)",
      "איטי (7-15 שניות)",
      "איטי מאוד (יותר מ-15 שניות)",
    ],
    required: true,
    section: "Performance & Speed",
    sectionHe: "ביצועים ומהירות",
  },
  {
    id: "perf_slowdowns_crashes",
    text: "Describe any situations where Promptability caused browser slowdowns or crashes.",
    textHe: "תאר מצבים שבהם Promptability גרם להאטות או קריסות של הדפדפן.",
    type: "paragraph",
    required: false,
    section: "Performance & Speed",
    sectionHe: "ביצועים ומהירות",
  },
  {
    id: "perf_responsive_heavy_use",
    text: "The extension feels responsive during heavy AI usage sessions.",
    textHe: "התוסף מרגיש רספונסיבי במהלך סשנים כבדים של שימוש ב-AI.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Performance & Speed",
    sectionHe: "ביצועים ומהירות",
  },

  // Reliability & Bugs
  {
    id: "rel_trigger_failure_rate",
    text: "How often does text selection fail to trigger the floating widget when expected?",
    textHe: "כמה פעמים בחירת טקסט נכשלת להפעיל את הוידג'ט הצף כצפוי?",
    type: "multiple_choice",
    options: [
      "Never",
      "Rarely (once a week)",
      "Sometimes (daily)",
      "Often (multiple times daily)",
      "Always",
    ],
    optionsHe: [
      "אף פעם",
      "לעתים רחוקות (פעם בשבוע)",
      "לפעמים (יומי)",
      "לעתים קרובות (כמה פעמים ביום)",
      "תמיד",
    ],
    required: true,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },
  {
    id: "rel_updates_breakage",
    text: "When AI sites update their interfaces Promptability continues working:",
    textHe: "כשאתרי AI מעדכנים את הממשקים שלהם Promptability ממשיך לעבוד:",
    type: "multiple_choice",
    options: [
      "Always adapts",
      "Usually works",
      "Sometimes breaks",
      "Often breaks",
      "Always breaks",
    ],
    optionsHe: [
      "תמיד מסתגל",
      "בדרך כלל עובד",
      "לפעמים נשבר",
      "לעתים קרובות נשבר",
      "תמיד נשבר",
    ],
    required: true,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },
  {
    id: "rel_auth_stability",
    text: "Google authentication sessions remain stable:",
    textHe: "סשנים של אימות Google נשארים יציבים:",
    type: "multiple_choice",
    options: [
      "Always logged in",
      "Occasionally need to re-login",
      "Regular re-login required",
      "Frequent auth issues",
    ],
    optionsHe: [
      "תמיד מחובר",
      "מדי פעם צריך להתחבר מחדש",
      "דרוש התחברות מחדש קבועה",
      "בעיות אימות תכופות",
    ],
    required: true,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },
  {
    id: "rel_unexpected_behavior",
    text: "Describe any situations where the extension stopped working or behaved unexpectedly.",
    textHe: "תאר מצבים שבהם התוסף הפסיק לעבוד או התנהג באופן לא צפוי.",
    type: "paragraph",
    required: false,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },
  {
    id: "rel_best_worst_sites",
    text: "Which AI sites work best/worst with Promptability?",
    textHe: "אילו אתרי AI עובדים הכי טוב/רע עם Promptability?",
    type: "paragraph",
    required: false,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },
  {
    id: "rel_rare_issues",
    text: "Promptability rarely has technical issues or bugs.",
    textHe: "ל-Promptability לעתים רחוקות יש בעיות טכניות או באגים.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Reliability & Bugs",
    sectionHe: "אמינות ובאגים",
  },


  // Result Quality & Effectiveness
  {
    id: "quality_prompt_improvement",
    text: "How much do the enhanced prompts improve your AI responses?",
    textHe: "כמה הפרומפטים המשופרים משפרים את תגובות ה-AI שלך?",
    type: "multiple_choice",
    options: [
      "Dramatically better",
      "Significantly better",
      "Somewhat better",
      "Slightly better",
      "No improvement",
    ],
    optionsHe: [
      "טוב בצורה דרמטית",
      "טוב משמעותית",
      "טוב במידת מה",
      "טוב מעט",
      "בלי שיפור",
    ],
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "quality_accuracy_rate",
    text: "How often do the enhanced prompts give you the results you wanted?",
    textHe: "כמה פעמים הפרומפטים המשופרים נותנים לך את התוצאות שרצית?",
    type: "multiple_choice",
    options: [
      "Almost always (90-100%)",
      "Usually (70-89%)",
      "Sometimes (50-69%)",
      "Rarely (30-49%)",
      "Almost never (0-29%)",
    ],
    optionsHe: [
      "כמעט תמיד (90-100%)",
      "בדרך כלל (70-89%)",
      "לפעמים (50-69%)",
      "לעתים רחוקות (30-49%)",
      "כמעט אף פעם (0-29%)",
    ],
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "quality_vs_manual",
    text: "Compared to writing prompts manually, Promptability's results are:",
    textHe: "בהשוואה לכתיבת פרומפטים ידנית, התוצאות של Promptability הן:",
    type: "multiple_choice",
    options: [
      "Much better",
      "Better",
      "About the same",
      "Worse",
      "Much worse",
    ],
    optionsHe: [
      "הרבה יותר טובות",
      "יותר טובות",
      "בערך אותו דבר",
      "גרועות יותר",
      "הרבה יותר גרועות",
    ],
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "core_prompt_better",
    text: "Generated prompts are significantly better than my original text.",
    textHe: "הפרומפטים המולדים טובים משמעותית מהטקסט המקורי שלי.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "core_usefulness_rate",
    text: "How often does the Generate Enhanced Prompt feature produce useful results?",
    textHe: "כמה פעמים תכונת יצירת פרומפט משופר מפיקה תוצאות מועילות?",
    type: "multiple_choice",
    options: [
      "Always (90-100%)",
      "Usually (70-89%)",
      "Sometimes (50-69%)",
      "Rarely (30-49%)",
      "Never (0-29%)",
    ],
    optionsHe: [
      "תמיד (90-100%)",
      "בדרך כלל (70-89%)",
      "לפעמים (50-69%)",
      "לעתים רחוקות (30-49%)",
      "אף פעם (0-29%)",
    ],
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "quality_time_saved",
    text: "How much time does Promptability save you per session?",
    textHe: "כמה זמן Promptability חוסך לך בכל סשן?",
    type: "multiple_choice",
    options: [
      "More than 30 minutes",
      "15-30 minutes",
      "5-15 minutes",
      "1-5 minutes",
      "No time saved",
    ],
    optionsHe: [
      "יותר מ-30 דקות",
      "15-30 דקות",
      "5-15 דקות",
      "1-5 דקות",
      "לא חוסך זמן",
    ],
    required: true,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },
  {
    id: "quality_examples",
    text: "Share specific examples where Promptability gave you much better results than expected.",
    textHe: "שתף דוגמאות ספציפיות שבהן Promptability נתן לך תוצאות טובות הרבה יותר ממה שציפית.",
    type: "paragraph",
    required: false,
    section: "Result Quality & Effectiveness",
    sectionHe: "איכות התוצאות ויעילות",
  },

  // Platform Usage
  {
    id: "platforms_primary",
    text: "Which AI platform do you use most often with Promptability?",
    textHe: "באיזה פלטפורמת AI אתה משתמש הכי הרבה עם Promptability?",
    type: "multiple_choice",
    options: [
      "ChatGPT (OpenAI)",
      "Claude (Anthropic)",
      "Gemini (Google)",
      "Perplexity",
      "Other",
    ],
    optionsHe: [
      "ChatGPT (OpenAI)",
      "Claude (Anthropic)",
      "Gemini (Google)",
      "Perplexity",
      "אחר",
    ],
    required: true,
    section: "Platform Usage",
    sectionHe: "שימוש בפלטפורמות",
  },
  {
    id: "platforms_frequency",
    text: "How often do you use Promptability across different AI platforms?",
    textHe: "כמה פעמים אתה משתמש ב-Promptability על פני פלטפורמות AI שונות?",
    type: "multiple_choice",
    options: [
      "Multiple platforms daily",
      "Multiple platforms weekly",
      "Stick to one platform mostly",
      "Try different platforms occasionally",
      "Only use one platform",
    ],
    optionsHe: [
      "מספר פלטפורמות יומית",
      "מספר פלטפורמות שבועית",
      "נדבק לפלטפורמה אחת בעיקר",
      "מנסה פלטפורמות שונות מדי פעם",
      "משתמש רק בפלטפורמה אחת",
    ],
    required: true,
    section: "Platform Usage",
    sectionHe: "שימוש בפלטפורמות",
  },
  {
    id: "platforms_differences",
    text: "Do you notice different quality improvements across different AI platforms?",
    textHe: "האם אתה שם לב לשיפורים שונים באיכות על פני פלטפורמות AI שונות?",
    type: "multiple_choice",
    options: [
      "Much better on some platforms",
      "Slightly better on some platforms",
      "About the same across all platforms",
      "Not sure/don't use multiple platforms",
    ],
    optionsHe: [
      "הרבה יותר טוב בחלק מהפלטפורמות",
      "מעט יותר טוב בחלק מהפלטפורמות",
      "בערך אותו דבר על פני כל הפלטפורמות",
      "לא בטוח/לא משתמש במספר פלטפורמות",
    ],
    required: true,
    section: "Platform Usage",
    sectionHe: "שימוש בפלטפורמות",
  },
  {
    id: "platforms_which_best",
    text: "Which platform works best with Promptability's enhancements?",
    textHe: "איזו פלטפורמה עובדת הכי טוב עם השיפורים של Promptability?",
    type: "paragraph",
    required: false,
    section: "Platform Usage",
    sectionHe: "שימוש בפלטפורמות",
  },

  // Overall Experience
  {
    id: "overall_continue_use",
    text: "How likely are you to continue using Promptability after the beta?",
    textHe: "כמה סביר שתמשיך להשתמש ב-Promptability אחרי הבטא?",
    type: "multiple_choice",
    options: [
      "Definitely will",
      "Probably will",
      "Might",
      "Probably won't",
      "Definitely won't",
    ],
    optionsHe: [
      "בהחלט אמשיך",
      "כנראה אמשיך",
      "אולי",
      "כנראה לא",
      "בהחלט לא",
    ],
    required: true,
    section: "Overall Experience",
    sectionHe: "חוויה כללית",
  },
  {
    id: "overall_recommend",
    text: "Who would you most likely recommend Promptability to?",
    textHe: "למי הכי סביר שתמליץ על Promptability?",
    type: "multiple_choice",
    options: [
      "AI power users",
      "Content creators",
      "Researchers",
      "Business professionals",
      "Students",
      "No one",
    ],
    optionsHe: [
      "משתמשי כוח של AI",
      "יוצרי תוכן",
      "חוקרים",
      "אנשי עסקים",
      "סטודנטים",
      "לאף אחד",
    ],
    required: true,
    section: "Overall Experience",
    sectionHe: "חוויה כללית",
  },
  {
    id: "overall_most_valuable",
    text: "What's the single most valuable feature of Promptability for your workflow?",
    textHe: "מהי התכונה היחידה הכי חשובה של Promptability עבור זרימת העבודה שלך?",
    type: "paragraph",
    required: false,
    section: "Overall Experience",
    sectionHe: "חוויה כללית",
  },
  {
    id: "overall_improves_interactions",
    text: "Overall Promptability significantly improves my AI interactions.",
    textHe: "בסך הכול Promptability משפר משמעותית את האינטראקציות שלי עם AI.",
    type: "linear",
    scaleMin: 1,
    scaleMax: 7,
    scaleLabel: "Strongly Disagree to Strongly Agree",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    required: true,
    section: "Overall Experience",
    sectionHe: "חוויה כללית",
  },
  {
    id: "overall_additional_feedback",
    text: "Any additional feedback suggestions or comments?",
    textHe: "יש לך משוב נוסף, הצעות או הערות?",
    type: "paragraph",
    required: false,
    section: "Overall Experience",
    sectionHe: "חוויה כללית",
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
  const [isHebrew, setIsHebrew] = useState(false);

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
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
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
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${isHebrew ? 'font-sans' : ''}`}>
              {isHebrew ? 'בטא' : 'Beta'}
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {isHebrew ? 'משוב' : 'Feedback'}
              </span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 ${isHebrew ? 'font-sans text-right' : ''}`}>
              {isHebrew ? 'עזרו לנו לשפר את Promptability על ידי שיתוף החוויה שלכם' : 'Help us improve Promptability by sharing your experience'}
            </p>
            <div className="flex flex-col items-center gap-3 mb-12">
              <div className={`inline-flex items-center gap-2 text-sm text-purple-400 ${isHebrew ? 'font-sans' : ''}`}>
                <span>📋</span>
                <span>{isHebrew ? 'סקר מפורט - 47 שאלות' : 'Detailed Survey - 47 questions'}</span>
              </div>
              <a 
                href="/beta-quick" 
                className={`text-sm text-gray-400 hover:text-gray-300 transition-colors ${isHebrew ? 'font-sans' : ''}`}
              >
                {isHebrew ? 'רוצה סקר קצר יותר? (8 שאלות)' : 'Want a shorter survey instead? (8 questions)'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="order-2 md:order-1">
            <div className="sticky top-6 z-20">
              <nav className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-3 shadow-sm">
            {/* Overall Progress */}
            <div className="mb-4 px-2">
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-medium uppercase tracking-wide text-gray-400 ${isHebrew ? 'font-sans' : ''}`}>
                  {isHebrew ? 'התקדמות כללית' : 'Overall Progress'}
                </p>
                <OverallProgress />
              </div>
              <OverallProgressBar />
            </div>
            <p className={`mb-2 px-2 text-xs font-medium uppercase tracking-wide text-gray-400 ${isHebrew ? 'font-sans text-right' : ''}`}>
              {isHebrew ? 'מקטעים' : 'Sections'}
            </p>
            <ol className="space-y-1 text-sm">
              {sections.map(([section]) => {
                const firstQ = QUESTIONS.find(q => q.section === section);
                const sectionName = isHebrew && firstQ?.sectionHe ? firstQ.sectionHe : section;
                return (
                  <li key={section}>
                    <a
                      href={`#${slugify(section)}`}
                      className={`flex items-center justify-between rounded-xl px-2 py-2 text-gray-300 hover:bg-white/10 ${isHebrew ? 'flex-row-reverse font-sans' : ''}`}
                    >
                      <span className={isHebrew ? 'text-right' : ''}>{sectionName}</span>
                      {/* Completion dot */}
                      <SectionCompletionDot section={section} />
                    </a>
                  </li>
                );
              })}
            </ol>
            
            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
              <button
                form="survey-form"
                type="submit"
                disabled={submitStatus === "sending"}
                className={`w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${isHebrew ? 'font-sans' : ''}`}
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
                className={`w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/20 transition-all duration-300 ${isHebrew ? 'font-sans' : ''}`}
              >
                {isHebrew ? 'איפוס' : 'Reset'}
              </button>
            </div>
              </nav>
            </div>
          </aside>

          {/* Form */}
          <section className="order-1 md:order-2">
          <form id="survey-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Respondent */}
            <div className="scroll-mt-24">
              <div className="mb-3 flex items-center justify-between">
                <h2 className={`text-base font-semibold ${isHebrew ? 'font-sans text-right' : ''}`}>
                  {isHebrew ? 'משיב' : 'Respondent'}
                </h2>
                <span className={`rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400 ${isHebrew ? 'font-sans' : ''}`}>
                  {isHebrew ? 'אימייל אופציונלי • הסכמה נדרשת' : 'Optional email • Consent required'}
                </span>
              </div>
              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl">
                <div className="p-4 md:p-5">
                  <label className={`block text-sm font-medium text-gray-300 ${isHebrew ? 'font-sans text-right' : ''}`}>
                    {isHebrew ? 'אימייל (אופציונלי)' : 'Email (optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isHebrew ? "הכנס אימייל" : "you@example.com"}
                    dir={isHebrew ? "rtl" : "ltr"}
                    className={`mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isHebrew ? 'font-sans text-right' : ''}`}
                  />
                  <p className={`mt-2 text-xs text-gray-400 ${isHebrew ? 'font-sans text-right' : ''}`}>
                    {isHebrew ? 'משמש רק לצורך יצירת קשר לגבי הבטא (לא משותף)' : 'Used only to contact you about this beta (never shared).'}
                  </p>
                </div>
                <div className="p-4 md:p-5">
                  <label id="consent-box" className={`flex items-start gap-3 text-sm text-gray-300 ${isHebrew ? 'flex-row-reverse font-sans text-right' : ''}`}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4"
                      required
                    />
                    <span>
                      {isHebrew ? 'אני מסכים שהתשובות שלי יאוחסנו וינותחו לשיפור Promptability.' : 'I agree that my responses will be stored and analyzed to improve Promptability.'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {sections.map(([section, qs]) => (
              <div key={section} id={slugify(section)} className="scroll-mt-24">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className={`text-base font-semibold ${isHebrew ? 'font-sans text-right' : ''}`}>
                    {isHebrew && qs[0]?.sectionHe ? qs[0].sectionHe : section}
                  </h2>
                  <SectionBadge section={section} />
                </div>
                <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl">
                  {qs.map((q) => (
                    <div key={q.id} data-qid={q.id} className="p-4 md:p-5">
                      <label className={`block text-sm font-medium text-gray-300 ${isHebrew ? 'font-sans text-right' : ''}`}>
                        {isHebrew && q.textHe ? q.textHe : q.text}
                        {q.required && <span className="ml-1 align-super text-xs text-rose-600">*</span>}
                      </label>

                      <div className="mt-3">
                        {q.type === "multiple_choice" && q.options && (
                          <div className="grid gap-2 sm:grid-cols-2">
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
                                    onBlur={() => handleBlur(q.id)}
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
                            onBlur={() => handleBlur(q.id)}
                            rows={4}
                            placeholder={isHebrew ? "הקלד את התשובה שלך..." : "Type your answer..."}
                            dir={isHebrew ? "rtl" : "ltr"}
                            className={classNames(
                              "w-full resize-y rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none bg-white/10 text-white placeholder-gray-400",
                              "border-white/20 focus:ring-2 focus:ring-blue-500/50",
                              submitted && q.required && !responses[q.id] && "border-rose-400 focus:ring-rose-500/20",
                              isHebrew ? "font-sans text-right" : ""
                            )}
                          />
                        )}

                        {q.type === "linear" && (
                          <div className="">
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span className={isHebrew ? 'font-sans' : ''}>
                                {q.scaleMin} ({isHebrew && q.scaleLabelHe ? q.scaleLabelHe.split(" עד ")[0] : (q.scaleLabel?.split(" to ")[0] || "Low")})
                              </span>
                              <span className={isHebrew ? 'font-sans' : ''}>
                                {q.scaleMax} ({isHebrew && q.scaleLabelHe ? q.scaleLabelHe.split(" עד ")[1] : (q.scaleLabel?.split(" to ")[1] || "High")})
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
        </div>
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