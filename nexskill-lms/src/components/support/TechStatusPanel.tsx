import { useState } from 'react';
import { Server, Database, Globe, Wifi, AlertCircle, CheckCircle, RefreshCw, Bell, BellOff, X, ChevronDown, ChevronUp, AlertTriangle, Clock, Activity, Send } from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  responseTime: string;
  icon: any;
  lastChecked: string;
}

interface Incident {
  id: string;
  system: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  time: string;
  description: string;
}

const TechStatusPanel = () => {
  const [systems, setSystems] = useState<SystemStatus[]>([
    { id: 'web', name: 'Web Application', status: 'operational', uptime: '99.9%', responseTime: '145ms', icon: Globe, lastChecked: '2 min ago' },
    { id: 'api', name: 'API Server', status: 'operational', uptime: '99.8%', responseTime: '89ms', icon: Server, lastChecked: '2 min ago' },
    { id: 'db', name: 'Database', status: 'operational', uptime: '100%', responseTime: '12ms', icon: Database, lastChecked: '2 min ago' },
    { id: 'cdn', name: 'CDN', status: 'degraded', uptime: '98.5%', responseTime: '320ms', icon: Wifi, lastChecked: '2 min ago' },
  ]);

  const [incidents] = useState<Incident[]>([
    { id: 'INC-001', system: 'CDN', title: 'Elevated response times on CDN nodes', status: 'monitoring', time: '45 min ago', description: 'We are experiencing higher than normal response times on some CDN edge nodes. The issue has been identified and we are monitoring the fix.' },
    { id: 'INC-002', system: 'API Server', title: 'Brief API latency spike', status: 'resolved', time: '2 hours ago', description: 'A brief increase in API latency was observed. The issue was caused by a database query optimization that has been resolved.' },
  ]);

  const [toast, setToast] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [subscribed, setSubscribed] = useState<string[]>(['cdn']);
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [reportIssueModal, setReportIssueModal] = useState<SystemStatus | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [showIncidents, setShowIncidents] = useState(true);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('⏳ Refreshing system status...');
    setTimeout(() => {
      setSystems(prev => prev.map(s => ({ ...s, lastChecked: 'Just now' })));
      setIsRefreshing(false);
      showToast('✓ System status refreshed');
    }, 1500);
  };

  const toggleSubscription = (systemId: string) => {
    if (subscribed.includes(systemId)) {
      setSubscribed(prev => prev.filter(id => id !== systemId));
      showToast('🔕 Unsubscribed from alerts');
    } else {
      setSubscribed(prev => [...prev, systemId]);
      showToast('🔔 Subscribed to alerts for this system');
    }
  };

  const handleReportIssue = (system: SystemStatus) => {
    showToast(`✓ Issue reported for ${system.name}`);
    setReportIssueModal(null);
    setIssueDescription('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle, iconColor: 'text-green-600' };
      case 'degraded': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: AlertCircle, iconColor: 'text-yellow-600' };
      case 'down': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertCircle, iconColor: 'text-red-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: AlertCircle, iconColor: 'text-gray-600' };
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'bg-red-100 text-red-700';
      case 'identified': return 'bg-orange-100 text-orange-700';
      case 'monitoring': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">System Status Monitor</h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all ${isRefreshing ? 'opacity-70' : ''}`}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>
      
      <div className="space-y-4">
        {systems.map((system) => {
          const Icon = system.icon;
          const statusConfig = getStatusColor(system.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={system.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{system.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                      <span className={`text-sm font-medium ${statusConfig.text}`}>
                        {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">• Last checked: {system.lastChecked}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSubscription(system.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      subscribed.includes(system.id)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                    title={subscribed.includes(system.id) ? 'Unsubscribe from alerts' : 'Subscribe to alerts'}
                  >
                    {subscribed.includes(system.id) ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setReportIssueModal(system)}
                    className="p-2 bg-white text-orange-500 rounded-xl hover:bg-orange-50 transition-colors"
                    title="Report Issue"
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </button>
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                    {system.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-xl p-3">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Uptime (30 days)
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{system.uptime}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Avg Response Time
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{system.responseTime}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-xs text-gray-600">Status History</span>
                  <div className="flex gap-1 mt-2">
                    {[...Array(7)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-4 h-4 rounded ${i === 6 && system.status === 'degraded' ? 'bg-yellow-400' : 'bg-green-400'}`}
                        title={`Day ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Incidents Section */}
      <div className="mt-6">
        <button
          onClick={() => setShowIncidents(!showIncidents)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Recent Incidents</span>
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
              {incidents.filter(i => i.status !== 'resolved').length} Active
            </span>
          </div>
          {showIncidents ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {showIncidents && (
          <div className="mt-4 space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getIncidentStatusColor(incident.status)}`}>
                      {incident.status.toUpperCase()}
                    </span>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{incident.title}</p>
                      <p className="text-sm text-gray-500">{incident.system} • {incident.time}</p>
                    </div>
                  </div>
                  {expandedIncident === incident.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {expandedIncident === incident.id && (
                  <div className="px-4 pb-4">
                    <div className="p-4 bg-white rounded-xl">
                      <p className="text-sm text-gray-700">{incident.description}</p>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => showToast('Opening incident details...')}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          View Full Details
                        </button>
                        <button
                          onClick={() => showToast('✓ Subscribed to incident updates')}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Subscribe to Updates
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Technical status is monitored in real-time. Report any discrepancies to the engineering team.
        </p>
      </div>
    </div>

    {/* Toast Notification */}
    {toast && (
      <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-fade-in">
        {toast}
      </div>
    )}

    {/* Report Issue Modal */}
    {reportIssueModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setReportIssueModal(null)}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Report Issue</h3>
            <button onClick={() => setReportIssueModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4 p-4 bg-orange-50 rounded-2xl flex items-center gap-3">
            {(() => {
              const Icon = reportIssueModal.icon;
              return <Icon className="w-6 h-6 text-orange-600" />;
            })()}
            <div>
              <p className="font-semibold text-gray-900">{reportIssueModal.name}</p>
              <p className="text-sm text-gray-600">Current Status: <span className="font-medium">{reportIssueModal.status}</span></p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 block mb-2">Issue Description</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe the issue you're experiencing..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 block mb-2">Issue Severity</label>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((severity) => (
                <button
                  key={severity}
                  className={`p-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                    severity === 'Medium' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setReportIssueModal(null)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleReportIssue(reportIssueModal)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Report
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default TechStatusPanel;
