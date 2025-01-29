import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';
import AssignmentChart from './AssignmentChart';
import CompletionStatus from './CompletionStatus';

const controls = [
  {
    id: 'EVV-1',
    title: 'Time logs must match scheduled hours',
    description: 'Verify that caregiver clock-in/out times align with scheduled shift hours within acceptable variance.',
    owner: 'System',
    source: 'CareSupport',
    frameworks: ['EVV'],
    tests: '2/2',
    status: 'OK'
  },
  {
    id: 'EVV-2',
    title: 'Every shift must have a verified location ping',
    description: 'Ensure GPS location data or telephony verification is recorded for each visit.',
    owner: 'System',
    source: 'CareSupport',
    frameworks: ['EVV'],
    tests: '1/2',
    status: 'Failing'
  },
  {
    id: 'CRD-1',
    title: 'Caregiver license unexpired',
    description: 'Verify that all active caregivers maintain current, valid professional licenses.',
    owner: 'Admin',
    source: 'CareSupport',
    frameworks: ['Credentialing'],
    tests: '2/2',
    status: 'OK'
  },
  {
    id: 'CRD-2',
    title: 'Background checks updated annually',
    description: 'Ensure background checks are renewed every 365 days for all active caregivers.',
    owner: 'Unassigned',
    source: 'CareSupport',
    frameworks: ['Credentialing'],
    tests: '0/1',
    status: 'Needs attention'
  },
  {
    id: 'POC-1',
    title: 'Daily tasks documented for each client visit',
    description: 'Verify that caregivers complete required documentation for all tasks specified in the care plan.',
    owner: 'Caregiver',
    source: 'CareSupport',
    frameworks: ['Plan-of-Care'],
    tests: '1/3',
    status: 'Failing'
  },
  {
    id: 'POC-2',
    title: 'Medication administration logs complete',
    description: 'Ensure all medication-related tasks are documented with time, dose, and route of administration.',
    owner: 'Caregiver',
    source: 'CareSupport',
    frameworks: ['Plan-of-Care'],
    tests: '3/3',
    status: 'OK'
  }
];

function ControlsView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredControls = controls.filter(control =>
    control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    control.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/compliance')}
              className="text-gray-500 hover:text-gray-700"
            >
              Compliance
            </button>
            <span className="text-gray-500">/</span>
            <h1 className="text-2xl font-semibold">Controls</h1>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
              More
              <ChevronDown size={16} />
            </button>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
              <Plus size={16} />
              Add control
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AssignmentChart />
          <CompletionStatus />
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search controls"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-2 p-4 border-b border-gray-200">
            {['Framework', 'Owner', 'Status', 'Source'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 text-sm text-gray-700 bg-white rounded border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
              >
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredControls.map((control) => (
                <tr key={control.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{control.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{control.title}</div>
                    <div className="text-sm text-gray-500">{control.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{control.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{control.source}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {control.frameworks.map((framework) => (
                        <span key={framework} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      control.status === 'OK' 
                        ? 'bg-green-100 text-green-800'
                        : control.status === 'Failing'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {control.tests}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ControlsView;