import React, { useState } from 'react';
import type { AssessmentPeriod } from '../types';
import { ChartBarSquareIcon } from './Icons';

interface AssessmentPeriodManagementProps {
  periods: AssessmentPeriod[];
  onAddPeriod: (period: Omit<AssessmentPeriod, 'id'>) => void;
}

const getPeriodStatus = (period: AssessmentPeriod): { text: string; color: string } => {
  const now = new Date();
  const start = new Date(period.startDate);
  const end = new Date(period.endDate);
  end.setHours(23, 59, 59, 999);

  if (now >= start && now <= end) {
    return { text: 'Aktif', color: 'bg-green-100 text-green-800' };
  }
  if (now > end) {
    return { text: 'Selesai', color: 'bg-slate-200 text-slate-700' };
  }
  return { text: 'Akan Datang', color: 'bg-blue-100 text-blue-800' };
};

const AssessmentPeriodManagement: React.FC<AssessmentPeriodManagementProps> = ({ periods, onAddPeriod }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  
  const sortedPeriods = [...periods].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startDate || !endDate) {
      setError('Semua kolom harus diisi.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Tanggal mulai tidak boleh setelah tanggal selesai.');
      return;
    }
    setError('');
    onAddPeriod({ name, startDate, endDate });
    setName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <ChartBarSquareIcon className="w-6 h-6 mr-2 text-sky-600" />
        Manajemen Periode Penilaian
      </h3>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
        <h4 className="font-semibold text-slate-700">Buat Periode Baru</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="period-name" className="block text-sm font-medium text-slate-600 mb-1">Nama Periode</label>
            <input
              id="period-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Audit Triwulan 1 2024"
              required
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-slate-600 mb-1">Tanggal Mulai</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-slate-600 mb-1">Tanggal Selesai</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
        </div>
         {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="mt-2 w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-slate-400">
          Tambah Periode
        </button>
      </form>

      <h4 className="font-semibold text-slate-700 mb-2">Daftar Periode</h4>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {sortedPeriods.length > 0 ? sortedPeriods.map(period => {
          const status = getPeriodStatus(period);
          const formattedStart = new Date(period.startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
          const formattedEnd = new Date(period.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

          return (
            <div key={period.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">{period.name}</p>
                <p className="text-xs text-slate-500">{formattedStart} - {formattedEnd}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                {status.text}
              </span>
            </div>
          )
        }) : <p className="text-sm text-slate-500">Belum ada periode penilaian yang dibuat.</p>}
      </div>
    </div>
  );
};

export default AssessmentPeriodManagement;