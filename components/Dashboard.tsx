import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface DashboardProps {
  session: Session;
}

interface Draw {
  id: number;
  project: string;
  date: string;
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  attachmentName?: string;
}

const initialDraws: Draw[] = [
    { id: 3, project: 'Main Street Tower', date: '2024-07-15', amount: 75000, description: 'MEP Rough-in', status: 'Approved', attachmentName: 'MEP-invoices.pdf' },
    { id: 2, project: 'Oakridge Estates', date: '2024-07-12', amount: 120000, description: 'Framing & Drywall', status: 'Approved' },
    { id: 1, project: 'Main Street Tower', date: '2024-06-28', amount: 50000, description: 'Foundation & Site Work', status: 'Rejected', attachmentName: 'site-work-receipts.zip' },
];

const projects = ['Main Street Tower', 'Oakridge Estates', 'Riverfront Lofts'];

const StatusBadge: React.FC<{ status: Draw['status'] }> = ({ status }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusClasses = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const Dashboard: React.FC<DashboardProps> = ({ session }) => {
    const [draws, setDraws] = useState<Draw[]>(initialDraws);
    const [newDraw, setNewDraw] = useState({ project: projects[0], amount: '', description: '', attachment: null as File | null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === 'attachment' && files) {
            setNewDraw(prev => ({ ...prev, attachment: files[0] || null }));
        } else {
            setNewDraw(prev => ({ ...prev, [name]: value }));
        }
    };

   const handleSubmitDraw = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. Submit to n8n webhook
    const response = await fetch('https://n8n.aiblizzard.work/webhook/Draw-Submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_name: newDraw.project, // Use project name instead of ID
        amount: parseFloat(newDraw.amount),
        description: newDraw.description,
        submitted_by: session.user.email,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit draw');
    }

    // 2. Add to local state for immediate UI update
    const submittedDraw: Draw = {
      id: draws.length > 0 ? Math.max(...draws.map(d => d.id)) + 1 : 1,
      project: newDraw.project,
      amount: parseFloat(newDraw.amount),
      description: newDraw.description,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      attachmentName: newDraw.attachment?.name,
    };

    setDraws(prev => [submittedDraw, ...prev]);
    setNewDraw({ project: projects[0], amount: '', description: '', attachment: null });
    (e.target as HTMLFormElement).reset();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

  } catch (error) {
    console.error('Error submitting draw:', error);
    alert('Error submitting draw. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
        };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 flex items-center space-x-2">
                           <svg className="h-8 w-auto text-brand-blue" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V13H16V11H13V8H11V11H8V13H11V16Z"/></svg>
                           <span className="text-2xl font-bold text-brand-blue">DrawFlow</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 hidden sm:block">Welcome, {session.user.email}</span>
                            <button
                              onClick={handleLogout}
                              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
                            >
                              Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* New Draw Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-brand-blue">Submit New Draw Request</h2>
                                <form onSubmit={handleSubmitDraw} className="mt-6 space-y-4">
                                     <div>
                                        <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project</label>
                                        <select id="project" name="project" value={newDraw.project} onChange={handleInputChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm rounded-md">
                                            {projects.map(p => <option key={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Draw Amount</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input type="number" name="amount" id="amount" value={newDraw.amount} onChange={handleInputChange} required className="focus:ring-brand-orange focus:border-brand-orange block w-full pl-7 pr-2 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                                        </div>
                                    </div>
                                     <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea id="description" name="description" rows={3} required value={newDraw.description} onChange={handleInputChange} className="mt-1 shadow-sm focus:ring-brand-orange focus:border-brand-orange block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="e.g., Materials for Phase 2"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">Attach Documents</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label htmlFor="attachment" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-orange hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-orange">
                                                        <span>Upload a file</span>
                                                        <input id="attachment" name="attachment" type="file" className="sr-only" onChange={handleInputChange} />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, PNG, JPG, ZIP up to 10MB</p>
                                                {newDraw.attachment && <p className="text-sm text-green-600 mt-2 truncate">{newDraw.attachment.name}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:bg-orange-300 disabled:cursor-not-allowed">
                                            {isSubmitting ? 'Submitting...' : 'Submit Draw'}
                                        </button>
                                        {showSuccess && <p className="text-sm text-green-600 mt-2 text-center">Draw submitted successfully!</p>}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Draw Status */}
                        <div className="lg:col-span-2">
                           <div className="bg-white rounded-lg shadow">
                             <h2 className="text-xl font-semibold text-brand-blue p-6">Draw Status</h2>
                             <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project & Description</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {draws.map((draw) => (
                                            <tr key={draw.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{draw.project}</div>
                                                    <div className="text-sm text-gray-500">{draw.description}</div>
                                                     {draw.attachmentName && (
                                                        <div className="mt-1 flex items-center text-sm text-gray-500 hover:text-gray-900">
                                                            <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                                            </svg>
                                                            <a href="#" className="truncate" title={draw.attachmentName}>{draw.attachmentName}</a>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{draw.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${draw.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={draw.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                           </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
