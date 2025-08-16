import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole, Ward } from '../types';
import { Cog6ToothIcon, UsersIcon } from './Icons';

interface UserRoleSwitcherProps {
    wards: Ward[];
}

const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ wards }) => {
    const { currentUser, switchUserRole } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!currentUser) return null;

    const roles: UserRole[] = ['Admin', 'Assessor', 'Ward Staff'];

    const handleRoleChange = (role: UserRole) => {
        if (role === 'Ward Staff') {
            // Default to the first ward if the current user doesn't have one
            const targetWardId = currentUser.wardId || (wards.length > 0 ? wards[0].id : undefined);
            switchUserRole(role, targetWardId);
        } else {
            switchUserRole(role);
        }
    };
    
    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (currentUser.role === 'Ward Staff') {
            switchUserRole('Ward Staff', e.target.value);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 bg-yellow-500 text-slate-800 rounded-full p-3 shadow-lg hover:bg-yellow-400 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 z-50"
                title="Switch User Role (Dev Tool)"
                aria-label="Switch User Role"
            >
                <Cog6ToothIcon className="w-8 h-8"/>
            </button>

            {isOpen && (
                 <div className="fixed bottom-24 left-6 w-full max-w-xs bg-white rounded-lg shadow-2xl flex flex-col border border-slate-200 z-50">
                    <header className="bg-slate-800 text-white p-3 rounded-t-lg">
                        <h3 className="text-md font-semibold flex items-center gap-2">
                           <UsersIcon className="w-5 h-5" />
                           Switch User Role
                        </h3>
                         <p className="text-xs text-slate-400">For demonstration purposes</p>
                    </header>
                    <div className="p-4 space-y-3">
                        <div className="flex flex-col space-y-2">
                           {roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => handleRoleChange(role)}
                                    className={`w-full px-3 py-2 text-sm text-left font-medium rounded-md transition-colors ${
                                        currentUser.role === role
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                                    }`}
                                >
                                    Switch to {role}
                                </button>
                           ))}
                        </div>
                        {currentUser.role === 'Ward Staff' && (
                            <div className="pt-3 border-t border-slate-200">
                                <label htmlFor="ward-switcher" className="block text-sm font-medium text-slate-700 mb-1">
                                    Assigned Ward
                                </label>
                                <select
                                    id="ward-switcher"
                                    value={currentUser.wardId || ''}
                                    onChange={handleWardChange}
                                    className="w-full p-2 bg-white text-slate-800 rounded-md border border-slate-300 focus:ring-sky-500 focus:border-sky-500 text-sm"
                                    disabled={wards.length === 0}
                                >
                                    {wards.length > 0 ? wards.map(ward => (
                                        <option key={ward.id} value={ward.id}>{ward.name}</option>
                                    )) : (
                                        <option>No wards available</option>
                                    )}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserRoleSwitcher;
