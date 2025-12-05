import React from 'react';

interface AnalyticsOverviewProps {
  compact?: boolean;
}

const OrgAnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ compact = false }) => {
  // Dummy data for charts
  const completionTrendData = [
    { month: 'Jul', value: 65 },
    { month: 'Aug', value: 70 },
    { month: 'Sep', value: 68 },
    { month: 'Oct', value: 75 },
    { month: 'Nov', value: 78 },
    { month: 'Dec', value: 82 },
  ];

  const activeLearnersTrend = [
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 75 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 82 },
    { month: 'Nov', value: 85 },
    { month: 'Dec', value: 89 },
  ];

  const topCourses = [
    { name: 'JavaScript Fundamentals', completion: 92, enrolled: 34 },
    { name: 'Product Management Basics', completion: 87, enrolled: 28 },
    { name: 'Data Analytics with Python', completion: 78, enrolled: 31 },
    { name: 'UI/UX Design Principles', completion: 85, enrolled: 26 },
  ];

  const maxValue = Math.max(...completionTrendData.map(d => d.value));

  return (
    <div className={`${compact ? 'space-y-4' : 'space-y-6'}`}>
      {/* Completion Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-text-primary">Completion Trend</h3>
            <p className="text-xs text-text-secondary">Average completion rate over time</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">78%</p>
            <p className="text-xs text-green-600 font-semibold">↑ 12% vs last period</p>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32">
          {completionTrendData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                <div
                  className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                  title={`${item.value}%`}
                />
              </div>
              <span className="text-xs text-text-muted font-medium">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <>
          {/* Active Learners Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-text-primary">Active Learners</h3>
                <p className="text-xs text-text-secondary">Monthly active learners trend</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">89</p>
                <p className="text-xs text-green-600 font-semibold">↑ 8 vs last month</p>
              </div>
            </div>
            
            {/* Line Chart Simulation */}
            <div className="flex items-end justify-between gap-2 h-32">
              {activeLearnersTrend.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(item.value / 100) * 100}%` }}
                      title={`${item.value} learners`}
                    />
                  </div>
                  <span className="text-xs text-text-muted font-medium">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Top Performing Courses</h3>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{course.name}</p>
                      <p className="text-xs text-text-muted">{course.enrolled} learners enrolled</p>
                    </div>
                    <span className="text-sm font-bold text-orange-600">{course.completion}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrgAnalyticsOverview;
