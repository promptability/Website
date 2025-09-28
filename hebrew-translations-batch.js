// This script contains Hebrew translations for the remaining questions
// You can copy these translations into the QUESTIONS array

const hebrewTranslations = {
  // Performance & Speed
  "perf_generation_speed": {
    textHe: "מהירות יצירת הפרומפט מרגישה:",
    optionsHe: ["מהיר מאוד (פחות מ-2 שניות)", "מהיר (2-4 שניות)", "מקובל (4-7 שניות)", "איטי (7-15 שניות)", "איטי מאוד (יותר מ-15 שניות)"],
    sectionHe: "ביצועים ומהירות"
  },
  "perf_slowdowns_crashes": {
    textHe: "תאר מצבים שבהם Promptability גרם להאטות או קריסות של הדפדפן.",
    sectionHe: "ביצועים ומהירות"
  },
  "perf_responsive_heavy_use": {
    textHe: "התוסף מרגיש רספונסיבי במהלך סשנים כבדים של שימוש ב-AI.",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    sectionHe: "ביצועים ומהירות"
  },

  // Reliability & Bugs
  "rel_trigger_failure_rate": {
    textHe: "כמה פעמים בחירת טקסט נכשלת להפעיל את הוידג'ט הצף כצפוי?",
    optionsHe: ["אף פעם", "לעתים רחוקות (פעם בשבוע)", "לפעמים (יומי)", "לעתים קרובות (מספר פעמים ביום)", "תמיד"],
    sectionHe: "אמינות ובאגים"
  },
  "rel_updates_breakage": {
    textHe: "כשאתרי AI מעדכנים את הממשקים שלהם Promptability ממשיך לעבוד:",
    optionsHe: ["תמיד מסתגל", "בדרך כלל עובד", "לפעמים נשבר", "לעתים קרובות נשבר", "תמיד נשבר"],
    sectionHe: "אמינות ובאגים"
  },
  "rel_auth_stability": {
    textHe: "סשנים של אימות Google נשארים יציבים:",
    optionsHe: ["תמיד מחובר", "מדי פעם צריך להתחבר מחדש", "דרוש התחברות מחדש קבועה", "בעיות אימות תכופות"],
    sectionHe: "אמינות ובאגים"
  },

  // Result Quality & Effectiveness
  "quality_prompt_improvement": {
    textHe: "כמה הפרומפטים המשופרים משפרים את התגובות שלך מ-AI?",
    optionsHe: ["טוב בצורה דרמטית", "טוב משמעותית", "טוב במקצת", "טוב מעט", "בלי שיפור"],
    sectionHe: "איכות התוצאות ויעילות"
  },
  "quality_accuracy_rate": {
    textHe: "כמה פעמים הפרומפטים המשופרים נותנים לך את התוצאות שרצית?",
    optionsHe: ["כמעט תמיד (90-100%)", "בדרך כלל (70-89%)", "לפעמים (50-69%)", "לעתים רחוקות (30-49%)", "כמעט אף פעם (0-29%)"],
    sectionHe: "איכות התוצאות ויעילות"
  },
  "quality_vs_manual": {
    textHe: "בהשוואה לכתיבת פרומפטים ידנית, התוצאות של Promptability הן:",
    optionsHe: ["הרבה יותר טובות", "יותר טובות", "בערך אותו דבר", "גרועות יותר", "הרבה יותר גרועות"],
    sectionHe: "איכות התוצאות ויעילות"
  },

  // Platform Usage
  "platforms_primary": {
    textHe: "באיזה פלטפורמת AI אתה משתמש הכי הרבה עם Promptability?",
    optionsHe: ["ChatGPT (OpenAI)", "Claude (Anthropic)", "Gemini (Google)", "Perplexity", "אחר"],
    sectionHe: "שימוש בפלטפורמות"
  },
  "platforms_frequency": {
    textHe: "כמה פעמים אתה משתמש ב-Promptability על פני פלטפורמות AI שונות?",
    optionsHe: ["מספר פלטפורמות יומית", "מספר פלטפורמות שבועית", "נדבק לפלטפורמה אחת בעיקר", "מנסה פלטפורמות שונות מדי פעם", "משתמש רק בפלטפורמה אחת"],
    sectionHe: "שימוש בפלטפורמות"
  },

  // Overall Experience
  "overall_continue_use": {
    textHe: "כמה סביר שתמשיך להשתמש ב-Promptability אחרי הבטא?",
    optionsHe: ["בהחלט אמשיך", "כנראה אמשיך", "אולי", "כנראה לא", "בהחלט לא"],
    sectionHe: "חוויה כללית"
  },
  "overall_recommend": {
    textHe: "למי הכי סביר שתמליץ על Promptability?",
    optionsHe: ["משתמשי כוח של AI", "יוצרי תוכן", "חוקרים", "אנשי עסקים", "סטודנטים", "לאף אחד"],
    sectionHe: "חוויה כללית"
  },
  "overall_most_valuable": {
    textHe: "מה התכונה הכי חשובה של Promptability עבור זרימת העבודה שלך?",
    sectionHe: "חוויה כללית"
  },
  "overall_improves_interactions": {
    textHe: "בסך הכל Promptability משפר משמעותית את האינטראקציות שלי עם AI.",
    scaleLabelHe: "לא מסכים בחוזקה עד מסכים בחוזקה",
    sectionHe: "חוויה כללית"
  },
  "overall_additional_feedback": {
    textHe: "יש לך משוב נוסף, הצעות או הערות?",
    sectionHe: "חוויה כללית"
  }
};

console.log("Hebrew translations ready to be added to the survey component");