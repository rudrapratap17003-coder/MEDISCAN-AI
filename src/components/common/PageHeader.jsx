import { motion } from 'framer-motion';

const PageHeader = ({
  title,
  description,
  icon: Icon,
  actions,
  breadcrumb,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 ${className}`}
    >
      {breadcrumb && (
        <nav className="mb-3 text-sm text-text-secondary">
          {breadcrumb}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary">
              <Icon size={20} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;
