import { motion } from 'framer-motion';

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const LoadingSpinner = ({ size = 'md', className = '', label = 'Loading...' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-primary/20 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {label && <p className="text-sm text-text-secondary">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
