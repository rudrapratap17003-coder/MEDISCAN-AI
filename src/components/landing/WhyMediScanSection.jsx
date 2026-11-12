import { motion } from 'framer-motion';
import { Brain, BookOpen, BarChart3, GraduationCap, CheckCircle } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const reasons = [
  {
    icon: Brain,
    title: 'AI-Assisted Screening',
    points: ['Trained machine learning models', 'Multi-format image support', 'Structured symptom assessment'],
  },
  {
    icon: BookOpen,
    title: 'Educational Biological Insights',
    points: ['Disease mechanism explanations', 'Anatomical context mapping', 'Research-grade references'],
  },
  {
    icon: BarChart3,
    title: 'Interactive Visualizations',
    points: ['3D anatomy models', 'Analysis result dashboards', 'Comparative visual reports'],
  },
  {
    icon: GraduationCap,
    title: 'Accessible Health Education',
    points: ['Plain-language explanations', 'Guided exploration paths', 'Conversational AI tutor'],
  },
];

const WhyMediScanSection = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="why-mediscan" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Why MediScan AI?
            </h2>
            <p className="text-text-secondary text-lg">
              A platform built to make AI health screening accessible, educational and transparent.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl border border-border p-6 hover:shadow-medium transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-100 border border-primary-200/50 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-3">{r.title}</h3>
                    <ul className="space-y-2">
                      {r.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle size={14} className="text-success flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyMediScanSection;
