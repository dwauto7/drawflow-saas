import React from 'react';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-brand-orange tracking-wide uppercase">Pricing</h2>
                    <p className="mt-2 text-3xl font-extrabold text-brand-blue tracking-tight sm:text-4xl">
                        Plans for Every Team Size
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Choose the plan that's right for your business. No hidden fees, ever.
                    </p>
                </div>
                <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Starter Plan */}
                    <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
                        <h3 className="text-2xl font-semibold text-gray-900">Starter</h3>
                        <p className="mt-2 text-gray-500">For small teams and single projects.</p>
                        <div className="mt-6">
                            <p className="text-5xl font-extrabold text-gray-900">$497</p>
                            <p className="text-base font-medium text-gray-500">per month</p>
                        </div>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-gray-700">Up to 3 active projects</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-gray-700">Unlimited users</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-gray-700">Standard support</p>
                            </li>
                        </ul>
                        <div className="mt-auto pt-8">
                           <a href="#contact" className="block w-full bg-brand-orange border border-transparent rounded-md py-3 text-base font-semibold text-white text-center hover:bg-orange-600">
                                Choose Starter
                            </a>
                        </div>
                    </div>

                    {/* Growth Plan */}
                    <div className="relative p-8 bg-brand-blue border border-brand-blue rounded-2xl shadow-lg flex flex-col h-full">
                        <div className="absolute top-0 right-0 pt-4 pr-4">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-brand-cyan text-brand-blue">
                                Most Popular
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Growth</h3>
                        <p className="mt-2 text-blue-200">For growing businesses and multiple projects.</p>
                        <div className="mt-6">
                            <p className="text-5xl font-extrabold text-white">$997</p>
                            <p className="text-base font-medium text-blue-200">per month</p>
                        </div>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-blue-100">Unlimited projects</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-blue-100">Unlimited users</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-blue-100">Priority support</p>
                            </li>
                             <li className="flex items-start">
                                <div className="flex-shrink-0"><CheckIcon /></div>
                                <p className="ml-3 text-base text-blue-100">Advanced reporting</p>
                            </li>
                        </ul>
                         <div className="mt-auto pt-8">
                            <a href="#contact" className="block w-full bg-brand-cyan border border-transparent rounded-md py-3 text-base font-semibold text-brand-blue text-center hover:bg-cyan-400">
                                Choose Growth
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
