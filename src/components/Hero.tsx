import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-blue sm:text-5xl lg:text-6xl">
          Automate Construction Draw Management - Save 10+ Hours Monthly
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
          DrawFlow streamlines your entire draw process, from submission to payment. Eliminate tedious paperwork, reduce approval times, and gain financial clarity on every project.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-orange-600 transition-transform transform hover:scale-105"
            >
              Get Started for Free
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-gray-200 hover:bg-gray-300"
            >
              Watch a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
