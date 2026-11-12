import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 mb-4">
        <AlertTriangle size={28} className="text-danger" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      {onRetry && (
        <Button variant="outline" size="md" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
