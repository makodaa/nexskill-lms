import React from 'react';
import ContentEditorAppLayout from '../../layouts/ContentEditorAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * Content Editor Dashboard Placeholder
 * Landing page for CONTENT_EDITOR role - content specialists
 */
const ContentEditorDashboardPlaceholder: React.FC = () => {
  return (
    <ContentEditorAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Content Editor Dashboard ✍️
            </h1>
            <p className="text-sm text-text-secondary">
              Create and manage course materials
            </p>
          </div>
          <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full">
            <span className="text-xs font-medium">Content Specialist</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                ✍️
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.CONTENT_EDITOR}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.CONTENT_EDITOR.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-text-secondary">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Content Creation
              </h3>
              <p className="text-sm text-text-secondary">
                Create and edit high-quality course materials and learning resources
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Media Management
              </h3>
              <p className="text-sm text-text-secondary">
                Upload and organize videos, documents, and multimedia assets
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Quality Assurance
              </h3>
              <p className="text-sm text-text-secondary">
                Review content for accuracy, consistency, and learning effectiveness
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full content editor features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </ContentEditorAppLayout>
  );
};

export default ContentEditorDashboardPlaceholder;
