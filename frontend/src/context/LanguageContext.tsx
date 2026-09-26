import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Branding
    appName: 'MailShield',
    tagline: 'Secure Every Message.',
    productDescription: 'AI-Powered Email Threat Detection & Forensic Intelligence Platform',

    // Navigation
    overview: 'Security Overview',
    emailAnalyzer: 'Email Analyzer',
    threatIntelligence: 'Threat Intelligence',
    investigations: 'Investigations',
    evidence: 'Evidence',
    incidents: 'Incidents',
    reports: 'Reports',
    feedback: 'Feedback',
    settings: 'Settings',

    // Dashboard & Overview
    emailsAnalyzed: 'Emails Analyzed',
    threatsDetected: 'Threats Detected',
    openIncidents: 'Open Incidents',
    highRiskAlerts: 'High-Risk Alerts',
    investigateEmailTitle: 'Investigate a suspicious email',
    investigateEmailDesc: 'Paste an email or upload an .eml file to identify potential threats, suspicious links, and source information.',
    analyzeEmail: 'Analyze Email',
    uploadEml: 'Upload .eml',
    threatActivity: 'Threat Activity (Last 7 Days)',
    threatMap: 'Threat Activity Map',
    recentThreats: 'Recent Threats',
    recentIncidents: 'Recent Incidents',
    approximateLocation: 'Approximate IP-based location',
    viewAllIncidents: 'View All Incidents',
    investigate: 'Investigate',

    // Email Analyzer
    pasteEmailTab: 'Paste Email',
    uploadEmlTab: 'Upload .eml',
    inputPlaceholder: 'Paste the email content or email headers here...',
    threatAssessment: 'Threat Assessment',
    threatDetectedVerdict: 'Threat Detected',
    assessmentCompleteVerdict: 'Email Assessment Complete',
    whyFlagged: 'Why was this flagged?',
    viewTechnicalDetails: 'View technical details',
    hideTechnicalDetails: 'Hide technical details',
    recommendedActions: 'Recommended Actions',
    quarantineEmail: 'Quarantine Email',
    blockDomain: 'Block Domain',
    blockIp: 'Block Source IP',
    generateReport: 'Generate Report',

    // Common Actions & Search
    searchPlaceholder: 'Search incidents, IPs, domains or evidence...',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    giveFeedback: 'Give Feedback',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',

    // Feedback Page
    feedbackTitle: 'Give Feedback',
    feedbackSubtitle: 'Share your experience, report bugs, or suggest features for MailShield.',
    ratingLabel: 'How was your experience?',
    feedbackTextLabel: 'What did you think?',
    feedbackTextPlaceholder: 'Tell us what worked well or what we can improve.',
    feedbackTypeLabel: 'Feedback Type',
    submitFeedback: 'Submit Feedback',
    thankYouFeedback: 'Thank you for your feedback!',
    feedbackHistory: 'Feedback History',

    // Severities & Statuses
    critical: 'CRITICAL',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    safe: 'SAFE',
    clean: 'CLEAN',
    malicious: 'MALICIOUS',
    suspicious: 'SUSPICIOUS',
    open: 'OPEN',
    investigating: 'INVESTIGATING',
    quarantined: 'QUARANTINED',
    resolved: 'RESOLVED'
  },

  hi: {
    // Branding
    appName: 'MailShield',
    tagline: 'हर संदेश को सुरक्षित रखें।',
    productDescription: 'एआई-संचालित ईमेल खतरा पहचान और फोरेंसिक इंटेलिजेंस प्लेटफॉर्म',

    // Navigation
    overview: 'सुरक्षा अवलोकन',
    emailAnalyzer: 'ईमेल विश्लेषक',
    threatIntelligence: 'खतरा खुफिया',
    investigations: 'जांच',
    evidence: 'साक्ष्य',
    incidents: 'घटनाएं',
    reports: 'रिपोर्ट',
    feedback: 'प्रतिक्रिया',
    settings: 'सेटिंग्स',

    // Dashboard & Overview
    emailsAnalyzed: 'विश्लेषण किए गए ईमेल',
    threatsDetected: 'पहचाने गए खतरे',
    openIncidents: 'खुले मामले',
    highRiskAlerts: 'उच्च जोखिम चेतावनी',
    investigateEmailTitle: 'संदेहास्पद ईमेल की जांच करें',
    investigateEmailDesc: 'संभावित खतरों, संदिग्ध लिंक और स्रोत जानकारी की पहचान के लिए ईमेल पेस्ट करें या .eml फ़ाइल अपलोड करें।',
    analyzeEmail: 'ईमेल का विश्लेषण करें',
    uploadEml: '.eml अपलोड करें',
    threatActivity: 'खतरा गतिविधि (पिछले 7 दिन)',
    threatMap: 'खतरा स्थान मानचित्र',
    recentThreats: 'हाल के खतरे',
    recentIncidents: 'हाल की घटनाएं',
    approximateLocation: 'अनुमानित आईपी-आधारित स्थान',
    viewAllIncidents: 'सभी घटनाएं देखें',
    investigate: 'जांच करें',

    // Email Analyzer
    pasteEmailTab: 'ईमेल पेस्ट करें',
    uploadEmlTab: '.eml अपलोड करें',
    inputPlaceholder: 'ईमेल सामग्री या ईमेल हेडर यहाँ पेस्ट करें...',
    threatAssessment: 'खतरा मूल्यांकन',
    threatDetectedVerdict: 'खतरा पहचाना गया',
    assessmentCompleteVerdict: 'ईमेल मूल्यांकन पूरा हुआ',
    whyFlagged: 'इसे क्यों ध्वजंकित किया गया?',
    viewTechnicalDetails: 'तकनीकी विवरण देखें',
    hideTechnicalDetails: 'तकनीकी विवरण छिपाएं',
    recommendedActions: 'अनुशंसित कार्रवाइयां',
    quarantineEmail: 'ईमेल संगरोध करें',
    blockDomain: 'डोमेन ब्लॉक करें',
    blockIp: 'स्रोत आईपी ब्लॉक करें',
    generateReport: 'रिपोर्ट तैयार करें',

    // Common Actions & Search
    searchPlaceholder: 'घटनाएं, आईपी, डोमेन या साक्ष्य खोजें...',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    signOut: 'साइन आउट',
    giveFeedback: 'प्रतिक्रिया दें',
    saveChanges: 'परिवर्तन सहेजें',
    cancel: 'रद्द करें',

    // Feedback Page
    feedbackTitle: 'प्रतिक्रिया दें',
    feedbackSubtitle: 'मेलशील्ड के लिए अपना अनुभव साझा करें, बग रिपोर्ट करें या सुविधाओं का सुझाव दें।',
    ratingLabel: 'आपका अनुभव कैसा रहा?',
    feedbackTextLabel: 'आप क्या सोचते हैं?',
    feedbackTextPlaceholder: 'हमें बताएं कि क्या अच्छा रहा या हम क्या सुधार कर सकते हैं।',
    feedbackTypeLabel: 'प्रतिक्रिया का प्रकार',
    submitFeedback: 'प्रतिक्रिया भेजें',
    thankYouFeedback: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    feedbackHistory: 'प्रतिक्रिया इतिहास',

    // Severities & Statuses
    critical: 'गंभीर',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'निम्न',
    safe: 'सुरक्षित',
    clean: 'स्वच्छ',
    malicious: 'दुर्भावनापूर्ण',
    suspicious: 'संदिग्ध',
    open: 'खुला',
    investigating: 'जांच जारी',
    quarantined: 'संगरोधित',
    resolved: 'हल किया गया'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'mailshield_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
    return saved || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
