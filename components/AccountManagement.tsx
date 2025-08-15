import React, { useState } from 'react';
import type { Ward, User, UserRole } from '../types';
import { BuildingOfficeIcon, UsersIcon } from './Icons';

interface AccountManagementProps {
    wards: Ward[];
    allUsers: User[];
    onAddWard: (name: string) => void;
    onAddUser: (user: User) => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ wards, allUsers, onAddWard, onAddUser }) => {
    const [newWardName, setNewWardName] = useState('');
    
    // State for new user form
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState<UserRole>('Ward Staff');
    const [newUserWardId, setNewUserWardId] = useState(wards.length > 0 ? wards[0].id : '');

    const handleAddWard = (e: React.FormEvent) => {
        e.preventDefault();
        if (newWardName.trim()) {
            onAddWard(newWardName.trim());
            setNewWardName('');
        }
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUserName.trim() && newUserEmail.trim() && newUserPassword.trim()) {
            const newUser: User = {
                id: `user-${Date.now()}`,
                name: newUserName.trim(),
                email: newUserEmail.trim(),
                password: newUserPassword.trim(),
                role: newUserRole,
                ...(newUserRole === 'Ward Staff' && { wardId: newUserWardId })
            };
            onAddUser(newUser);
            // Reset form
            setNewUserName('');
            setNewUserEmail('');
            setNewUserPassword('');
            setNewUserRole('Ward Staff');
        }
    };
    
    const userRoles: UserRole[] = ['Admin', 'Assessor', 'Ward Staff'];

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Management */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <UsersIcon className="w-6 h-6 mr-2 text-sky-600" />
                        User Account Management
                    </h3>
                    
                    {/* Add User Form */}
                    <form onSubmit={handleAddUser} className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <h4 className="font-semibold text-slate-700 mb-3">Create New User</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="Full Name" required className="p-2 border border-slate-300 rounded-md"/>
                            <input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} placeholder="Email Address" required className="p-2 border border-slate-300 rounded-md"/>
                            <input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} placeholder="Initial Password" required className="p-2 border border-slate-300 rounded-md"/>
                            <select value={newUserRole} onChange={e => setNewUserRole(e.target.value as UserRole)} className="p-2 border border-slate-300 rounded-md bg-white">
                                {userRoles.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                            {newUserRole === 'Ward Staff' && (
                                <select value={newUserWardId} onChange={e => setNewUserWardId(e.target.value)} className="p-2 border border-slate-300 rounded-md bg-white md:col-span-2">
                                    {wards.map(ward => <option key={ward.id} value={ward.id}>Assign to {ward.name}</option>)}
                                </select>
                            )}
                        </div>
                        <button type="submit" className="mt-4 w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-slate-400">
                            Add User
                        </button>
                    </form>

                     <h4 className="font-semibold text-slate-700 mb-2">Existing Users</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {allUsers.map(user => (
                            <div key={user.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-slate-800">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-semibold text-sky-800 bg-sky-100 rounded-full">
                                    {user.role}
                                    {user.role === 'Ward Staff' && user.wardId && ` (${wards.find(w=>w.id === user.wardId)?.name})`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Ward Management */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <BuildingOfficeIcon className="w-6 h-6 mr-2 text-sky-600" />
                        Manage Wards
                    </h3>

                    <form onSubmit={handleAddWard} className="mb-6">
                        <label htmlFor="ward-name" className="block text-sm font-medium text-slate-700 mb-1">New Ward Name</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="ward-name"
                                type="text"
                                value={newWardName}
                                onChange={(e) => setNewWardName(e.target.value)}
                                placeholder="e.g., Ruang Anggrek"
                                className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                            />
                            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-slate-400" disabled={!newWardName.trim()}>
                                Add
                            </button>
                        </div>
                    </form>

                    <h4 className="font-semibold text-slate-700 mb-2">Existing Wards</h4>
                    <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {wards.map(ward => (
                            <li key={ward.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm text-slate-800 font-medium">
                                {ward.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AccountManagement;
