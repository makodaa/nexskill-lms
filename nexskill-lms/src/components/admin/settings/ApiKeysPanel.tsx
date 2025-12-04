import React, { useState } from 'react';

interface ApiKey {
  id: string;
  label: string;
  keyPreview: string;
  scope: 'read' | 'write' | 'admin';
  createdAt: string;
  lastUsedAt?: string;
  status: 'active' | 'revoked';
}

interface ApiKeysPanelProps {
  apiKeys: ApiKey[];
  onChange: (keys: ApiKey[]) => void;
}

const ApiKeysPanel: React.FC<ApiKeysPanelProps> = ({ apiKeys, onChange }) => {
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [newKeyScope, setNewKeyScope] = useState<'read' | 'write' | 'admin'>('read');
  const [notification, setNotification] = useState<string | null>(null);

  const scopeColors = {
    read: 'bg-blue-100 text-blue-700',
    write: 'bg-orange-100 text-orange-700',
    admin: 'bg-red-100 text-red-700',
  };

  const scopeLabels = {
    read: 'Read-only',
    write: 'Read/Write',
    admin: 'Admin',
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerateKey = () => {
    if (!newKeyLabel.trim()) {
      showNotification('⚠️ Please enter a key label');
      return;
    }

    const randomSuffix = Math.floor(Math.random() * 9000) + 1000;
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      label: newKeyLabel,
      keyPreview: `sk_live_••••${randomSuffix}`,
      scope: newKeyScope,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    onChange([...apiKeys, newKey]);
    setNewKeyLabel('');
    setNewKeyScope('read');
    setShowGenerateForm(false);
    showNotification('✓ API key generated successfully');
  };

  const handleRegenerateKey = (keyId: string) => {
    const randomSuffix = Math.floor(Math.random() * 9000) + 1000;
    const updated = apiKeys.map((key) =>
      key.id === keyId
        ? {
            ...key,
            keyPreview: `sk_live_••••${randomSuffix}`,
            lastUsedAt: new Date().toISOString().split('T')[0],
          }
        : key
    );
    onChange(updated);
    showNotification('✓ Key regenerated');
  };

  const handleRevokeKey = (keyId: string) => {
    const updated = apiKeys.map((key) =>
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    );
    onChange(updated);
    showNotification('✓ Key revoked');
  };

  const handleCopyKey = (keyPreview: string) => {
    console.log('Copying key:', keyPreview);
    showNotification('✓ Key copied to clipboard (simulated)');
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
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API keys</h2>
          <p className="text-gray-600 mt-1">
            Issue and rotate keys for programmatic access.
          </p>
        </div>
        <button
          onClick={() => setShowGenerateForm(!showGenerateForm)}
          className="bg-[#304DB5] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5E7BFF] transition-colors shadow-lg"
        >
          + Generate new key
        </button>
      </div>

      {/* Generate Form */}
      {showGenerateForm && (
        <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900">Create new API key</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Label
              </label>
              <input
                type="text"
                value={newKeyLabel}
                onChange={(e) => setNewKeyLabel(e.target.value)}
                placeholder="e.g., Mobile App Integration"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scope
              </label>
              <div className="flex gap-3">
                {(['read', 'write', 'admin'] as const).map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setNewKeyScope(scope)}
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${
                        newKeyScope === scope
                          ? 'bg-[#304DB5] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    {scopeLabels[scope]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleGenerateKey}
                className="bg-[#304DB5] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5E7BFF] transition-colors"
              >
                Create key
              </button>
              <button
                onClick={() => setShowGenerateForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className={`
              border rounded-xl p-5 transition-all
              ${
                key.status === 'revoked'
                  ? 'bg-gray-50 border-gray-200 opacity-60'
                  : 'bg-white border-gray-200 hover:border-[#304DB5] hover:shadow-md'
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{key.label}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scopeColors[key.scope]
                    }`}
                  >
                    {scopeLabels[key.scope]}
                  </span>
                  {key.status === 'revoked' && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                      Revoked
                    </span>
                  )}
                </div>
                <div className="font-mono text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                  {key.keyPreview}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Created: {key.createdAt}</span>
                  {key.lastUsedAt && <span>Last used: {key.lastUsedAt}</span>}
                </div>
              </div>
              {key.status === 'active' && (
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleCopyKey(key.keyPreview)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => handleRegenerateKey(key.id)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    🔄 Regenerate
                  </button>
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    ⛔ Revoke
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {apiKeys.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🔑</div>
          <p>No API keys yet. Generate your first key to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ApiKeysPanel;
