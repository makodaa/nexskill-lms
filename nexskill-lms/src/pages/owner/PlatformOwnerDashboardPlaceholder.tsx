import React from 'react';
import PlatformOwnerAppLayout from '../../layouts/PlatformOwnerAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * Platform Owner Dashboard Placeholder
 * Landing page for PLATFORM_OWNER role - super administrator
 */
const PlatformOwnerDashboardPlaceholder: React.FC = () => {
  return (
    <PlatformOwnerAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Platform Owner Dashboard 👑
            </h1>
            <p className="text-sm text-text-secondary">
              Super Admin Control Center
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
            <span className="text-xs font-medium">Super Admin</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                👑
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.PLATFORM_OWNER}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.PLATFORM_OWNER.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-purple-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-text-secondary">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Platform Architecture
              </h3>
              <p className="text-sm text-text-secondary">
                Configure system-wide settings, infrastructure, and core platform features
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Financial Control
              </h3>
              <p className="text-sm text-text-secondary">
                Oversee all financial operations, revenue streams, and billing configurations
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                User Management
              </h3>
              <p className="text-sm text-text-secondary">
                Manage all user roles, permissions, and access control policies
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Analytics & Insights
              </h3>
              <p className="text-sm text-text-secondary">
                Access comprehensive platform analytics, performance metrics, and business intelligence
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Security & Compliance
              </h3>
              <p className="text-sm text-text-secondary">
                Manage security policies, data privacy settings, and regulatory compliance
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Growth & Scaling
              </h3>
              <p className="text-sm text-text-secondary">
                Plan and execute platform scaling strategies, feature rollouts, and market expansion
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full platform owner features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </PlatformOwnerAppLayout>
  );
};

export default PlatformOwnerDashboardPlaceholder;
