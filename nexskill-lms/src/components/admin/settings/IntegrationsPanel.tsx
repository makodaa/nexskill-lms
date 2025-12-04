import React, { useState } from 'react';

interface Integration {
  id: string;
  provider: 'zoom' | 'stripe' | 'facebook' | 'whatsapp';
  name: string;
  status: 'connected' | 'disconnected' | 'pending';
  environment: 'sandbox' | 'production';
  lastSyncedAt?: string;
  configSummary: string;
}

interface IntegrationsPanelProps {
  integrations: Integration[];
  onChange: (integrations: Integration[]) => void;
}

const IntegrationsPanel: React.FC<IntegrationsPanelProps> = ({ integrations, onChange }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const providerIcons = {
    zoom: '📹',
    stripe: '💳',
    facebook: '👥',
    whatsapp: '💬',
  };

  const statusColors = {
    connected: 'bg-green-100 text-green-700',
    disconnected: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  const statusLabels = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    pending: 'Pending',
  };

  const environmentColors = {
    sandbox: 'bg-blue-50 text-blue-700 border-blue-200',
    production: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleConnect = (integrationId: string) => {
    const updated = integrations.map((int) =>
      int.id === integrationId
        ? {
            ...int,
            status: 'connected' as const,
            lastSyncedAt: new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            configSummary:
              int.provider === 'zoom'
                ? 'Webhook active · Ready for sessions'
                : int.provider === 'stripe'
                ? 'Webhooks active · Products synced'
                : int.provider === 'facebook'
                ? 'Pixel installed · Campaigns ready'
                : 'Business account verified · Ready',
          }
        : int
    );
    onChange(updated);
    showNotification('✓ Integration connected successfully');
  };

  const handleDisconnect = (integrationId: string) => {
    const updated = integrations.map((int) =>
      int.id === integrationId
        ? {
            ...int,
            status: 'disconnected' as const,
            configSummary: 'Not configured',
          }
        : int
    );
    onChange(updated);
    showNotification('✓ Integration disconnected');
  };

  const handleTestConnection = (provider: string) => {
    console.log(`Testing connection for ${provider}...`);
    showNotification(`✓ ${provider} connection test successful`);
  };

  const handleEditSettings = (provider: string) => {
    console.log(`Opening settings for ${provider}...`);
    showNotification(`Opening ${provider} settings (simulated)`);
  };

  const handleToggleEnvironment = (integrationId: string) => {
    const updated = integrations.map((int) =>
      int.id === integrationId
        ? {
            ...int,
            environment: (int.environment === 'sandbox' ? 'production' : 'sandbox') as
              | 'sandbox'
              | 'production',
          }
        : int
    );
    onChange(updated);
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
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
        <p className="text-gray-600 mt-1">
          Connect NexSkill to tools like Zoom, Stripe, Facebook, and WhatsApp.
        </p>
      </div>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="border border-gray-200 rounded-xl p-6 hover:border-[#304DB5] hover:shadow-md transition-all bg-white"
          >
            {/* Provider Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-xl flex items-center justify-center text-2xl">
                  {providerIcons[integration.provider]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[integration.status]
                      }`}
                    >
                      {statusLabels[integration.status]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment Toggle */}
            <div className="mb-4">
              <button
                onClick={() => handleToggleEnvironment(integration.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  environmentColors[integration.environment]
                }`}
              >
                {integration.environment === 'sandbox' ? '🧪 Sandbox' : '🚀 Production'}
              </button>
            </div>

            {/* Config Summary */}
            <div className="mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">ℹ️</span>
                <span>{integration.configSummary}</span>
              </div>
              {integration.lastSyncedAt && (
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>⏱️</span>
                  <span>Last synced: {integration.lastSyncedAt}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {integration.status === 'connected' ? (
                <>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Disconnect
                  </button>
                  <button
                    onClick={() => handleEditSettings(integration.name)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    ⚙️ Edit settings
                  </button>
                  <button
                    onClick={() => handleTestConnection(integration.name)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    🔍 Test
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleConnect(integration.id)}
                    className="px-4 py-2 bg-[#304DB5] text-white rounded-lg text-sm font-medium hover:bg-[#5E7BFF] transition-colors shadow-md"
                  >
                    Connect
                  </button>
                  <button
                    onClick={() => handleEditSettings(integration.name)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    ⚙️ Configure
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div className="text-sm text-blue-800">
            <strong>Pro tip:</strong> Test integrations in Sandbox mode before switching to
            Production. All operations here are simulated for demonstration purposes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
