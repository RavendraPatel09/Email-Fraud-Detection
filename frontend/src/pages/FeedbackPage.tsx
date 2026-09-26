import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Star, MessageSquare, Send, CheckCircle2, History } from 'lucide-react';

export interface FeedbackEntry {
  id: string;
  date: string;
  type: string;
  rating: number;
  message: string;
  email?: string;
  status: 'Received' | 'Under Review' | 'Resolved';
}

const FEEDBACK_STORAGE_KEY = 'mailshield_feedback';

export const FeedbackPage: React.FC = () => {
  const { t } = useLanguage();
  const { addNotification } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackType, setFeedbackType] = useState<string>('General Feedback');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>(() => {
    const saved = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: 'fb-101',
        date: '26 Sep 2026',
        type: 'UI/UX',
        rating: 5,
        message: 'The light mode layout and clear threat assessment summary are very easy to navigate.',
        status: 'Received'
      },
      {
        id: 'fb-100',
        date: '24 Sep 2026',
        type: 'Feature Request',
        rating: 4,
        message: 'Add option to export Web Crypto SHA-256 evidence certificate as PDF.',
        status: 'Under Review'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackHistory));
  }, [feedbackHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newEntry: FeedbackEntry = {
      id: `fb-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: feedbackType,
      rating,
      message,
      email: email || undefined,
      status: 'Received'
    };

    setFeedbackHistory(prev => [newEntry, ...prev]);
    setSubmitted(true);
    setMessage('');
    addNotification(t.thankYouFeedback, `Feedback submitted successfully (${feedbackType}).`, 'success');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1200px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          <span>{t.feedbackTitle}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {t.feedbackSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feedback Submission Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.thankYouFeedback}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your feedback has been recorded and saved locally.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    {t.ratingLabel}
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2 font-mono">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                {/* Feedback Type Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    {t.feedbackTypeLabel}
                  </label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                  >
                    <option value="General Feedback">General Feedback</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="UI/UX">UI / UX Improvement</option>
                    <option value="Threat Detection">Threat Detection Accuracy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Feedback Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    {t.feedbackTextLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.feedbackTextPlaceholder}
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 leading-relaxed"
                  />
                </div>

                {/* Optional Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Email Address <span className="text-slate-400 font-normal">(Optional for follow-up)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@organization.gov.in"
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.submitFeedback}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Feedback History Table (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                <span>{t.feedbackHistory}</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">{feedbackHistory.length} Entries</span>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {feedbackHistory.map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.type}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    "{item.message}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                    <span>{item.date}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 text-[10px]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
