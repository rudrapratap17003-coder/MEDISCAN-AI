import { motion } from 'framer-motion';
import { MousePointerClick, Upload, Cpu, FileSearch } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const steps = [
  {
    icon: MousePointerClick,
    step: '01',
    title: 'Select Module',
    description: 'Choose from image analysis, symptom assessment, biological explorer or AI assistant.',
  },
  {
    icon: Upload,
    step: '02',
    title: 'Provide Input',
    description: 'Upload a medical image or describe symptoms for the AI to process.',
  },
  {
    icon: Cpu,
    step: '03',
    title: 'AI Processing',
    description: 'The AI engine analyzes the provided information using trained models.',
  },
  {
    icon: FileSearch,
    step: '04',
    title: 'Explore Results',
    description: 'Review screening insights and explore the biological explanation behind them.',
  },
];

const HowItWorksSection = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary-50 text-secondary text-xs font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              How MediScan AI Works
            </h2>
            <p className="text-text-secondary text-lg">
              Four straightforward steps from input to insight.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step circle */}
                  <div className="relative mx-auto w-16 h-16 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-white shadow-medium border border-border flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-soft">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
