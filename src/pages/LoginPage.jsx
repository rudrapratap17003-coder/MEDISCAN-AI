import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ScanLine, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components/common';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    // Simulate brief delay for demo UX
    await new Promise((r) => setTimeout(r, 800));
    login(form.email);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-12 lg:px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ScanLine size={20} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white leading-none">MediScan</span>
              <span className="text-xs font-semibold text-primary-200 tracking-wider uppercase ml-1">AI</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
            Welcome back to <br />smarter health screening.
          </h2>
          <p className="text-base text-white/60 max-w-md leading-relaxed">
            Access your AI-powered analysis tools, review past results, and explore biological insights.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <ScanLine size={20} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-text-primary leading-none">MediScan</span>
                <span className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">AI</span>
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Sign in to your account</h1>
            <p className="text-sm text-text-secondary">
              Enter your credentials to access MediScan AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium text-primary hover:text-primary-700 transition-colors">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-primary-700 transition-colors">
              Create one
            </Link>
          </p>

          <p className="mt-8 text-xs text-text-secondary/60 text-center leading-relaxed">
            This is a frontend demonstration login. No real authentication is performed.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
