import React, { useState } from 'react';
import { manruraData } from '../data/manruraData';
import type { Standard, ElementoPenilaian } from '../types';
import { APP_TITLE } from '../constants';
import { ChevronDownIcon, ArrowRightOnRectangleIcon } from './Icons';

interface PublicLandingPageProps {
  onLoginClick: () => void;
}

const ElementoCard: React.FC<{ element: ElementoPenilaian }> = ({ element }) => (
  <div className="border-t border-slate-200">
    <div className="p-4">
      <h4 className="font-semibold text-md text-slate-800">{element.title}</h4>
      <p className="text-sm text-slate-600 mt-1 mb-3 whitespace-pre-wrap">{element.description}</p>
      <div className="space-y-2">
        {element.poin.map(p => (
          <div key={p.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">
            <p className="text-slate-700">{p.text}</p>
            <p className="text-xs text-slate-500 mt-1"><span className="font-medium">Bukti:</span> {p.bukti}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const StandardCard: React.FC<{ standard: Standard }> = ({ standard }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 border border-slate-200 overflow-hidden">
      <button
        className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div>
            <h3 className="text-xl font-bold text-slate-800">{standard.shortTitle}</h3>
            <p className="text-md font-semibold text-sky-700">{standard.title}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="bg-white">
          <div className="px-4 pb-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mt-4 whitespace-pre-wrap">{standard.description}</p>
          </div>
          <div className="space-y-0">
            {standard.elements.map(element => (
              <ElementoCard key={element.id} element={element} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const PublicLandingPage: React.FC<PublicLandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-slate-800">{APP_TITLE}</h1>
                <button 
                    onClick={onLoginClick}
                    className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors text-sm font-medium"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 transform rotate-180"/>
                    Login
                </button>
            </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Selamat Datang di Panduan Digital MANRURA</h2>
            <p className="mt-2 text-lg text-slate-600">Jelajahi Standar Manajemen Ruang Rawat RSUP Dr. Kariadi.</p>
        </div>
        
        <div className="space-y-4">
            {manruraData.map(standard => (
                <StandardCard key={standard.id} standard={standard} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default PublicLandingPage;
