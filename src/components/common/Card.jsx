import { motion } from 'framer-motion';

const Card = ({
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = hoverable ? motion.div : 'div';
  const motionProps = hoverable
    ? {
        whileHover: { y: -2, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.03)' },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      className={`bg-surface rounded-2xl border border-border shadow-soft ${paddings[padding]} ${hoverable ? 'cursor-pointer transition-colors hover:border-primary/20' : ''} ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
