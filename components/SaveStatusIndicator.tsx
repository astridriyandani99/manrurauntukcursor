import React from 'react';

// Spinner Icon for loading state
const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// Check Icon for success state
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// Exclamation Triangle Icon for error state
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export type SaveStatus = 'idle' | 'saving' | 'success' | { state: 'error'; message: string };

interface SaveStatusIndicatorProps {
    status: SaveStatus;
}

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({ status }) => {
    if (status === 'idle') {
        return null;
    }

    let icon: React.ReactNode;
    let text: string;
    let bgColor: string;
    let message: string | null = null;

    if (status === 'saving') {
        icon = <SpinnerIcon className="w-5 h-5 text-slate-600" />;
        text = 'Menyimpan...';
        bgColor = 'bg-slate-200 border-slate-300';
    } else if (status === 'success') {
        icon = <CheckIcon className="w-5 h-5 text-green-600" />;
        text = 'Tersimpan';
        bgColor = 'bg-green-100 border-green-200';
    } else { // Error state
        icon = <ErrorIcon className="w-5 h-5 text-red-600" />;
        text = 'Gagal Menyimpan';
        bgColor = 'bg-red-100 border-red-200';
        message = status.message; // Display the detailed message directly
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-md z-50 transition-opacity duration-300">
            <div className={`flex items-start gap-3 p-3 rounded-lg shadow-lg text-sm border ${bgColor}`}>
                <div className="flex-shrink-0 mt-0.5">{icon}</div>
                <div>
                    <p className="font-semibold text-slate-800">{text}</p>
                    {message && <p className="text-xs text-slate-700 mt-1">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SaveStatusIndicator;