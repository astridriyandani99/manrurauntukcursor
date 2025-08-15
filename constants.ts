import type { Ward, User } from './types';

export const APP_TITLE = "MANRURA Digital Guide";
export const GEMINI_MODEL = "gemini-2.5-flash";

export const WARDS: Ward[] = [
    { id: 'mawar', name: 'Ruang Mawar' },
    { id: 'melati', name: 'Ruang Melati' },
    { id: 'bougenville', name: 'Ruang Bougenville' },
    { id: 'icu', name: 'Ruang ICU' },
];

export const INITIAL_USERS: User[] = [
    { 
        id: 'admin-1', 
        name: 'Admin Utama', 
        email: 'admin@rskariadi.co.id', 
        password: 'password123',
        role: 'Admin'
    },
    { 
        id: 'assessor-1', 
        name: 'Dr. Budi Santoso', 
        email: 'budi.s@rskariadi.co.id', 
        password: 'password123',
        role: 'Assessor' 
    },
     { 
        id: 'assessor-2', 
        name: 'Siti Aminah, S.Kep., Ns.', 
        email: 'siti.a@rskariadi.co.id',
        password: 'password123',
        role: 'Assessor' 
    },
    { 
        id: 'staff-1', 
        name: 'Perawat Ani', 
        email: 'ani.perawat@rskariadi.co.id',
        password: 'password123',
        role: 'Ward Staff',
        wardId: 'mawar' // Assigned to Ruang Mawar
    },
     { 
        id: 'staff-2', 
        name: 'Perawat Bayu', 
        email: 'bayu.perawat@rskariadi.co.id',
        password: 'password123',
        role: 'Ward Staff',
        wardId: 'melati' // Assigned to Ruang Melati
    }
];
