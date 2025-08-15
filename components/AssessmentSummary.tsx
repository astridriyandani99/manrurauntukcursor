import React from 'react';
import type { Standard, AssessmentData } from '../types';

interface AssessmentSummaryProps {
  standard: Standard;
  assessmentData: AssessmentData;
}

const AssessmentSummary: React.FC<AssessmentSummaryProps> = ({ standard, assessmentData }) => {
  const allPoinIds = standard.elements.flatMap(el => el.poin.map(p => p.id));
  const totalPoinCount = allPoinIds.length;
  
  if (totalPoinCount === 0) return null;

  // Summary is now based on the ASSESSOR's scores
  const assessedPoinIds = allPoinIds.filter(id => assessmentData[id]?.assessor?.score !== null && assessmentData[id]?.assessor?.score !== undefined);
  
  const currentScore = assessedPoinIds.reduce((sum, id) => sum + (assessmentData[id]?.assessor?.score || 0), 0);
  const maxScore = totalPoinCount * 10;
  const assessedCount = assessedPoinIds.length;
  
  const completionPercentage = totalPoinCount > 0 ? (assessedCount / totalPoinCount) * 100 : 0;
  // The achievement score should be calculated based on points assessed by the assessor
  const maxPossibleScoreForAssessed = assessedCount * 10;
  const scorePercentage = maxPossibleScoreForAssessed > 0 ? (currentScore / maxPossibleScoreForAssessed) * 100 : 0;
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Ringkasan Validasi Asesor</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-sky-600">{`${assessedCount} / ${totalPoinCount}`}</p>
          <p className="text-sm text-slate-500">Poin Tervalidasi</p>
        </div>
        <div>
           <p className="text-2xl font-bold text-sky-600">{`${currentScore} / ${maxScore}`}</p>
           <p className="text-sm text-slate-500">Total Skor (dari maks.)</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-sky-600">{scorePercentage.toFixed(1)}%</p>
          <p className="text-sm text-slate-500">Capaian (dari yang divalidasi)</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-600 mb-1">Progres Validasi</p>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-sky-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSummary;