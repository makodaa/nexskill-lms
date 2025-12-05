import React from 'react';
import OrgOwnerAppLayout from '../../layouts/OrgOwnerAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * Organization Owner Dashboard Placeholder
 * Landing page for ORG_OWNER role - B2B organization administrators
 */
const OrgOwnerDashboardPlaceholder: React.FC = () => {
  return (
    <OrgOwnerAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Organization Owner Dashboard 🏢
            </h1>
            <p className="text-sm text-text-secondary">
              Manage your organization and team learning
            </p>
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full">
            <span className="text-xs font-medium">Organization Admin</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🏢
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.ORG_OWNER}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.ORG_OWNER.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-text-secondary">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Team Management
              </h3>
              <p className="text-sm text-text-secondary">
                Manage organization members, roles, and access permissions
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Training Programs
              </h3>
              <p className="text-sm text-text-secondary">
                Deploy and track corporate learning programs for your team
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Analytics & Reports
              </h3>
              <p className="text-sm text-text-secondary">
                Monitor team progress, completion rates, and learning outcomes
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full organization owner features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </OrgOwnerAppLayout>
  );
};

export default OrgOwnerDashboardPlaceholder;
