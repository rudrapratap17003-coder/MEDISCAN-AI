import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ScanLine, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { Button, Input } from '../components/common';

const passwordRules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    } else {
      const failing = passwordRules.filter((r) => !r.test(form.password));
      if (failing.length > 0) errs.password = 'Password does not meet all requirements';
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!acceptTerms) errs.terms = 'You must accept the terms';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    navigate('/login');
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-700 via-secondary to-secondary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-12 lg:px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ScanLine size={20} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white leading-none">MediScan</span>
              <span className="text-xs font-semibold text-secondary-200 tracking-wider uppercase ml-1">AI</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
            Start exploring <br />AI health screening.
          </h2>
          <p className="text-base text-white/60 max-w-md leading-relaxed">
            Create your account to access medical image analysis, symptom assessment and interactive biological insights.
          </p>
        </div>
      </div>

      {/* Right: Register form */}
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
            <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
            <p className="text-sm text-text-secondary">
              Set up your MediScan AI profile in less than a minute
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={User}
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                icon={Lock}
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
              />
              {/* Password strength indicators */}
              {form.password && (
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(form.password);
                    return (
                      <div key={rule.label} className="flex items-center gap-1.5">
                        {passed ? (
                          <CheckCircle size={12} className="text-success flex-shrink-0" />
                        ) : (
                          <Circle size={12} className="text-text-secondary/40 flex-shrink-0" />
                        )}
                        <span className={`text-[11px] ${passed ? 'text-success' : 'text-text-secondary/60'}`}>
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              icon={Lock}
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
            />

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                />
                <span className="text-sm text-text-secondary leading-snug">
                  I agree to the{' '}
                  <button type="button" className="font-medium text-primary hover:text-primary-700 transition-colors">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="font-medium text-primary hover:text-primary-700 transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-danger mt-1">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-primary-700 transition-colors">
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-xs text-text-secondary/60 text-center leading-relaxed">
            This is a frontend demonstration. No data is stored or transmitted.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
