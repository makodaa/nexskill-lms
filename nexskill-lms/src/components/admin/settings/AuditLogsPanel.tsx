import React, { useState } from 'react';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  summary: string;
  ipAddress?: string;
}

interface AuditLogsPanelProps {
  logs: AuditLog[];
}

const AuditLogsPanel: React.FC<AuditLogsPanelProps> = ({ logs }) => {
  const [dateRange, setDateRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [actorSearch, setActorSearch] = useState('');
  const [actionCategory, setActionCategory] = useState<
    'all' | 'settings' | 'integrations' | 'access' | 'features'
  >('all');

  const actionColors: Record<string, string> = {
    UPDATED_FEATURE_FLAG: 'bg-blue-100 text-blue-700',
    CONNECTED_INTEGRATION: 'bg-green-100 text-green-700',
    DISCONNECTED_INTEGRATION: 'bg-orange-100 text-orange-700',
    GENERATED_API_KEY: 'bg-purple-100 text-purple-700',
    REVOKED_API_KEY: 'bg-red-100 text-red-700',
    UPDATED_ROLE_PERMISSIONS: 'bg-indigo-100 text-indigo-700',
    CREATED_ROLE: 'bg-teal-100 text-teal-700',
    ACTIVATED_LANGUAGE: 'bg-cyan-100 text-cyan-700',
  };

  const resourceTypeIcons: Record<string, string> = {
    FeatureToggle: '🎛️',
    Integration: '🔌',
    APIKey: '🔑',
    Role: '🛡️',
    Language: '🌐',
  };

  const filteredLogs = logs.filter((log) => {
    const matchesActor =
      actorSearch === '' || log.actor.toLowerCase().includes(actorSearch.toLowerCase());

    let matchesCategory = true;
    if (actionCategory !== 'all') {
      const categoryMap: Record<string, string[]> = {
        settings: ['GENERATED_API_KEY', 'REVOKED_API_KEY'],
        integrations: ['CONNECTED_INTEGRATION', 'DISCONNECTED_INTEGRATION'],
        access: ['UPDATED_ROLE_PERMISSIONS', 'CREATED_ROLE'],
        features: ['UPDATED_FEATURE_FLAG'],
      };
      matchesCategory = categoryMap[actionCategory]?.includes(log.action) || false;
    }

    // Simple date filtering (dummy logic for demo)
    let matchesDate = true;
    if (dateRange !== 'all') {
      // In a real app, you'd parse log.timestamp and compare
      matchesDate = true;
    }

    return matchesActor && matchesCategory && matchesDate;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Audit logs</h2>
        <p className="text-gray-600 mt-1">Track who changed what and when.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Date Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        {/* Actor Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by admin</label>
          <input
            type="text"
            value={actorSearch}
            onChange={(e) => setActorSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
          />
        </div>

        {/* Action Category */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Action category</label>
          <select
            value={actionCategory}
            onChange={(e) => setActionCategory(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
          >
            <option value="all">All actions</option>
            <option value="settings">Settings</option>
            <option value="integrations">Integrations</option>
            <option value="access">Access control</option>
            <option value="features">Feature toggles</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">{filteredLogs.length}</span> events shown
        </div>
        <div>·</div>
        <div>
          <span className="font-medium text-gray-900">
            {new Set(filteredLogs.map((l) => l.actor)).size}
          </span>{' '}
          unique actors
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="border border-gray-200 rounded-xl p-5 hover:border-[#304DB5] hover:shadow-md transition-all bg-white"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              {/* Main Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resourceTypeIcons[log.resourceType] || '📄'}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          actionColors[log.action] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {log.action.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm text-gray-600">{log.resourceType}</span>
                    </div>
                    <p className="text-sm text-gray-800 mt-2">{log.summary}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>👤</span>
                        <span className="font-medium">{log.actor}</span>
                        <span className="text-gray-400">({log.actorRole})</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{log.timestamp}</span>
                      </div>
                      {log.ipAddress && (
                        <>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <span>🌐</span>
                            <span className="font-mono">{log.ipAddress}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource ID */}
              <div className="text-xs">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="text-gray-500 mb-1">Resource ID</div>
                  <div className="font-mono text-gray-700">{log.resourceId}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">📋</div>
          <p>No audit logs match your filters.</p>
        </div>
      )}

      {/* Info Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">ℹ️</span>
          <div className="text-sm text-blue-800">
            <strong>Audit trail:</strong> All configuration changes are logged for compliance and
            debugging. Logs are retained for 90 days in production environments.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPanel;
