import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';
import { PreferencesProvider } from './context/PreferencesContext';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <ActivityProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ActivityProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
