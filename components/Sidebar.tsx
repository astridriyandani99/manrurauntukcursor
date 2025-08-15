import React from 'react';
import type { Standard, User, Ward } from '../types';
import { APP_TITLE } from '../constants';
import WardSelector from './WardSelector';
import { Cog6ToothIcon, UserCircleIcon, ArrowRightOnRectangleIcon, BuildingOfficeIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  standards: Standard[];
  selectedStandardId: string;
  setSelectedStandardId: (id: string) => void;
  currentUser: User;
  wards: Ward[];
  selectedWardId: string;
  setSelectedWardId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  standards, 
  selectedStandardId, 
  setSelectedStandardId,
  currentUser,
  wards, 
  selectedWardId, 
  setSelectedWardId,
}) => {
  const { logout } = useAuth();
  const isAdminView = selectedStandardId === 'admin_page';

  const currentAssignedWard = currentUser.role === 'Ward Staff' 
    ? wards.find(w => w.id === currentUser.wardId) 
    : null;

  return (
    <aside className="w-80 flex-shrink-0 bg-slate-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-700">
        <h1 className="text-lg font-bold text-center text-slate-200">{APP_TITLE}</h1>
      </div>
      
      <div className="p-4 bg-slate-900">
        <div className="flex items-center">
            <UserCircleIcon className="w-10 h-10 mr-3 text-slate-500"/>
            <div>
                <p className="font-semibold text-white">{currentUser.name}</p>
                <p className="text-sm text-slate-400">{currentUser.role}</p>
            </div>
        </div>
      </div>
     
      {(currentUser.role === 'Admin' || currentUser.role === 'Assessor') && (
        <WardSelector wards={wards} selectedWardId={selectedWardId} setSelectedWardId={setSelectedWardId} />
      )}

      {currentUser.role === 'Ward Staff' && currentAssignedWard && (
         <div className="p-4 bg-slate-900 border-t border-slate-700">
            <div className="flex items-center text-sm font-medium text-slate-400 mb-2">
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              <span>Assigned Ward</span>
            </div>
            <p className="w-full p-2 bg-slate-700 text-white rounded-md text-sm font-medium">
              {currentAssignedWard.name}
            </p>
         </div>
      )}

      <nav className="flex-1 overflow-y-auto border-t border-slate-700">
        {currentUser.role === 'Admin' && (
             <div className="py-2 border-b border-slate-700">
                <p className="px-4 pt-2 pb-2 text-xs font-semibold text-slate-500 uppercase">Admin</p>
                <button
                    onClick={() => setSelectedStandardId('admin_page')}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center transition-colors duration-200 ${
                    isAdminView
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    <Cog6ToothIcon className="w-5 h-5 mr-3" />
                    <span className="flex-1">Admin Dashboard</span>
                </button>
             </div>
        )}
        
        <p className="px-4 pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase">Standards</p>
        <ul className="py-2">
          {standards.map((standard) => (
            <li key={standard.id}>
              <button
                onClick={() => setSelectedStandardId(standard.id)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center transition-colors duration-200 ${
                  selectedStandardId === standard.id && !isAdminView
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full mr-3 ${selectedStandardId === standard.id && !isAdminView ? 'bg-white' : 'bg-slate-500'}`}></span>
                <span className="flex-1">{standard.shortTitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t border-slate-700">
          <button onClick={logout} className="w-full flex items-center justify-center px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors text-sm">
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2"/>
              Logout
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;
