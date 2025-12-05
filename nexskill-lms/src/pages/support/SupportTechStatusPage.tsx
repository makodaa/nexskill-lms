import SupportStaffAppLayout from '../../layouts/SupportStaffAppLayout';
import TechStatusPanel from '../../components/support/TechStatusPanel';

const SupportTechStatusPage = () => {
  return (
    <SupportStaffAppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Technical Status</h1>
          <p className="text-gray-600">Monitor system health and performance metrics</p>
        </div>

        {/* Status Panel */}
        <TechStatusPanel />

        {/* Recent Incidents */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Incidents</h2>
          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">CDN Performance Degradation</h3>
                  <p className="text-sm text-gray-700 mt-1">Increased latency detected in North America region</p>
                  <span className="text-xs text-gray-600 mt-2 block">Nov 28, 2024 - 2:30 PM</span>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">MONITORING</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Database Maintenance Complete</h3>
                  <p className="text-sm text-gray-700 mt-1">Scheduled maintenance completed successfully</p>
                  <span className="text-xs text-gray-600 mt-2 block">Nov 27, 2024 - 11:00 PM</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">RESOLVED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupportStaffAppLayout>
  );
};

export default SupportTechStatusPage;
