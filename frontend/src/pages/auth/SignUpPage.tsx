import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Lock, Eye, EyeOff, UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ROLES: UserRole[] = [
  'Security Analyst',
  'SOC Analyst',
  'Incident Responder',
  'Administrator',
  'Researcher',
  'Student / Trainee',
  'Other'
];

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addNotification } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<UserRole>('Security Analyst');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '' };
    if (pass.length < 6) return { label: 'Weak', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
    if (pass.length < 10 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) return { label: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { label: 'Strong', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    signup({ name, email, organization, role });
    addNotification('Account Created', `Welcome to CyberMail Intel, ${name}! Your security workspace is ready.`, 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F17] flex flex-col lg:flex-row font-mono text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* LEFT SIDE: Platform Branding */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-gradient-to-br from-[#0B0F17] via-[#0E1526] to-blue-950/30 border-r border-slate-800 relative overflow-hidden">
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
              Create Your Security Analyst Profile
            </h1>
            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-lg">
              Join the Cyber Security Cell platform to conduct AI-powered email triage, correlate threat feeds, and preserve evidence in tamper-evident block ledgers.
            </p>
          </div>
        </div>

        <div className="relative z-10 my-8 space-y-3 max-w-md">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">Role-Based Triage Workspaces</div>
              <div className="text-[11px] text-slate-400 font-sans">Customized views for Analysts, Responders, and Researchers.</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span>Smart India Hackathon 2026</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Registration Open
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Sign Up Form Card */}
      <div className="lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-[#0B0F17]">
        <div className="w-full max-w-md space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-sans text-slate-100">
              Create Analyst Account
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Enter your professional details to set up your security credentials.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ravendra Patel"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@org.gov.in"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="AICTE Cyber Cell"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  {ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                {strength.label && (
                  <span className={`px-2 py-0.5 text-[10px] rounded border font-mono font-bold ${strength.color}`}>
                    Strength: {strength.label}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full p-2.5 pr-10 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
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

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer font-sans">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-800 bg-slate-900 text-blue-500 focus:ring-blue-500/20"
                />
                <span>I agree to the Terms of Service and Privacy Policy for SIH 2026 Prototype.</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>CREATE ACCOUNT</span>
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 font-sans pt-2">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-400 font-semibold hover:text-blue-300">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
