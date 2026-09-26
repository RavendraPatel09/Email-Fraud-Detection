import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F17] flex items-center justify-center p-4 font-mono text-slate-100 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md p-8 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-widest text-slate-100">CYBERMAIL INTEL</div>
            <div className="text-[10px] text-slate-400">SIH 2026 Password Recovery</div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold font-sans text-slate-100">
            Reset Your Password
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Enter your analyst email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Reset Requested</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              If an account exists for <span className="text-blue-300 font-mono font-semibold">{email}</span>, password reset instructions would be sent. In this prototype, no real email is sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@cybermail.demo"
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>SEND RESET LINK</span>
            </button>
          </form>
        )}

        <div className="pt-2 text-center">
          <Link
            to="/signin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
