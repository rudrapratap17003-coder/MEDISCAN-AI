import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary/30 shadow-soft hover:shadow-medium',
  secondary: 'bg-secondary text-white hover:bg-secondary-700 focus:ring-secondary/30 shadow-soft hover:shadow-medium',
  outline: 'border-2 border-primary text-primary hover:bg-primary-50 focus:ring-primary/30',
  ghost: 'text-text-secondary hover:bg-gray-100 hover:text-text-primary focus:ring-gray-200',
  danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger/30 shadow-soft hover:shadow-medium',
  success: 'bg-success text-white hover:bg-green-700 focus:ring-success/30 shadow-soft hover:shadow-medium',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-3.5 text-lg',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`btn-base ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16} />}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
