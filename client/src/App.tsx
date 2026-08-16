import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ThreatIntelligenceSection } from './components/ThreatIntelligenceSection';
import { InteractiveScanSection } from './components/InteractiveScanSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { CtaBannerSection } from './components/CtaBannerSection';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import { LogoutModal } from './components/LogoutModal';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PricingPage } from './pages/PricingPage';
import { SettingsPage } from './pages/SettingsPage';
import { SupportPage } from './pages/SupportPage';

const TOKEN_KEY = 'breachalert_token';

function getInitialToken(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('token') || localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
}

// Landing Page Component
const LandingPage: React.FC<{ token: string | null; onLogoutClick: () => void }> = ({ token, onLogoutClick }) => {
  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#FF6A2A] selection:text-black bg-noise relative overflow-x-hidden">
      <Navbar token={token} onLogoutClick={onLogoutClick} />
      <main>
        <Hero token={token} />
        <FeaturesSection />
        <HowItWorksSection />
        <ThreatIntelligenceSection />
        <InteractiveScanSection />
        <PricingSection />
        <FaqSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  );
};

export const AppContent: React.FC = () => {
  const [token, setToken] = useState<string | null>(getInitialToken);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken);
      window.history.replaceState({}, '', window.location.pathname);
      setToken(urlToken);
    }
  }, []);

  const handleLogin = (newToken: string, remember = false) => {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, newToken);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, newToken);
      localStorage.removeItem(TOKEN_KEY);
    }
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage token={token} onLogoutClick={() => setLogoutModalOpen(true)} />} 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            token ? (
              <Dashboard token={token} onLogout={() => setLogoutModalOpen(true)} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route 
          path="/settings" 
          element={
            token ? (
              <SettingsPage token={token} onLogout={() => setLogoutModalOpen(true)} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;
