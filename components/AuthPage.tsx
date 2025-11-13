import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';

interface AuthPageProps {
  supabaseClient: SupabaseClient;
  onBackToHome: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ supabaseClient, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button onClick={onBackToHome} className="flex items-center justify-center mx-auto space-x-2" aria-label="Go to homepage">
            <svg className="h-10 w-auto text-brand-blue" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V13H16V11H13V8H11V11H8V13H11V16Z"/>
            </svg>
            <span className="text-3xl font-bold text-brand-blue">DrawFlow</span>
        </button>
        <h2 className="mt-6 text-2xl font-bold text-brand-blue">
          Contractor Portal
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <Auth
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#F97316', // brand-orange for buttons
                                brandAccent: '#F97316',
                            },
                            radii: {
                                buttonBorderRadius: '0.375rem', // rounded-md
                                inputBorderRadius: '0.375rem',
                            }
                        },
                    },
                }}
                providers={['google', 'github']}
                theme="light"
                view="sign_in"
            />
             <div className="mt-6 text-center">
             <button onClick={onBackToHome} className="text-sm text-brand-blue hover:underline">
                &larr; Back to Home
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
