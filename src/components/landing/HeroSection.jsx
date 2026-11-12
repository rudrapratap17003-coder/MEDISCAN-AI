import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, ScanLine, Activity, Brain, Shield, HeartPulse, Microscope } from 'lucide-react';
import { Button } from '../common';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/60 border border-primary-200/60 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary">AI-Powered Health Screening</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-text-primary mb-6">
              Smarter Healthcare Begins With{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Early Detection.
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mb-8">
              Explore AI-assisted disease screening through medical image analysis, symptom assessment and interactive biological insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button size="lg" icon={Search} className="w-full sm:w-auto">
                  Explore Disease Detection
                </Button>
              </Link>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Button variant="outline" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                  Discover How It Works
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 text-text-secondary"
            >
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-success" />
                <span className="text-xs font-medium">Privacy-First Design</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                <span className="text-xs font-medium">Research-Grade AI</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main dashboard card */}
            <div className="relative bg-white rounded-3xl shadow-xl border border-border/60 p-5 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 border border-border">
                  <ScanLine size={12} className="text-primary" />
                  <span className="text-[10px] font-medium text-text-secondary">MediScan AI — Analysis Panel</span>
                </div>
              </div>

              {/* Grid layout */}
              <div className="grid grid-cols-3 gap-3">
                {/* Scan preview */}
                <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 relative overflow-hidden h-44">
                  {/* Scan grid lines */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(6)].map((_, i) => (
                      <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-blue-400" style={{ top: `${(i + 1) * 16.67}%` }} />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-blue-400" style={{ left: `${(i + 1) * 12.5}%` }} />
                    ))}
                  </div>
                  {/* Scanning line */}
                  <motion.div
                    className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{ top: ['15%', '85%', '15%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Circular target */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 border-primary/40"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/60"
                      animate={{ scale: [1, 0.85, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-mono text-primary/80">SCAN ACTIVE</span>
                  </div>
                  <div className="absolute top-3 right-4">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Side panels */}
                <div className="space-y-3">
                  <motion.div
                    className="bg-primary-50 rounded-xl p-3 border border-primary-100"
                    animate={{ borderColor: ['rgba(219,234,254,1)', 'rgba(147,197,253,0.5)', 'rgba(219,234,254,1)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain size={16} className="text-primary mb-1.5" />
                    <p className="text-[10px] font-semibold text-primary">AI Analysis</p>
                    <p className="text-[9px] text-primary/60">Processing...</p>
                  </motion.div>
                  <div className="bg-secondary-50 rounded-xl p-3 border border-secondary-100">
                    <HeartPulse size={16} className="text-secondary mb-1.5" />
                    <p className="text-[10px] font-semibold text-secondary">Vital Scan</p>
                    <p className="text-[9px] text-secondary/60">Ready</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                    <Microscope size={16} className="text-amber-600 mb-1.5" />
                    <p className="text-[10px] font-semibold text-amber-700">Bio View</p>
                    <p className="text-[9px] text-amber-500">Standby</p>
                  </div>
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-border">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-success"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-medium text-text-secondary">System Ready</span>
                </div>
                <div className="flex items-center gap-3">
                  {['Module A', 'Module B', 'Module C'].map((m) => (
                    <div key={m} className="h-1.5 w-8 rounded-full bg-primary/15 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary/50"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -left-4 top-12 bg-white rounded-xl shadow-large border border-border px-3 py-2 hidden lg:flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield size={14} className="text-success" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">Secure Analysis</p>
                <p className="text-[9px] text-success">Encrypted</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -right-4 bottom-20 bg-white rounded-xl shadow-large border border-border px-3 py-2 hidden lg:flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Activity size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">AI Engine</p>
                <p className="text-[9px] text-primary">Operational</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
