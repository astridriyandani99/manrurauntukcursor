import React, { useState } from 'react';
import type { Standard, ElementoPenilaian, User, AssessmentData, AssessmentScore } from '../types';
import { ChevronDownIcon } from './Icons';
import AssessmentPoin from './AssessmentPoin';
import AssessmentSummary from './AssessmentSummary';

interface ContentDisplayProps {
  standard: Standard | null;
  currentUser: User;
  assessmentData: AssessmentData;
  onScoreChange: (poinId: string, role: 'wardStaff' | 'assessor', updates: Partial<AssessmentScore>) => void;
  users: User[];
  isAssessmentActive: boolean;
}

const ElementoPenilaianCard: React.FC<{ 
  element: ElementoPenilaian; 
  currentUser: User;
  assessmentData: AssessmentData;
  onScoreChange: (poinId: string, role: 'wardStaff' | 'assessor', updates: Partial<AssessmentScore>) => void;
  users: User[];
  isAssessmentActive: boolean;
}> = ({ element, currentUser, assessmentData, onScoreChange, users, isAssessmentActive }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open for better usability

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 border border-slate-200">
      <button
        className="w-full p-4 text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-slate-800">{element.title}</h3>
        <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 mb-4 whitespace-pre-wrap">{element.description}</p>
          <div className="space-y-4">
            {element.poin.map(p => (
              <AssessmentPoin
                key={p.id}
                poin={p}
                currentUser={currentUser}
                scoreData={assessmentData[p.id]}
                onScoreChange={onScoreChange}
                users={users}
                isAssessmentActive={isAssessmentActive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ standard, currentUser, assessmentData, onScoreChange, users, isAssessmentActive }) => {
  if (!standard) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">Welcome to MANRURA</h2>
          <p className="text-slate-500">Select a standard from the sidebar to view its details.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{standard.title}</h2>
        <p className="text-slate-600 whitespace-pre-wrap">{standard.description}</p>
      </div>

      <AssessmentSummary standard={standard} assessmentData={assessmentData} />

      <div>
        {standard.elements.map((element) => (
          <ElementoPenilaianCard 
            key={element.id} 
            element={element}
            currentUser={currentUser}
            assessmentData={assessmentData}
            onScoreChange={onScoreChange}
            users={users}
            isAssessmentActive={isAssessmentActive}
           />
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;