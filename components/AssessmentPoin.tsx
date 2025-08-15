import React, { useState } from 'react';
import type { PoinPenilaian, User, AssessmentScore, Evidence, AssessmentScores } from '../types';
import { ArrowUpTrayIcon, PaperClipIcon, TrashIcon, PencilIcon, UserCircleIcon, CheckBadgeIcon } from './Icons';
import { uploadFile } from '../services/apiService';

interface AssessmentPoinProps {
  poin: PoinPenilaian;
  currentUser: User;
  scoreData: AssessmentScores | undefined;
  onScoreChange: (poinId: string, role: 'wardStaff' | 'assessor', updates: Partial<AssessmentScore>) => void;
  users: User[];
  isAssessmentActive: boolean;
}

const scoreOptions = [
  { value: 10, label: 'Terpenuhi Lengkap', color: 'bg-green-100 border-green-300 text-green-800', badge: 'bg-green-500' },
  { value: 5, label: 'Terpenuhi Sebagian', color: 'bg-yellow-100 border-yellow-300 text-yellow-800', badge: 'bg-yellow-500' },
  { value: 0, label: 'Tidak Terpenuhi', color: 'bg-red-100 border-red-300 text-red-800', badge: 'bg-red-500' },
];

// --- Helper Components ---

const EvidenceViewer: React.FC<{ evidence: Evidence | null | undefined; onRemove?: () => void; }> = ({ evidence, onRemove }) => {
  if (!evidence) return null;
  return (
    <div className="mt-3 pt-3 border-t border-slate-200">
      <p className="text-sm font-medium text-slate-600 mb-1">Bukti Terlampir:</p>
      <div className="flex items-center justify-between p-2 bg-slate-100 rounded-md border border-slate-200">
        <a href={evidence.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-600 hover:underline text-sm truncate mr-2">
          <PaperClipIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate" title={evidence.name}>{evidence.name}</span>
        </a>
        {onRemove && (
          <button onClick={onRemove} className="flex-shrink-0 text-red-500 hover:text-red-700 p-1 rounded-full transition-colors disabled:text-slate-400 disabled:cursor-not-allowed" aria-label="Remove evidence" disabled={!onRemove}>
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const ResultPanel: React.FC<{ title: string | null, icon: React.ReactNode, assessmentScore: AssessmentScore | undefined | null, assessorName?: string | null }> = ({ title, icon, assessmentScore, assessorName }) => {
  if (!assessmentScore || assessmentScore.score === null || assessmentScore.score === undefined) {
    if (title === null) return null;
    return (
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        {title && <h4 className="font-semibold text-slate-700 text-sm mb-2 flex items-center">{icon}{title}</h4>}
        <div className="py-1 px-3 bg-slate-200 text-slate-600 rounded-full text-xs font-medium inline-block">Belum Dinilai</div>
      </div>
    );
  }
  const scoreInfo = scoreOptions.find(opt => opt.value === assessmentScore.score);
  return (
    <div className={`p-4 rounded-lg border ${scoreInfo?.color ?? 'bg-white border-slate-200'}`}>
      <div className="flex justify-between items-start">
         {title && <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center">{icon}{title}</h4>}
        <div className="flex-shrink-0 ml-4">
          <span className={`px-3 py-1 text-xs font-bold text-white ${scoreInfo?.badge ?? 'bg-slate-500'} rounded-full`}>
            Skor: {assessmentScore.score}
          </span>
        </div>
      </div>
       {assessorName && (
        <p className="text-xs text-slate-500 -mt-2 mb-2">Dinilai oleh: <span className="font-medium text-slate-600">{assessorName}</span></p>
      )}
      {assessmentScore.notes && (
        <div className="mt-2 pt-2 border-t border-slate-300/50">
          <p className="text-sm font-medium text-slate-600">Catatan:</p>
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{assessmentScore.notes}</p>
        </div>
      )}
      <EvidenceViewer evidence={assessmentScore.evidence} />
    </div>
  );
};

const AssessmentEditor: React.FC<{
  poinId: string;
  assessmentScore: AssessmentScore | undefined | null;
  onUpdate: (updates: Partial<AssessmentScore>) => void;
  onCancel?: () => void;
  showFileUpload: boolean;
  currentUser: User;
  disabled: boolean;
}> = ({ poinId, assessmentScore, onUpdate, onCancel, showFileUpload, currentUser, disabled }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const currentScore = assessmentScore?.score ?? null;
    const currentNotes = assessmentScore?.notes ?? '';
    const currentEvidence = assessmentScore?.evidence;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            setUploadError(null);
            try {
                const uploadedEvidence = await uploadFile(file);
                onUpdate({ evidence: uploadedEvidence });
            } catch (error) {
                setUploadError("File upload failed. Please try again.");
                console.error(error);
            } finally {
                setIsUploading(false);
            }
        }
    };
    const handleRemoveFile = () => {
        onUpdate({ evidence: null });
    };

    return (
        <div className={`space-y-4 ${disabled ? 'opacity-60' : ''}`} title={disabled ? 'Penilaian tidak dapat diubah saat ini.' : ''}>
             <fieldset disabled={disabled} className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Skor:</p>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        {scoreOptions.map(opt => (
                        <label key={opt.value} className={`flex-1 p-2 border rounded-md text-center text-sm transition-all duration-200 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${currentScore === opt.value ? `${opt.color} ring-2 ring-sky-500` : 'bg-white hover:bg-slate-50 text-slate-700'}`}>
                            <input
                            type="radio"
                            name={`score-${poinId}-${currentUser.role}`}
                            value={opt.value}
                            checked={currentScore === opt.value}
                            onChange={() => {
                                onUpdate({ score: opt.value });
                                if(onCancel && currentUser.role === 'Assessor') onCancel();
                            }}
                            className="sr-only"
                            />
                            {opt.label} ({opt.value})
                        </label>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Catatan:</p>
                    <textarea
                        value={currentNotes}
                        onChange={(e) => onUpdate({ notes: e.target.value })}
                        placeholder="Tambahkan catatan observasi atau bukti..."
                        className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-sky-500 focus:border-sky-500 bg-white text-slate-800 disabled:bg-slate-100"
                        rows={2}
                    />
                </div>
                <EvidenceViewer evidence={currentEvidence} onRemove={showFileUpload ? handleRemoveFile : undefined} />
                {showFileUpload && (
                    <div>
                        <label htmlFor={`file-upload-${poinId}`} className={`inline-flex items-center px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors ${isUploading || disabled ? 'cursor-not-allowed bg-slate-200' : 'cursor-pointer'}`}>
                            <ArrowUpTrayIcon className={`w-5 h-5 mr-2 text-slate-500 ${isUploading ? 'animate-pulse' : ''}`}/>
                            <span>{isUploading ? 'Uploading...' : (currentEvidence ? 'Ganti Bukti' : 'Unggah Bukti')}</span>
                        </label>
                        <input id={`file-upload-${poinId}`} type="file" className="sr-only" onChange={handleFileChange} disabled={isUploading || disabled} accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"/>
                        <p className="text-xs text-slate-500 mt-1">Dukung penilaian Anda dengan file (Gambar, PDF, Dokumen).</p>
                        {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
                    </div>
                )}
             </fieldset>
             {onCancel && (
                <button onClick={onCancel} className="text-sm text-slate-600 hover:text-slate-800">Batal</button>
            )}
        </div>
    );
}

// --- Main Component ---

const AssessmentPoin: React.FC<AssessmentPoinProps> = ({ poin, currentUser, scoreData, onScoreChange, users, isAssessmentActive }) => {
  const [isEditing, setIsEditing] = useState(false);

  const wardStaffScore = scoreData?.wardStaff;
  const assessorScore = scoreData?.assessor;
  const assessor = assessorScore?.assessorId ? users.find(u => u.id === assessorScore.assessorId) : null;

  const handleUpdate = (role: 'wardStaff' | 'assessor', updates: Partial<AssessmentScore>) => {
    onScoreChange(poin.id, role, updates);
  };
  
  const isLockedForStaff = assessorScore?.score !== null && assessorScore?.score !== undefined;
  const canEdit = isAssessmentActive && !isLockedForStaff;


  const basePoinInfo = (
    <>
      <p className="font-semibold text-sm text-slate-800">{poin.text}</p>
      <p className="text-xs text-slate-500 mt-1 mb-3"><span className="font-medium">Bukti:</span> {poin.bukti}</p>
    </>
  );

  const disabledStateMessage = (() => {
    if (isLockedForStaff) {
      return (
        <div className="p-3 text-sm text-yellow-800 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg" role="alert">
          <p className="font-bold">Terkunci: Telah Divalidasi</p>
          <p>Poin penilaian ini tidak dapat diubah lagi karena telah divalidasi oleh asesor.</p>
        </div>
      );
    }
    if (!isAssessmentActive) {
      return (
        <div className="p-3 text-sm text-orange-800 bg-orange-100 border-l-4 border-orange-500 rounded-r-lg" role="alert">
          <p className="font-bold">Terkunci: Periode Penilaian Tidak Aktif</p>
          <p>Anda hanya dapat mengubah penilaian selama periode penilaian sedang aktif.</p>
        </div>
      );
    }
    return null;
  })();


  switch (currentUser.role) {
    case 'Ward Staff':
      return (
        <div className="p-4 bg-white rounded-lg border border-sky-200 shadow-sm">
            {basePoinInfo}
            {canEdit ? (
                <AssessmentEditor 
                    poinId={poin.id}
                    assessmentScore={wardStaffScore}
                    onUpdate={(updates) => handleUpdate('wardStaff', updates)}
                    showFileUpload={true}
                    currentUser={currentUser}
                    disabled={false}
                />
            ) : (
                 <div className="mt-3 space-y-4">
                    {disabledStateMessage}
                    <ResultPanel title="Penilaian Anda" icon={<UserCircleIcon className="w-5 h-5 mr-2 text-slate-500"/>} assessmentScore={wardStaffScore}/>
                    {assessorScore && <ResultPanel title="Validasi & Catatan Asesor" icon={<CheckBadgeIcon className="w-5 h-5 mr-2 text-indigo-500"/>} assessmentScore={assessorScore} assessorName={assessor?.name}/>}
                 </div>
            )}
        </div>
      );

    case 'Assessor':
      return (
        <div className="p-4 bg-white rounded-lg border border-indigo-200 shadow-sm space-y-4">
           {basePoinInfo}
           <ResultPanel title="Penilaian Staf" icon={<UserCircleIcon className="w-5 h-5 mr-2 text-slate-500"/>} assessmentScore={wardStaffScore}/>
           <div className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-center mb-3">
                     <h4 className="font-semibold text-indigo-800 text-sm flex items-center">
                        <CheckBadgeIcon className="w-5 h-5 mr-2 text-indigo-500"/>Validasi Asesor
                    </h4>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium disabled:text-slate-400 disabled:cursor-not-allowed"
                            disabled={!isAssessmentActive}
                            title={!isAssessmentActive ? "Penilaian hanya bisa dilakukan selama periode aktif" : ""}
                        >
                            <PencilIcon className="w-4 h-4 mr-1"/>
                            {assessorScore?.score !== null && assessorScore?.score !== undefined ? 'Ubah' : 'Nilai'}
                        </button>
                    )}
                </div>
                {isEditing ? (
                     <AssessmentEditor 
                        poinId={poin.id}
                        assessmentScore={assessorScore}
                        onUpdate={(updates) => handleUpdate('assessor', updates)}
                        onCancel={() => setIsEditing(false)}
                        showFileUpload={false}
                        currentUser={currentUser}
                        disabled={!isAssessmentActive}
                    />
                ) : (
                    <ResultPanel title={null} icon={null} assessmentScore={assessorScore} />
                )}
                 {(!isEditing && (assessorScore?.score === null || assessorScore?.score === undefined)) && !isAssessmentActive &&(
                    <p className="text-sm text-slate-500 mt-2">Periode penilaian tidak aktif. Anda tidak dapat memberikan nilai.</p>
                )}
                {(!isEditing && (assessorScore?.score === null || assessorScore?.score === undefined)) && isAssessmentActive && (
                    <p className="text-sm text-slate-500 mt-2">Klik 'Nilai' untuk memberikan validasi.</p>
                )}
           </div>
        </div>
      );

    case 'Admin':
      return (
         <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm space-y-4">
           {basePoinInfo}
           <ResultPanel title="Penilaian Staf" icon={<UserCircleIcon className="w-5 h-5 mr-2 text-slate-500"/>} assessmentScore={wardStaffScore}/>
           <ResultPanel title="Validasi Asesor" icon={<CheckBadgeIcon className="w-5 h-5 mr-2 text-indigo-500"/>} assessmentScore={assessorScore} assessorName={assessor?.name}/>
        </div>
      );

    default:
      return (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          {basePoinInfo}
        </div>
      );
  }
};

export default AssessmentPoin;