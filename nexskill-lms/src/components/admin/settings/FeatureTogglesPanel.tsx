import React, { useState } from 'react';

interface FeatureToggle {
  id: string;
  key: string;
  name: string;
  description: string;
  segment: 'global' | 'beta' | 'internal';
  status: 'enabled' | 'disabled';
}

interface FeatureTogglesPanelProps {
  toggles: FeatureToggle[];
  onChange: (toggles: FeatureToggle[]) => void;
}

const FeatureTogglesPanel: React.FC<FeatureTogglesPanelProps> = ({ toggles, onChange }) => {
  const [segmentFilter, setSegmentFilter] = useState<'all' | 'global' | 'beta' | 'internal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const segmentColors = {
    global: 'bg-green-100 text-green-700',
    beta: 'bg-orange-100 text-orange-700',
    internal: 'bg-purple-100 text-purple-700',
  };

  const segmentLabels = {
    global: 'Global',
    beta: 'Beta',
    internal: 'Internal',
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredToggles = toggles.filter((toggle) => {
    const matchesSegment = segmentFilter === 'all' || toggle.segment === segmentFilter;
    const matchesSearch =
      searchQuery === '' ||
      toggle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toggle.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toggle.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const handleToggleStatus = (toggleId: string) => {
    const updated = toggles.map((toggle) =>
      toggle.id === toggleId
        ? {
            ...toggle,
            status: (toggle.status === 'enabled' ? 'disabled' : 'enabled') as 'enabled' | 'disabled',
          }
        : toggle
    );
    onChange(updated);
    const toggle = toggles.find((t) => t.id === toggleId);
    showNotification(
      `✓ ${toggle?.name} ${toggle?.status === 'enabled' ? 'disabled' : 'enabled'}`
    );
  };

  const handleCloneToggle = (toggleId: string) => {
    const original = toggles.find((t) => t.id === toggleId);
    if (!original) return;

    const cloned: FeatureToggle = {
      id: `ft-${Date.now()}`,
      key: `${original.key}_v2`,
      name: `${original.name} (Copy)`,
      description: original.description,
      segment: original.segment,
      status: 'disabled',
    };

    onChange([...toggles, cloned]);
    showNotification(`✓ Cloned feature toggle: ${cloned.name}`);
  };

  const handleViewDetails = (toggleName: string) => {
    console.log(`Viewing details for: ${toggleName}`);
    showNotification(`Opening details for ${toggleName} (simulated)`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      {/* Notification Banner */}
      {notification && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
          {notification}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Feature toggles</h2>
        <p className="text-gray-600 mt-1">
          Gate features by environment, cohort, or rollout phase.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Segment Filter */}
        <div className="flex gap-2">
          {(['all', 'global', 'beta', 'internal'] as const).map((segment) => (
            <button
              key={segment}
              onClick={() => setSegmentFilter(segment)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  segmentFilter === segment
                    ? 'bg-[#304DB5] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {segment === 'all' ? 'All segments' : segmentLabels[segment]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by key or name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">{filteredToggles.length}</span> features shown
        </div>
        <div>·</div>
        <div>
          <span className="font-medium text-green-600">
            {filteredToggles.filter((t) => t.status === 'enabled').length}
          </span>{' '}
          enabled
        </div>
        <div>·</div>
        <div>
          <span className="font-medium text-gray-500">
            {filteredToggles.filter((t) => t.status === 'disabled').length}
          </span>{' '}
          disabled
        </div>
      </div>

      {/* Toggles List */}
      <div className="space-y-3">
        {filteredToggles.map((toggle) => (
          <div
            key={toggle.id}
            className="border border-gray-200 rounded-xl p-5 hover:border-[#304DB5] hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{toggle.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      segmentColors[toggle.segment]
                    }`}
                  >
                    {segmentLabels[toggle.segment]}
                  </span>
                </div>
                <div className="font-mono text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded inline-block">
                  {toggle.key}
                </div>
                <p className="text-sm text-gray-600">{toggle.description}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(toggle.name)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                  >
                    📊 View details
                  </button>
                  <button
                    onClick={() => handleCloneToggle(toggle.id)}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    📋 Clone
                  </button>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="ml-6 flex flex-col items-end gap-2">
                <button
                  onClick={() => handleToggleStatus(toggle.id)}
                  className={`
                    relative w-14 h-8 rounded-full transition-all duration-300 shadow-inner
                    ${toggle.status === 'enabled' ? 'bg-green-500' : 'bg-gray-300'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
                      ${toggle.status === 'enabled' ? 'left-7' : 'left-1'}
                    `}
                  />
                </button>
                <span
                  className={`text-xs font-medium ${
                    toggle.status === 'enabled' ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {toggle.status === 'enabled' ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredToggles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>No feature toggles match your filters.</p>
        </div>
      )}

      {/* Info Footer */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-purple-600 text-xl">💡</span>
          <div className="text-sm text-purple-800">
            <strong>Best practice:</strong> Test new features in Beta or Internal segments before
            enabling globally. All toggle operations are local-only for demonstration.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTogglesPanel;
