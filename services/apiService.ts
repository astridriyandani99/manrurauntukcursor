import type { User, Ward, AllAssessments, AssessmentScore, Evidence, AssessmentPeriod } from '../types';

// =====================================================================================
// !! PENTING !! - URL APLIKASI WEB ANDA TELAH DITEMPELKAN DI SINI
// =====================================================================================
// URL ini menghubungkan aplikasi frontend ke backend Google Apps Script Anda.
// Pastikan skrip Anda di-deploy sebagai "Web app" dengan akses "Anyone".
// =====================================================================================
const SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbwouz8XWBmY3YNe9nxqz75dcS5bhxlx65W1hFbFMp3nKfa0Dc1YMxlV4B2AiCDr4X-q6Q/exec';


interface ApiResponse {
    success: boolean;
    data?: any;
    message?: string;
    stack?: string;
}

async function apiRequest(action: string, payload: any = {}): Promise<any> {
    if (SCRIPT_URL === 'PASTE_YOUR_FINAL_DEPLOYED_WEB_APP_URL_HERE' || !SCRIPT_URL) {
        // This specific error message is caught by App.tsx to display a helpful guide.
        throw new Error('CONFIG_ERROR: SCRIPT_URL is not set.');
    }

    const options: RequestInit = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script simple POST
        },
        body: JSON.stringify({ action, payload }),
    };

    try {
        const response = await fetch(SCRIPT_URL, options);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
        }
        const result: ApiResponse = await response.json();
        
        if (!result.success) {
            console.error('API Error:', result.message, result.stack);
            throw new Error(result.message || 'An unknown API error occurred.');
        }
        return result.data;

    } catch (error) {
        console.error(`Error during POST request for action "${action}":`, error);
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
             throw new Error('A network error occurred. This is likely a CORS issue or a problem with the API script. Please ensure the Google Apps Script is deployed correctly with "Anyone" access and that the SCRIPT_URL is correct.');
        }
        throw error;
    }
}

// --- Public API Functions ---

export const getAllData = async (): Promise<{ users: User[], wards: Ward[], allAssessments: AllAssessments, assessmentPeriods: AssessmentPeriod[] }> => {
    return apiRequest('getAllData');
};

export const addUser = async (user: User): Promise<User> => {
    return apiRequest('addUser', user);
};

export const addWard = async (ward: Omit<Ward, 'id'> & { id?: string }): Promise<Ward> => {
    return apiRequest('addWard', ward);
};

export const addAssessmentPeriod = async (period: Omit<AssessmentPeriod, 'id'>): Promise<AssessmentPeriod> => {
    return apiRequest('addAssessmentPeriod', period);
};

export const updateAssessment = async (
    wardId: string, 
    poinId: string, 
    role: 'wardStaff' | 'assessor', 
    updates: Partial<AssessmentScore>
): Promise<any> => {
    // The component is responsible for adding assessorId, but we ensure it's passed.
    return apiRequest('updateAssessment', { wardId, poinId, role, updates });
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const uploadFile = async (file: File): Promise<Evidence> => {
    const fileData = await fileToBase64(file);
    const payload = {
        fileData,
        fileName: file.name,
        mimeType: file.type,
    };
    return apiRequest('uploadFile', payload);
};