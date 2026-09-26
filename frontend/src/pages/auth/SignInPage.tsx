import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col lg:flex-row font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* LEFT SIDE: Platform Branding (50% on Desktop) */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-white border-r border-slate-200 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-2">
                <span>CYBERMAIL INTEL</span>
                <span className="px-2 py-0.5 text-[10px] rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold font-mono">
                  SIH26106
                </span>
              </div>
              <div className="text-xs text-slate-500 font-sans">
                AICTE Cyber Security Cell Platform
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight leading-tight text-slate-900">
              Email Threat Detection & Forensic Intelligence Platform
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
              Securely investigate, analyze and respond to email-based threats. Extract IOCs, resolve source IP geography, and preserve tamper-evident evidence.
            </p>
          </div>
        </div>

        {/* Feature List Cards */}
        <div className="relative z-10 my-8 space-y-3 max-w-md">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Header Triage & Protocol Validation</div>
              <div className="text-[11px] text-slate-600">Automated SPF, DKIM, DMARC & typosquatting detection engine.</div>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Evidence Chain of Custody</div>
              <div className="text-[11px] text-slate-600">Tamper-evident evidence preservation using Web Crypto SHA-256 digests.</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-4">
          <span>Smart India Hackathon 2026</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Active
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Clean Sign In Card */}
      <div className="lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-[#F8FAFC]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Sign In to Security Console
            </h2>
            <p className="text-xs text-slate-500">
              Enter your analyst credentials to access the platform.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.gov.in"
                className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-2.5 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 bg-slate-50 text-blue-600 focus:ring-blue-600/20"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>SIGN IN</span>
            </button>
          </form>

          <div className="text-center text-xs text-slate-600 pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-800">
              Sign Up
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>🔒 Secure end-to-end encrypted authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
