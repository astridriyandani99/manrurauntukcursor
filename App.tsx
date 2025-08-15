import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import AuthenticatedApp from './components/AuthenticatedApp';
import { getAllData } from './services/apiService';
import type { User, Ward, AllAssessments, AssessmentPeriod } from './types';
import PublicLandingPage from './components/PublicLandingPage';

const App: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [allAssessments, setAllAssessments] = useState<AllAssessments>({});
  const [assessmentPeriods, setAssessmentPeriods] = useState<AssessmentPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'landing' | 'login'>('landing');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllData();
        setUsers(data.users || []);
        setWards(data.wards || []);
        setAllAssessments(data.allAssessments || {});
        setAssessmentPeriods(data.assessmentPeriods || []);
      } catch (err) {
        if (err instanceof Error && err.message.includes('CONFIG_ERROR: SCRIPT_URL')) {
            setError(
                'The application is not connected to its backend.\n\n' +
                'To fix this, please follow these steps:\n\n' +
                '1. Open your Google Sheet and go to Extensions > Apps Script.\n' +
                '2. Paste the provided backend code (`kodeappscript.gs`) into the script editor.\n' +
                '3. Run the `setup` function once to initialize your sheet.\n' +
                '4. Click "Deploy" > "New deployment" and configure it as a "Web app" with access for "Anyone".\n' +
                '5. After authorizing, copy the new "Web app URL".\n' +
                '6. Paste this URL into the `SCRIPT_URL` constant inside the `services/apiService.ts` file in your project.'
            );
        } else {
            const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-sky-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-slate-600">Loading Application Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-700">Application Configuration Needed</h1>
          <p className="mt-4 text-slate-700 whitespace-pre-wrap bg-red-100 p-4 rounded-md border border-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (view === 'login') {
      return <LoginScreen users={users} onBack={() => setView('landing')} />;
    }
    return <PublicLandingPage onLoginClick={() => setView('login')} />;
  }

  return (
    <AuthenticatedApp 
      currentUser={currentUser}
      allUsers={users}
      setUsers={setUsers}
      wards={wards}
      setWards={setWards}
      allAssessments={allAssessments}
      setAllAssessments={setAllAssessments}
      assessmentPeriods={assessmentPeriods}
      setAssessmentPeriods={setAssessmentPeriods}
    />
  );
};

export default App;