import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common';
import useScrollReveal from '../../hooks/useScrollReveal';

const CTASection = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary to-primary-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles size={14} className="text-white" />
            <span className="text-xs font-semibold text-white/90">Start Your Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Discover the Science Behind Better Healthcare.
          </h2>

          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Join MediScan AI and explore how artificial intelligence is transforming health screening and biological education.
          </p>

          <Link to="/register">
            <Button
              size="xl"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-white text-primary hover:bg-gray-50 focus:ring-white/30 shadow-large"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
