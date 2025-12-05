import { Server, Database, Globe, Wifi, AlertCircle, CheckCircle } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  responseTime: string;
  icon: any;
}

const TechStatusPanel = () => {
  const systems: SystemStatus[] = [
    { name: 'Web Application', status: 'operational', uptime: '99.9%', responseTime: '145ms', icon: Globe },
    { name: 'API Server', status: 'operational', uptime: '99.8%', responseTime: '89ms', icon: Server },
    { name: 'Database', status: 'operational', uptime: '100%', responseTime: '12ms', icon: Database },
    { name: 'CDN', status: 'degraded', uptime: '98.5%', responseTime: '320ms', icon: Wifi },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle, iconColor: 'text-green-600' };
      case 'degraded': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: AlertCircle, iconColor: 'text-yellow-600' };
      case 'down': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertCircle, iconColor: 'text-red-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: AlertCircle, iconColor: 'text-gray-600' };
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">System Status Monitor</h3>
      
      <div className="space-y-4">
        {systems.map((system, idx) => {
          const Icon = system.icon;
          const statusConfig = getStatusColor(system.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={idx} className="bg-gray-50 rounded-2xl p-5">
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
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                  {system.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-xl p-3">
                  <span className="text-xs text-gray-600">Uptime (30 days)</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{system.uptime}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-xs text-gray-600">Avg Response Time</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{system.responseTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Technical status is monitored in real-time. Report any discrepancies to the engineering team.
        </p>
      </div>
    </div>
  );
};

export default TechStatusPanel;
