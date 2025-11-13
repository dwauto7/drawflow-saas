import React, { useState, useEffect } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './lib/supabaseClient';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

type View = 'landing' | 'auth';

const App: React.FC = () => {
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg w-full">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-brand-blue">Configuration Error</h1>
          <p className="mt-2 text-gray-600">
            Supabase client could not be initialized. Please ensure your environment variables are correctly set up.
          </p>
          <div className="mt-4 text-left bg-gray-100 p-4 rounded-md text-sm text-gray-700">
            <p className="font-semibold">Required variables:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><code>SUPABASE_URL</code>: Your project's API URL.</li>
              <li><code>SUPABASE_ANON_KEY</code>: Your project's public anon key.</li>
            </ul>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            This app requires a connection to a Supabase project to function.
          </p>
        </div>
      </div>
    );
  }

  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<View>('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes in authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If user logs out, reset view to the landing page
      if (!session) {
        setView('landing');
      }
    });

    // Clean up the subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-brand-blue">Loading...</div>
      </div>
    );
  }

  if (session) {
    return <Dashboard session={session} />;
  }
  
  if (view === 'auth') {
    return <AuthPage supabaseClient={supabase as SupabaseClient} onBackToHome={() => setView('landing')} />;
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header onLoginClick={() => setView('auth')} />
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