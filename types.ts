export interface PoinPenilaian {
  id: string;
  text: string;
  bukti: string;
}

export interface ElementoPenilaian {
  id:string;
  title: string;
  description: string;
  poin: PoinPenilaian[];
}

export interface Standard {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  elements: ElementoPenilaian[];
}

export type UserRole = 'Assessor' | 'Ward Staff' | 'Admin';

export interface Evidence {
  name: string;
  url: string; // Permanent Google Drive URL
  type: string;
  fileId: string; // Google Drive File ID
}

export interface AssessmentScore {
  score: number | null;
  notes: string;
  evidence?: Evidence | null;
  assessorId?: string; // ID of the user (assessor) who gave the score
}

export interface AssessmentScores {
  wardStaff?: AssessmentScore;
  assessor?: AssessmentScore;
}

export type AssessmentData = Record<string, AssessmentScores>; // Keyed by PoinPenilaian ID

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export interface Ward {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Password is required but optional here for displaying user info without it
  role: UserRole;
  wardId?: string; // Only for 'Ward Staff' role
}

export interface AssessmentPeriod {
  id: string;
  name: string;
  startDate: string; // ISO string format
  endDate: string;   // ISO string format
}


export type AllAssessments = Record<string, AssessmentData>; // Keyed by Ward ID