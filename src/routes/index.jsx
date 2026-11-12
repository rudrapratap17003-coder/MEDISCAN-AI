import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import DesignSystemPage from '../pages/DesignSystemPage';
import ModulePlaceholder from '../pages/ModulePlaceholder';
import ImageAnalysisHub from '../pages/ImageAnalysisHub';
import ImageAnalysisModule from '../pages/ImageAnalysisModule';
import SymptomAnalysisPage from '../pages/SymptomAnalysisPage';
import BiologicalExplorerPage from '../pages/BiologicalExplorerPage';
import AIBiologyAssistantPage from '../pages/AIBiologyAssistantPage';
import AnalysisHistoryPage from '../pages/AnalysisHistoryPage';
import SavedReportsPage from '../pages/SavedReportsPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

/**
 * Application route configuration.
 *
 * Phase 4: Full AI Medical Image Analysis workspace with
 * dedicated skin, lung, and blood smear screening interfaces.
 * Protected routes redirect to /login when unauthenticated.
 */
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public pages — no sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected app pages — with sidebar layout */}
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

        {/* Medical Image Analysis Workspace & Modules */}
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
        <Route
          path="/biological-explorer"
          element={
            <ProtectedRoute>
              <MainLayout><BiologicalExplorerPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <MainLayout><AIBiologyAssistantPage /></MainLayout>
            </ProtectedRoute>
          }
        />
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
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
