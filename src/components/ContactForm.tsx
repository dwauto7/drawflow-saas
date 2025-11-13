import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const formPayload = {
            ...formData,
            access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' // Replace with your actual key
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formPayload)
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', company: '', message: '' });
            } else {
                console.error("Submission error:", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative bg-white py-20 sm:py-28">
            <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50"></div>
            </div>
            <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
                <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-2xl font-extrabold tracking-tight text-brand-blue sm:text-3xl">Get in touch</h2>
                        <p className="mt-3 text-lg leading-6 text-gray-500">
                            Have questions or want a personalized demo? Fill out the form and our team will get back to you shortly.
                        </p>
                    </div>
                </div>
                <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                    <div className="max-w-lg mx-auto lg:max-w-none">
                        {status === 'success' ? (
                             <div className="text-center p-8 border-2 border-dashed border-green-300 bg-green-50 rounded-lg">
                                <h3 className="text-2xl font-bold text-green-700">Thank you!</h3>
                                <p className="mt-2 text-gray-600">Your message has been sent. We'll be in touch soon.</p>
                             </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Full name</label>
                                    <input type="text" name="name" id="name" autoComplete="name" required value={formData.name} onChange={handleChange} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-orange focus:border-brand-orange border-gray-300 rounded-md" placeholder="Full name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-orange focus:border-brand-orange border-gray-300 rounded-md" placeholder="Email" />
                                </div>
                                <div>
                                    <label htmlFor="company" className="sr-only">Company</label>
                                    <input type="text" name="company" id="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-orange focus:border-brand-orange border-gray-300 rounded-md" placeholder="Company" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-orange focus:border-brand-orange border border-gray-300 rounded-md" placeholder="Message"></textarea>
                                </div>
                                <div>
                                    <button type="submit" disabled={status === 'submitting'} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:bg-orange-300 disabled:cursor-not-allowed">
                                        {status === 'submitting' ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                                {status === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
