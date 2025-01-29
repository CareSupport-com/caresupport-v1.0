import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, UserCheck, ClipboardCheck } from 'lucide-react';

function ComplianceView() {
  const navigate = useNavigate();

  const frameworks = [
    {
      title: 'EVV',
      subtitle: 'Electronic Visit Verification',
      description: 'Ensures accurate location and time logs for each shift to comply with the 21st Century Cures Act requirements.',
      progress: 64,
      icon: Clock,
      isHighlighted: false
    },
    {
      title: 'Credentialing',
      subtitle: 'Caregiver Qualifications',
      description: 'Tracks and validates caregiver licenses, background checks, training certifications, and continuing education requirements.',
      progress: 83,
      icon: UserCheck,
      isHighlighted: false
    },
    {
      title: 'Plan-of-Care',
      subtitle: 'Care Documentation',
      description: 'Monitors compliance with care plan documentation, medication administration guidelines, and required visit frequencies.',
      progress: 75,
      icon: ClipboardCheck,
      isHighlighted: false
    }
  ];

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Frameworks</h1>
          <button 
            onClick={() => navigate('/compliance/controls')}
            className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            View controls
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworks.map((framework, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{framework.title}</h3>
                  <p className="text-sm text-gray-600">{framework.subtitle}</p>
                </div>
                <framework.icon size={24} className="text-purple-600" />
              </div>
              
              <p className="text-gray-600 mb-6 min-h-[80px]">{framework.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="20"
                        cx="24"
                        cy="24"
                      />
                      <circle
                        className={framework.progress >= 95 ? 'text-green-500' : 'text-purple-500'}
                        strokeWidth="4"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 * ((100 - framework.progress) / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="20"
                        cx="24"
                        cy="24"
                      />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                      {framework.progress}%
                    </span>
                  </div>
                </div>
                
                <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                  Review tasks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ComplianceView;