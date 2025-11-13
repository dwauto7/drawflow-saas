import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
            <a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a>
            <a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a>
            <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2024 DrawFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
