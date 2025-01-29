import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Plus, Filter, Clock, AlertCircle, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CalendarView from './CalendarView';
import ListView from './ListView';
import CreateShiftModal from './CreateShiftModal';
import ShiftDetailModal from './ShiftDetailModal';
import { Shift } from './types';
import { mockShifts } from './mockData';

function SchedulingView() {
  const navigate = useNavigate();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [dateRange, setDateRange] = useState('This Week (Apr 15 - Apr 21)');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'client' | 'caregiver'>('all');

  const totalShifts = mockShifts.length;
  const flaggedShifts = mockShifts.filter(shift => !shift.complianceStatus.isCompliant).length;
  const pendingShifts = mockShifts.filter(shift => shift.status === 'Pending').length;

  const filteredShifts = mockShifts.filter(shift => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        shift.clientName.toLowerCase().includes(search) ||
        shift.caregiverName.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleSaveShift = (shift: Shift) => {
    setShowCreateModal(false);
  };

  const handleUpdateShift = (shift: Shift) => {
    setSelectedShift(null);
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Schedule</h1>
            <p className="text-gray-600">View and manage all care visits</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}
              className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            >
              <CalendarIcon size={16} />
              {view === 'calendar' ? 'List View' : 'Calendar View'}
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Create Shift
            </button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <button 
            className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            onClick={() => setFilterType('all')}
          >
            <div className="text-sm text-gray-500 mb-1">Total Shifts</div>
            <div className="text-2xl font-semibold">{totalShifts}</div>
          </button>
          <button 
            className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            onClick={() => navigate('/schedule/clients')}
          >
            <div className="text-sm text-gray-500 mb-1">Client Visits</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-purple-600">{pendingShifts}</div>
              <Users size={20} className="text-purple-600" />
            </div>
          </button>
          <button 
            className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            onClick={() => navigate('/schedule/caregivers')}
          >
            <div className="text-sm text-gray-500 mb-1">Caregiver Assignments</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-purple-600">{flaggedShifts}</div>
              <Clock size={20} className="text-purple-600" />
            </div>
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 flex items-center gap-4">
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
              {dateRange}
              <ChevronDown size={16} />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by client or caregiver"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
              Filter
              <Filter size={16} />
            </button>
          </div>

          <div className="p-4">
            {view === 'calendar' ? (
              <CalendarView 
                shifts={filteredShifts}
                onShiftClick={setSelectedShift}
              />
            ) : (
              <ListView
                shifts={filteredShifts}
                onShiftClick={setSelectedShift}
              />
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateShiftModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveShift}
        />
      )}

      {selectedShift && (
        <ShiftDetailModal
          shift={selectedShift}
          onClose={() => setSelectedShift(null)}
          onUpdate={handleUpdateShift}
        />
      )}
    </main>
  );
}

export default SchedulingView;