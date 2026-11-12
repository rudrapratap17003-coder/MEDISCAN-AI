import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy-loaded routes for code-splitting and performance optimization
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const DesignSystemPage = lazy(() => import('../pages/DesignSystemPage'));
const ImageAnalysisHub = lazy(() => import('../pages/ImageAnalysisHub'));
const ImageAnalysisModule = lazy(() => import('../pages/ImageAnalysisModule'));
const SymptomAnalysisPage = lazy(() => import('../pages/SymptomAnalysisPage'));
const BiologicalExplorerPage = lazy(() => import('../pages/BiologicalExplorerPage'));
const AIBiologyAssistantPage = lazy(() => import('../pages/AIBiologyAssistantPage'));
const AnalysisHistoryPage = lazy(() => import('../pages/AnalysisHistoryPage'));
const SavedReportsPage = lazy(() => import('../pages/SavedReportsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <LoadingSpinner size="lg" label="Loading medical workspace..." />
  </div>
);

/**
 * Application route configuration.
 *
 * Integrated with route code-splitting, protected route validation,
 * layout wrapping, and graceful 404 fallback routing.
 */
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected app pages — wrapped with MainLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout><DashboardPage /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/design-system"
            element={
              <ProtectedRoute>
                <MainLayout><DesignSystemPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Medical Image Analysis Workspace & Screening Modules */}
          <Route
            path="/image-analysis"
            element={
              <ProtectedRoute>
                <MainLayout><ImageAnalysisHub /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/image-analysis/skin"
            element={
              <ProtectedRoute>
                <MainLayout><ImageAnalysisModule defaultCategory="skin" /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/image-analysis/lung"
            element={
              <ProtectedRoute>
                <MainLayout><ImageAnalysisModule defaultCategory="lung" /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/image-analysis/blood"
            element={
              <ProtectedRoute>
                <MainLayout><ImageAnalysisModule defaultCategory="blood" /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/image-analysis/:categoryId"
            element={
              <ProtectedRoute>
                <MainLayout><ImageAnalysisModule /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* AI-Assisted Symptom Analysis Workspace */}
          <Route
            path="/symptom-analysis"
            element={
              <ProtectedRoute>
                <MainLayout><SymptomAnalysisPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Interactive Biological Explorer */}
          <Route
            path="/biological-explorer"
            element={
              <ProtectedRoute>
                <MainLayout><BiologicalExplorerPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* AI Biology Assistant */}
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <MainLayout><AIBiologyAssistantPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Unified Analysis History & Saved Reports */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <MainLayout><AnalysisHistoryPage /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis-history"
            element={
              <ProtectedRoute>
                <MainLayout><AnalysisHistoryPage /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-reports"
            element={
              <ProtectedRoute>
                <MainLayout><SavedReportsPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* User Profile & Account Settings */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout><ProfilePage /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout><SettingsPage /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found Catch-All */}
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRoutes;
