import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, PageHeader, Card } from '../components/common';
import { useAuth } from '../context/AuthContext';

/**
 * Placeholder dashboard page shown after demo login.
 * Will be replaced with a full dashboard in Phase 3+.
 */
const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Dashboard"
        description={`Welcome back${user?.name ? `, ${user.name}` : ''}! Your MediScan AI workspace is ready.`}
        icon={LayoutDashboard}
        actions={
          <Button variant="ghost" onClick={logout}>
            Sign Out
          </Button>
        }
      />

      <Card className="text-center py-16">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mx-auto mb-4">
          <LayoutDashboard size={28} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Dashboard Coming Soon
        </h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
          The full analysis dashboard will be available in a future phase. For now, explore the design system to see all available components.
        </p>
        <Link to="/design-system">
          <Button icon={ArrowRight} iconPosition="right">
            View Design System
          </Button>
        </Link>
      </Card>

      <p className="text-xs text-text-secondary text-center mt-8">
        MediScan AI is an educational research prototype. It does not provide medical diagnoses.
      </p>
    </motion.div>
  );
};

export default DashboardPlaceholder;
