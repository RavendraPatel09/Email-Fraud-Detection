import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginDemo } = useAuth();

  const [email, setEmail] = useState('analyst@cybermail.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    login(email, password);
    navigate('/');
  };

  const handleDemoLogin = () => {
    loginDemo();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F17] flex flex-col lg:flex-row font-mono text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* LEFT SIDE: Platform Branding (50% on Desktop) */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-gradient-to-br from-[#0B0F17] via-[#0E1526] to-blue-950/30 border-r border-slate-800 relative overflow-hidden">
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-950">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-widest text-slate-100 flex items-center gap-2">
                <span>CYBERMAIL INTEL</span>
                <span className="px-2 py-0.5 text-[10px] rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  SIH26106
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                AICTE Cyber Security Cell Platform
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <h1 className="text-2xl lg:text-4xl font-bold font-sans tracking-tight leading-tight text-white">
              AI-Powered Email Threat Detection & Forensic Intelligence
            </h1>
            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-lg">
              Securely investigate, analyze and respond to email-based threats. Extract IOCs, resolve source IP geography, and preserve tamper-evident evidence in real time.
            </p>
          </div>
        </div>

        {/* Feature List Cards */}
        <div className="relative z-10 my-8 space-y-3 max-w-md">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">Real-Time Header Triage</div>
              <div className="text-[11px] text-slate-400 font-sans">Automated SPF, DKIM, DMARC & typosquatting detection engine.</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">Web Crypto SHA-256 Ledger</div>
              <div className="text-[11px] text-slate-400 font-sans">Immutable evidence preservation with Merkle block hash links.</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span>Smart India Hackathon 2026 Prototype</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Engine Online
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Sign In Card (50% on Desktop) */}
      <div className="lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-[#0B0F17]">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-sans text-slate-100">
              Sign In to Security Console
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Enter your credentials to access the SOC triage dashboard.
            </p>
          </div>

          {/* Quick 1-Click Demo Login Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>SIH PRESENTATION DEMO ACCOUNT</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                1-CLICK ACCESS
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Bypass form entry and enter immediately as <span className="font-mono text-amber-300 font-semibold">analyst@cybermail.demo</span>
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>ENTER DEMO ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#0B0F17] px-3 text-[11px] text-slate-500 uppercase font-mono">Or Login Manually</span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.gov.in"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 font-sans">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-2.5 pr-10 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-900 text-blue-500 focus:ring-blue-500/20"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>SIGN IN</span>
            </button>
          </form>

          {/* Optional Prototype Google Button */}
          <button
            type="button"
            disabled
            className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 text-xs font-sans cursor-not-allowed flex items-center justify-center gap-2 opacity-60"
          >
            <span>Continue with Google (Disabled in Prototype)</span>
          </button>

          <div className="text-center text-xs text-slate-400 font-sans pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 font-semibold hover:text-blue-300">
              Sign Up
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>🔒 Secure end-to-end encrypted authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
