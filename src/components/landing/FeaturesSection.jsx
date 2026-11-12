import { motion } from 'framer-motion';
import { ScanLine, Stethoscope, Dna, Bot, ArrowRight } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const features = [
  {
    icon: ScanLine,
    title: 'AI Image Analysis',
    description: 'Analyze selected medical images using trained machine learning models for faster screening insights.',
    color: 'primary',
    bgClass: 'bg-primary-50',
    borderClass: 'border-primary-100',
    iconClass: 'text-primary',
  },
  {
    icon: Stethoscope,
    title: 'Symptom Analysis',
    description: 'Explore possible health conditions by providing symptom information for AI-guided assessment.',
    color: 'secondary',
    bgClass: 'bg-secondary-50',
    borderClass: 'border-secondary-100',
    iconClass: 'text-secondary',
  },
  {
    icon: Dna,
    title: 'Biological Explorer',
    description: 'Understand diseases through interactive biological explanations and detailed anatomical models.',
    color: 'amber',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-100',
    iconClass: 'text-amber-600',
  },
  {
    icon: Bot,
    title: 'AI Biology Assistant',
    description: 'Learn about diseases, organs and biological processes with an intelligent conversational assistant.',
    color: 'violet',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-100',
    iconClass: 'text-violet-600',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturesSection = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-semibold mb-4">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Powerful AI Tools for Health Screening
            </h2>
            <p className="text-text-secondary text-lg">
              Four integrated modules working together to provide comprehensive AI-assisted health analysis and biological education.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative bg-white rounded-2xl border border-border p-6 shadow-soft hover:shadow-large transition-shadow duration-300 cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-xl ${f.bgClass} border ${f.borderClass} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                  <Icon size={22} className={f.iconClass} />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{f.description}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn More <ArrowRight size={12} />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
