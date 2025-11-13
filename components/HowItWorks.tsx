import React from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UploadIcon />,
      title: '1. Submit Draw Package',
      description: 'Easily upload all your draw documents, invoices, and lien waivers into one secure, centralized location.'
    },
    {
      icon: <CheckCircleIcon />,
      title: '2. Approve & Collaborate',
      description: 'Stakeholders can review, comment, and approve draw requests in real-time, eliminating email chains and delays.'
    },
    {
      icon: <CreditCardIcon />,
      title: '3. Disburse & Pay',
      description: 'Once approved, funds are disbursed quickly and securely. Track every payment and maintain a clear audit trail.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-brand-orange tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-brand-blue tracking-tight sm:text-4xl">
            A Simpler, Faster Draw Process
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get your projects funded in three simple steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-orange/10 mx-auto">
                    <div className="text-brand-orange">
                        {step.icon}
                    </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-brand-blue">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
