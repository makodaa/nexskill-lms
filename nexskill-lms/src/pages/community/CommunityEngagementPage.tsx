import React from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import EngagementMetricsPanel from '../../components/community/EngagementMetricsPanel';

const CommunityEngagementPage: React.FC = () => {
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [exportOptions, setExportOptions] = React.useState({
    format: 'pdf',
    period: 'last-30-days',
    includeCharts: true,
  });

  const handleExportReport = () => {
    console.log('Exporting report:', exportOptions);
    alert(`📥 Engagement report exported!\n\nFormat: ${exportOptions.format.toUpperCase()}\nPeriod: ${exportOptions.period}\nCharts included: ${exportOptions.includeCharts ? 'Yes' : 'No'}`);
    setShowExportModal(false);
  };

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Engagement & Reports</h1>
            <p className="text-sm text-text-secondary">
              Track community engagement metrics and activity trends
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📥 Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Avg Daily Posts</span>
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">46</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Avg Daily Comments</span>
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">178</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% vs last week</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Response Rate</span>
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">82%</p>
              <p className="text-xs text-blue-600 mt-1">Within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Member Satisfaction</span>
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">4.6</p>
              <p className="text-xs text-text-muted mt-1">Out of 5.0</p>
            </div>
          </div>

          {/* Engagement Metrics Panel */}
          <EngagementMetricsPanel />

          {/* Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Patterns */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-text-primary mb-4">Activity Patterns</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">Peak Activity</p>
                      <p className="text-xs text-text-secondary">
                        Thursdays see 35% more engagement than other weekdays. Consider scheduling important announcements on Thursdays.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">High Engagement Communities</p>
                      <p className="text-xs text-text-secondary">
                        General Discussion and JavaScript Mastery have consistently high engagement rates above 70%.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">Attention Needed</p>
                      <p className="text-xs text-text-secondary">
                        Mobile Dev Community and Data Analytics Cohort have lower engagement. Consider intervention strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Health Score */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-text-primary mb-4">Community Health Score</h3>
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                      <div>
                        <p className="text-4xl font-bold text-green-600">8.4</p>
                        <p className="text-xs text-text-muted">out of 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Activity Level</span>
                    <span className="text-xs font-semibold text-text-primary">9.2</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Response Quality</span>
                    <span className="text-xs font-semibold text-text-primary">8.6</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Member Retention</span>
                    <span className="text-xs font-semibold text-text-primary">7.8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Content Quality</span>
                    <span className="text-xs font-semibold text-text-primary">8.1</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-[#EDF0FB]">
              <h3 className="text-xl font-bold text-text-primary">Export Engagement Report</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Report Format
                </label>
                <select
                  value={exportOptions.format}
                  onChange={(e) => setExportOptions({ ...exportOptions, format: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="pdf">PDF - Portable Document Format</option>
                  <option value="xlsx">XLSX - Excel Spreadsheet</option>
                  <option value="csv">CSV - Comma Separated Values</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Time Period
                </label>
                <select
                  value={exportOptions.period}
                  onChange={(e) => setExportOptions({ ...exportOptions, period: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeCharts"
                  checked={exportOptions.includeCharts}
                  onChange={(e) => setExportOptions({ ...exportOptions, includeCharts: e.target.checked })}
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="includeCharts" className="text-sm text-text-secondary">
                  Include charts and visualizations
                </label>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-2">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="text-xs text-green-700 font-medium mb-1">Report will include:</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Daily/weekly engagement metrics</li>
                      <li>• Community activity breakdown</li>
                      <li>• Top contributors and moderators</li>
                      <li>• Response time analytics</li>
                      <li>• Member satisfaction scores</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#EDF0FB] flex justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-6 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExportReport}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-xl transition-all"
              >
                📥 Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </CommunityManagerLayout>
  );
};

export default CommunityEngagementPage;
