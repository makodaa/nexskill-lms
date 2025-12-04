import React, { useState } from 'react';

interface GlobalFilters {
  timeframe: string;
  segment: string;
}

interface FunnelAnalytics {
  totalFunnels: number;
  avgFunnelConversion: number;
  leadsGeneratedThisPeriod: number;
  funnelList: {
    id: string;
    name: string;
    entryPoint: string;
    steps: string[];
    conversionRate: number;
    dropOffByStep: { step: string; percentage: number }[];
  }[];
}

interface FunnelAnalyticsPanelProps {
  data: FunnelAnalytics;
  filters: GlobalFilters;
}

const FunnelAnalyticsPanel: React.FC<FunnelAnalyticsPanelProps> = ({ data }) => {
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);

  const selectedFunnel = data.funnelList.find((f) => f.id === selectedFunnelId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Funnel analytics</h2>
        <p className="text-gray-600 mt-1">
          Measure lead flow and conversion across key funnels.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Total Funnels</div>
          <div className="text-2xl font-bold text-gray-900">{data.totalFunnels}</div>
          <div className="text-xs text-gray-500 mt-1">Tracking active</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Avg Conversion</div>
          <div className="text-2xl font-bold text-gray-900">{data.avgFunnelConversion}%</div>
          <div className="text-xs text-blue-600 mt-1">Across all funnels</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Leads Generated</div>
          <div className="text-2xl font-bold text-gray-900">
            {data.leadsGeneratedThisPeriod.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">This period</div>
        </div>
      </div>

      {/* Funnel List */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Funnels</h3>
        <div className="space-y-4">
          {data.funnelList.map((funnel) => (
            <div key={funnel.id}>
              <div
                className={`border rounded-xl p-5 transition-all cursor-pointer ${
                  selectedFunnelId === funnel.id
                    ? 'border-[#304DB5] bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() =>
                  setSelectedFunnelId(selectedFunnelId === funnel.id ? null : funnel.id)
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{funnel.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Entry: <span className="font-medium">{funnel.entryPoint}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#304DB5]">
                      {funnel.conversionRate}%
                    </div>
                    <div className="text-xs text-gray-500">Conversion</div>
                  </div>
                </div>

                {/* Funnel Steps */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {funnel.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
                        {step}
                      </div>
                      {idx < funnel.steps.length - 1 && (
                        <span className="text-gray-400">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Expanded View */}
                {selectedFunnelId === funnel.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">
                      Step-by-Step Drop-off
                    </h5>
                    <div className="space-y-3">
                      {funnel.dropOffByStep.map((stepData, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {stepData.step}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {stepData.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                stepData.percentage >= 70
                                  ? 'bg-green-500'
                                  : stepData.percentage >= 40
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${stepData.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('View funnel details:', funnel.name);
                  }}
                  className="mt-3 text-sm text-[#304DB5] hover:text-[#5E7BFF] font-medium"
                >
                  {selectedFunnelId === funnel.id ? 'Hide breakdown' : 'View breakdown'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Funnel Visualization */}
      {selectedFunnel && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Funnel Visualization: {selectedFunnel.name}
          </h3>
          <div className="flex items-center justify-between gap-4">
            {selectedFunnel.dropOffByStep.map((step, idx) => {
              const width = step.percentage;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="bg-gradient-to-b from-[#304DB5] to-[#5E7BFF] rounded-lg flex items-center justify-center text-white font-bold transition-all"
                    style={{
                      width: '100%',
                      height: `${80 + width * 1.2}px`,
                    }}
                  >
                    {step.percentage}%
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700">{step.step}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Funnel stages sized by conversion percentage
          </p>
        </div>
      )}

      {/* Info Footer */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-orange-600 text-xl">💡</span>
          <div className="text-sm text-orange-800">
            <strong>Insight:</strong> Focus on optimizing the steps with the highest drop-off rates.
            Small improvements in early stages can significantly impact overall conversion.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelAnalyticsPanel;
