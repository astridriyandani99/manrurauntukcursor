import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ContentDisplay from './ContentDisplay';
import Chatbot from './Chatbot';
import AdminDashboard from './AdminDashboard';
import { manruraData } from '../data/manruraData';
import type { Standard, User, Ward, AllAssessments, AssessmentScore, AssessmentPeriod } from '../types';
import { ArrowLeftIcon } from './Icons';
import * as api from '../services/apiService';
import { useApiKey } from '../contexts/ApiKeyContext';
import SaveStatusIndicator, { SaveStatus } from './SaveStatusIndicator';


interface AuthenticatedAppProps {
    currentUser: User;
    allUsers: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    wards: Ward[];
    setWards: React.Dispatch<React.SetStateAction<Ward[]>>;
    allAssessments: AllAssessments;
    setAllAssessments: React.Dispatch<React.SetStateAction<AllAssessments>>;
    assessmentPeriods: AssessmentPeriod[];
    setAssessmentPeriods: React.Dispatch<React.SetStateAction<AssessmentPeriod[]>>;
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({
    currentUser,
    allUsers,
    setUsers,
    wards,
    setWards,
    allAssessments,
    setAllAssessments,
    assessmentPeriods,
    setAssessmentPeriods,
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>('bab1');
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(manruraData[0]);
  const { apiKey } = useApiKey();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  
  const initialWardId = currentUser.role === 'Ward Staff' 
    ? currentUser.wardId 
    : (wards.length > 0 ? wards[0].id : '');
  const [selectedWardId, setSelectedWardId] = useState<string>(initialWardId || '');

  const [adminSelectedWardId, setAdminSelectedWardId] = useState<string | null>(null);
  
  // Determine active assessment period
  const now = new Date();
  const activePeriod = assessmentPeriods.find(p => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      end.setHours(23, 59, 59, 999); // Make end date inclusive for the entire day
      return now >= start && now <= end;
  });
  const isAssessmentActive = !!activePeriod;

  useEffect(() => {
    if (currentUser.role !== 'Admin') {
      setAdminSelectedWardId(null);
    }
    if (currentUser.role === 'Ward Staff' && currentUser.wardId) {
        setSelectedWardId(currentUser.wardId);
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (selectedStandardId === 'admin_page') {
        setSelectedStandard(null);
        setAdminSelectedWardId(null);
    } else {
        const newStandard = manruraData.find(std => std.id === selectedStandardId) || null;
        setSelectedStandard(newStandard);
    }
  }, [selectedStandardId]);

  const handleScoreChange = async (poinId: string, role: 'wardStaff' | 'assessor', updates: Partial<AssessmentScore>) => {
    if (!isAssessmentActive && currentUser.role !== 'Admin') {
      // This alert is a fallback, the UI should prevent this action.
      alert("Tidak dapat menyimpan perubahan karena tidak ada periode penilaian yang aktif.");
      return;
    }
    const wardIdToUpdate = adminSelectedWardId && currentUser.role === 'Admin' ? adminSelectedWardId : selectedWardId;
    
    // Optimistically update UI
    setAllAssessments(prev => {
      const currentWardAssessments = prev[wardIdToUpdate] || {};
      const existingPoinAssessment = currentWardAssessments[poinId] || {};
      const existingRoleScore = existingPoinAssessment[role] || { score: null, notes: '', evidence: null };

      const updatedRoleScore = { ...existingRoleScore, ...updates };
      if (role === 'assessor') {
        updatedRoleScore.assessorId = currentUser.id;
      }
      const updatedPoinAssessment = { ...existingPoinAssessment, [role]: updatedRoleScore };

      return {
        ...prev,
        [wardIdToUpdate]: { ...currentWardAssessments, [poinId]: updatedPoinAssessment }
      };
    });

    setSaveStatus('saving');
    try {
        await api.updateAssessment(wardIdToUpdate, poinId, role, {
            ...updates,
            ...(role === 'assessor' && { assessorId: currentUser.id })
        });
        setSaveStatus('success');
    } catch (err) {
        console.error("Failed to update assessment:", err);
        const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
        setSaveStatus({ state: 'error', message: errorMessage });
    } finally {
        setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const addUser = async (user: User) => {
    setUsers(prev => [...prev, user]);
     try {
      await api.addUser(user);
    } catch(err) {
      console.error("Failed to add user:", err);
      setUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };
  
  const addAssessmentPeriod = async (period: Omit<AssessmentPeriod, 'id'>) => {
    try {
      const newPeriod = await api.addAssessmentPeriod(period);
      setAssessmentPeriods(prev => [...prev, newPeriod].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
    } catch (err)
 {
      console.error("Failed to add assessment period:", err);
      // No rollback needed as we only set state on success
    }
  };

    const addWard = async (wardName: string) => {
        const newWard: Ward = {
            id: `ward-${Date.now()}`,
            name: wardName,
        };
        setWards(prev => [...prev, newWard]);
        setSaveStatus('saving');
        try {
            await api.addWard(newWard);
            setSaveStatus('success');
        } catch(err) {
            console.error("Failed to add ward:", err);
            const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
            setSaveStatus({ state: 'error', message: errorMessage });
            setWards(prev => prev.filter(w => w.id !== newWard.id)); // Rollback
        } finally {
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };


  const handleAdminSelectWard = (wardId: string) => {
    setAdminSelectedWardId(wardId);
    if (selectedStandardId === 'admin_page') {
      setSelectedStandardId('bab1');
    }
  };

  const handleReturnToDashboard = () => {
    setSelectedStandardId('admin_page');
  };
  
  const isViewingAsAdminDetail = currentUser.role === 'Admin' && adminSelectedWardId;
  const wardIdForDisplay = isViewingAsAdminDetail ? adminSelectedWardId : selectedWardId;
  const assessmentDataForDisplay = allAssessments[wardIdForDisplay!] || {};
  const adminSelectedWard = adminSelectedWardId ? wards.find(w => w.id === adminSelectedWardId) : null;

  return (
    <div className="flex h-screen font-sans antialiased">
      <Sidebar 
        standards={manruraData}
        selectedStandardId={selectedStandardId}
        setSelectedStandardId={setSelectedStandardId}
        currentUser={currentUser}
        wards={wards}
        selectedWardId={selectedWardId}
        setSelectedWardId={setSelectedWardId}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-100">
        {!isAssessmentActive && currentUser.role !== 'Admin' && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded-r-lg" role="alert">
              <p className="font-bold">Periode Penilaian Tidak Aktif</p>
              <p>Penilaian hanya dapat diubah selama periode aktif. Perubahan yang dibuat saat ini <strong className="underline">tidak akan disimpan</strong>.</p>
            </div>
        )}
        {currentUser.role === 'Admin' && (!adminSelectedWardId || selectedStandardId === 'admin_page') ? (
            <AdminDashboard 
                wards={wards} 
                allUsers={allUsers}
                allAssessments={allAssessments}
                manruraData={manruraData}
                assessmentPeriods={assessmentPeriods}
                onAddWard={addWard}
                onAddUser={addUser}
                onSelectWard={handleAdminSelectWard}
                onAddAssessmentPeriod={addAssessmentPeriod}
            />
        ) : isViewingAsAdminDetail && selectedStandard ? ( // Admin viewing specific ward
            <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-slate-800">
                    Hasil Audit: <span className="text-sky-700">{adminSelectedWard?.name}</span>
                    </h2>
                    <button 
                    onClick={handleReturnToDashboard}
                    className="flex items-center justify-center sm:justify-start px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                    <ArrowLeftIcon className="w-5 h-5 mr-2"/>
                    Kembali ke Dashboard
                    </button>
                </div>
                <ContentDisplay 
                    standard={selectedStandard}
                    currentUser={currentUser}
                    assessmentData={assessmentDataForDisplay}
                    onScoreChange={() => {}} // Read-only for Admin
                    users={allUsers}
                    isAssessmentActive={true} // Admin can always see content as if active
                />
            </div>
        ) : ( // Assessor or Ward Staff view
          <ContentDisplay 
            standard={selectedStandard}
            currentUser={currentUser}
            assessmentData={assessmentDataForDisplay}
            onScoreChange={handleScoreChange}
            users={allUsers}
            isAssessmentActive={isAssessmentActive}
          />
        )}
      </main>
      {apiKey && <Chatbot />}
      <SaveStatusIndicator status={saveStatus} />
    </div>
  );
};

export default AuthenticatedApp;