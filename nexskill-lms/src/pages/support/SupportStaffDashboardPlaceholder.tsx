import React from 'react';
import SupportStaffAppLayout from '../../layouts/SupportStaffAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * Support Staff Dashboard Placeholder
 * Landing page for SUPPORT_STAFF role - customer support representatives
 */
const SupportStaffDashboardPlaceholder: React.FC = () => {
  return (
    <SupportStaffAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Support Staff Dashboard 🎧
            </h1>
            <p className="text-sm text-text-secondary">
              Assist students and manage support tickets
            </p>
          </div>
          <div className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full">
            <span className="text-xs font-medium">Support Team</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🎧
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.SUPPORT_STAFF}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.SUPPORT_STAFF.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-cyan-500 mt-0.5 flex-shrink-0">✓</span>
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
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Ticket Management
              </h3>
              <p className="text-sm text-text-secondary">
                View, assign, and resolve student support tickets efficiently
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Live Chat Support
              </h3>
              <p className="text-sm text-text-secondary">
                Provide real-time assistance to students through chat
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Knowledge Base
              </h3>
              <p className="text-sm text-text-secondary">
                Manage FAQs and help articles for self-service support
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full support staff features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </SupportStaffAppLayout>
  );
};

export default SupportStaffDashboardPlaceholder;
