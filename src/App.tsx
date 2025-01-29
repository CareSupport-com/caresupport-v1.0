import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './components/resources/context/ProgressContext';
import { SearchProvider } from './components/resources/context/SearchContext';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import ComplianceView from './components/ComplianceView';
import ControlsView from './components/ControlsView';
import PolicyListView from './components/policy/PolicyListView';
import PolicyDetailView from './components/policy/PolicyDetailView';
import DocumentsView from './components/DocumentsView';
import AuditsView from './components/AuditsView';
import ReportsView from './components/ReportsView';
import ResourcesView from './components/resources/ResourcesView';
import GettingStartedView from './components/resources/GettingStartedView';
import KnowledgeBaseView from './components/resources/KnowledgeBaseView';
import ResourceLibraryView from './components/resources/ResourceLibraryView';
import CommunityGuideView from './components/resources/CommunityGuideView';
import ClientListView from './components/client/ClientListView';
import ClientDetailView from './components/client/ClientDetailView';
import ClientScheduleView from './components/client/ClientScheduleView';
import CaregiverListView from './components/caregiver/CaregiverListView';
import CaregiverDetailView from './components/caregiver/CaregiverDetailView';
import CaregiverScheduleView from './components/caregiver/CaregiverScheduleView';
import BillingView from './components/billing/BillingView';
import SchedulingView from './components/scheduling/SchedulingView';
import { 
  DashboardView, UserListView, SystemSettingsView,
  IntegrationsView, AuditLogsView, AdvancedComplianceView 
} from './components/admin';

function App() {
  return (
    <Router>
      <ProgressProvider>
        <SearchProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 relative">
              <div className="absolute inset-0 overflow-auto">
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/schedule" element={<SchedulingView />} />
                  <Route path="/schedule/clients" element={<ClientScheduleView />} />
                  <Route path="/schedule/caregivers" element={<CaregiverScheduleView />} />
                  <Route path="/compliance" element={<ComplianceView />} />
                  <Route path="/compliance/controls" element={<ControlsView />} />
                  <Route path="/compliance/policies" element={<PolicyListView />} />
                  <Route path="/compliance/policies/:policyId" element={<PolicyDetailView />} />
                  <Route path="/compliance/documents" element={<DocumentsView />} />
                  <Route path="/compliance/audits" element={<AuditsView />} />
                  <Route path="/clients" element={<ClientListView />} />
                  <Route path="/clients/schedule" element={<ClientScheduleView />} />
                  <Route path="/clients/:clientId" element={<ClientDetailView />} />
                  <Route path="/caregivers" element={<CaregiverListView />} />
                  <Route path="/caregivers/schedule" element={<CaregiverScheduleView />} />
                  <Route path="/caregivers/:caregiverId" element={<CaregiverDetailView />} />
                  <Route path="/billing" element={<BillingView />} />
                  <Route path="/reports" element={<ReportsView />} />
                  <Route path="/resources" element={<ResourcesView />} />
                  <Route path="/resources/getting-started" element={<GettingStartedView />} />
                  <Route path="/resources/knowledge-base" element={<KnowledgeBaseView />} />
                  <Route path="/resources/library" element={<ResourceLibraryView />} />
                  <Route path="/resources/community" element={<CommunityGuideView />} />
                  <Route path="/admin" element={<DashboardView />} />
                  <Route path="/admin/users" element={<UserListView />} />
                  <Route path="/admin/settings" element={<SystemSettingsView />} />
                  <Route path="/admin/integrations" element={<IntegrationsView />} />
                  <Route path="/admin/logs" element={<AuditLogsView />} />
                  <Route path="/admin/compliance" element={<AdvancedComplianceView />} />
                </Routes>
              </div>
            </main>
          </div>
        </SearchProvider>
      </ProgressProvider>
    </Router>
  );
}

export default App;