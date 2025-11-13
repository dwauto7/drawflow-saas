import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

type View = 'landing' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');

  const handleLoginClick = () => setView('login');
  const handleLoginSuccess = () => setView('dashboard');
  const handleLogout = () => setView('landing');

  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBackToHome={() => setView('landing')} />;
  }
  
  if (view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header onLoginClick={handleLoginClick} />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
