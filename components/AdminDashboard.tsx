import React, { useState } from 'react';
import type { Ward, User, AllAssessments, Standard, AssessmentPeriod } from '../types';
import { BuildingOfficeIcon, UsersIcon, ChartBarSquareIcon, EyeIcon, SparklesIcon, XMarkIcon, Cog6ToothIcon, PresentationChartLineIcon } from './Icons';
import AccountManagement from './AccountManagement';
import AssessmentPeriodManagement from './AssessmentPeriodManagement';
import { useApiKey } from '../contexts/ApiKeyContext';
import { generateAssessmentAnalysis } from '../services/geminiService';
import ReportingDashboard from './ReportingDashboard';

interface AdminDashboardProps {
    wards: Ward[];
    allUsers: User[];
    allAssessments: AllAssessments;
    manruraData: Standard[];
    assessmentPeriods: AssessmentPeriod[];
    onAddWard: (name: string) => void;
    onAddUser: (user: User) => void;
    onSelectWard: (wardId: string) => void;
    onAddAssessmentPeriod: (period: Omit<AssessmentPeriod, 'id'>) => void;
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="flex items-center gap-3">
        <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
            className="bg-sky-600 h-2.5 rounded-full" 
            style={{ width: `${value}%` }}
            title={`${value.toFixed(1)}%`}
        ></div>
        </div>
        <span className="text-sm font-medium text-slate-600 w-12 text-right">{value.toFixed(1)}%</span>
    </div>
);

const ApiKeyManager: React.FC = () => {
    const { apiKey, setApiKey } = useApiKey();
    const [keyInput, setKeyInput] = useState('');
    const [saveMessage, setSaveMessage] = useState('');

    const handleSave = () => {
        setApiKey(keyInput);
        setSaveMessage('API Key saved successfully!');
        setKeyInput('');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-sky-600" />
                Konfigurasi AI & Laporan
            </h3>
            <div className="space-y-2">
                <label htmlFor="api-key" className="block text-sm font-medium text-slate-700">Gemini API Key</label>
                <div className="flex items-center gap-2">
                     <input
                        id="api-key"
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Masukkan API Key Anda di sini"
                        className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    />
                    <button onClick={handleSave} className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-slate-400" disabled={!keyInput.trim()}>
                        Simpan
                    </button>
                </div>
                 <p className="text-xs text-slate-500">
                    {apiKey ? `API Key sudah tersimpan. Masukkan yang baru untuk menimpanya.` : `API Key dibutuhkan untuk fitur Analisis AI dan Chatbot.`}
                </p>
                {saveMessage && <p className="text-sm text-green-600">{saveMessage}</p>}
            </div>
        </div>
    );
}

const AnalysisModal: React.FC<{
    isOpen: boolean,
    onClose: () => void,
    isLoading: boolean,
    analysisResult: string,
    wardName: string,
}> = ({ isOpen, onClose, isLoading, analysisResult, wardName }) => {
    if (!isOpen) return null;

    const formattedAnalysis = () => {
        if (!analysisResult) return '';
        const processedResult = analysisResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return processedResult
            .split('\n')
            .map(line => {
                if (line.startsWith('## ')) {
                    return `<h3 class="text-lg font-semibold text-slate-800 mt-4 mb-2">${line.substring(3)}</h3>`;
                }
                if (line.trim() === '') {
                    return ''; // Don't create empty paragraphs
                }
                if (line.trim().startsWith('- ')) {
                    return `<p class="ml-4">&bull; ${line.trim().substring(2)}</p>`;
                }
                return `<p>${line}</p>`;
            })
            .join('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800">Analisis AI untuk {wardName}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    {isLoading ? (
                         <div className="text-center">
                            <SparklesIcon className="w-12 h-12 text-sky-500 animate-pulse mx-auto" />
                            <p className="mt-4 text-slate-600">AI sedang menganalisis data penilaian... Ini mungkin memakan waktu sejenak.</p>
                        </div>
                    ) : (
                        <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formattedAnalysis() }} />
                    )}
                </main>
                 <footer className="p-4 border-t border-slate-200 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700">
                        Tutup
                    </button>
                </footer>
            </div>
        </div>
    );
};

const AuditSummaryView: React.FC<Pick<AdminDashboardProps, 'wards' | 'allAssessments' | 'manruraData' | 'onSelectWard'>> = ({
    wards, allAssessments, manruraData, onSelectWard
}) => {
    const { apiKey } = useApiKey();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWardForAnalysis, setSelectedWardForAnalysis] = useState<{id: string, name: string} | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const allPoinIds = manruraData.flatMap(std => std.elements.flatMap(el => el.poin.map(p => p.id)));
    const totalPoinCountInStandard = allPoinIds.length;
    
    const handleAnalyze = async (wardId: string, wardName: string) => {
        if (!apiKey) {
            alert("Silakan masukkan API Key di menu Konfigurasi AI untuk menggunakan fitur ini.");
            return;
        }
        setSelectedWardForAnalysis({id: wardId, name: wardName});
        setIsModalOpen(true);
        setIsAnalyzing(true);
        setAnalysisResult('');

        try {
            const result = await generateAssessmentAnalysis(apiKey, wardName, allAssessments[wardId] || {}, manruraData);
            setAnalysisResult(result);
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan yang tidak diketahui.";
            setAnalysisResult(`### Terjadi Kesalahan\n\nAnalisis gagal dibuat. Pastikan API Key Anda valid dan coba lagi.\n\n**Detail Error:**\n${errorMessage}`);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const wardSummaries = wards.map(ward => {
        const assessmentData = allAssessments[ward.id] || {};
        const assessedPoin = allPoinIds.filter(id => assessmentData[id]?.assessor?.score !== null && assessmentData[id]?.assessor?.score !== undefined);
        
        const currentScore = assessedPoin.reduce((sum, id) => sum + (assessmentData[id]?.assessor?.score || 0), 0);
        const maxScore = totalPoinCountInStandard * 10;
        const progress = totalPoinCountInStandard > 0 ? (assessedPoin.length / totalPoinCountInStandard) * 100 : 0;
        
        return { id: ward.id, name: ward.name, score: currentScore, maxScore: maxScore, progress: progress };
    });

     return (
        <div className="space-y-8">
            <AnalysisModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isLoading={isAnalyzing}
                analysisResult={analysisResult}
                wardName={selectedWardForAnalysis?.name || ''}
            />
             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Ringkasan Performa Ruangan</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nama Ruangan</th>
                                <th scope="col" className="px-6 py-3">Progres Validasi</th>
                                <th scope="col" className="px-6 py-3">Total Skor</th>
                                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wardSummaries.map(summary => (
                                <tr key={summary.id} className="bg-white border-b hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {summary.name}
                                    </th>
                                    <td className="px-6 py-4">
                                       <ProgressBar value={summary.progress} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-800">{summary.score}</span>
                                        <span className="text-slate-500"> / {summary.maxScore}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleAnalyze(summary.id, summary.name)}
                                                className="font-medium text-sky-600 hover:text-sky-800 flex items-center disabled:text-slate-400 disabled:cursor-not-allowed"
                                                title={apiKey ? `Analisis ${summary.name} dengan AI` : "Masukkan API Key untuk mengaktifkan fitur ini"}
                                                disabled={!apiKey}
                                            >
                                                <SparklesIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => onSelectWard(summary.id)}
                                                className="font-medium text-slate-600 hover:text-slate-800 flex items-center"
                                                aria-label={`View details for ${summary.name}`}
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const ManagementView: React.FC<Pick<AdminDashboardProps, 'wards' | 'allUsers' | 'assessmentPeriods' | 'onAddWard' | 'onAddUser' | 'onAddAssessmentPeriod'>> = (props) => (
    <div className="space-y-8">
        <ApiKeyManager />
        <AssessmentPeriodManagement 
            periods={props.assessmentPeriods}
            onAddPeriod={props.onAddAssessmentPeriod}
        />
        <AccountManagement 
            wards={props.wards} 
            allUsers={props.allUsers}
            onAddWard={props.onAddWard}
            onAddUser={props.onAddUser}
        />
    </div>
);


const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
    const [activeTab, setActiveTab] = useState('reports');

    const getTabClassName = (tabName: string) => {
        const baseClasses = "flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-t-lg transition-colors";
        if (activeTab === tabName) {
            return `${baseClasses} text-sky-600 border-b-2 border-sky-600 bg-sky-50`;
        }
        return `${baseClasses} text-slate-500 hover:text-slate-700 hover:bg-slate-100`;
    };
    
    return (
        <div>
            <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Dashboard</h2>
                <p className="text-slate-600">Laporan performa, ringkasan audit, dan manajemen sistem.</p>
            </div>
            
             <div className="mb-6 border-b border-slate-200">
                <nav className="-mb-px flex space-x-2 sm:space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('reports')} className={getTabClassName('reports')}>
                        <PresentationChartLineIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Dashboard Laporan</span>
                        <span className="sm:hidden">Laporan</span>
                    </button>
                    <button onClick={() => setActiveTab('summary')} className={getTabClassName('summary')}>
                        <EyeIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Ringkasan Audit</span>
                        <span className="sm:hidden">Audit</span>
                    </button>
                    <button onClick={() => setActiveTab('management')} className={getTabClassName('management')}>
                        <Cog6ToothIcon className="w-5 h-5" />
                         <span className="hidden sm:inline">Manajemen Sistem</span>
                         <span className="sm:hidden">Sistem</span>
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'reports' && <ReportingDashboard {...props} />}
                {activeTab === 'summary' && <AuditSummaryView {...props} />}
                {activeTab === 'management' && <ManagementView {...props} />}
            </div>
        </div>
    );
};

export default AdminDashboard;