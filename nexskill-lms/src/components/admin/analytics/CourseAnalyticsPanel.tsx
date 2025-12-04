import React from 'react';

interface GlobalFilters {
  timeframe: string;
  segment: string;
}

interface CourseAnalytics {
  totalCourses: number;
  activeCourses: number;
  avgCompletionRate: number;
  avgRating: number;
  enrollmentsTrend: { label: string; value: number }[];
  categoryBreakdown: { category: string; enrollments: number; completionRate: number }[];
  topCourses: { title: string; enrollments: number; rating: number; completionRate: number }[];
}

interface CourseAnalyticsPanelProps {
  data: CourseAnalytics;
  filters: GlobalFilters;
}

const CourseAnalyticsPanel: React.FC<CourseAnalyticsPanelProps> = ({ data }) => {
  const maxEnrollmentTrend = Math.max(...data.enrollmentsTrend.map((t) => t.value));
  const maxCategoryEnrollments = Math.max(...data.categoryBreakdown.map((c) => c.enrollments));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Course analytics</h2>
        <p className="text-gray-600 mt-1">Understand course performance and student outcomes.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Total Courses</div>
          <div className="text-2xl font-bold text-gray-900">{data.totalCourses}</div>
          <div className="text-xs text-gray-500 mt-1">In library</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Active Courses</div>
          <div className="text-2xl font-bold text-gray-900">{data.activeCourses}</div>
          <div className="text-xs text-green-600 mt-1">With enrollments</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Avg Completion Rate</div>
          <div className="text-2xl font-bold text-gray-900">{data.avgCompletionRate}%</div>
          <div className="text-xs text-blue-600 mt-1">Platform average</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Avg Rating</div>
          <div className="text-2xl font-bold text-gray-900">{data.avgRating} ⭐</div>
          <div className="text-xs text-yellow-600 mt-1">Student feedback</div>
        </div>
      </div>

      {/* Enrollment Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trend</h3>
        <div className="flex items-end justify-between gap-4 h-48">
          {data.enrollmentsTrend.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all"
                  style={{ height: `${(point.value / maxEnrollmentTrend) * 100}%` }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-700">{point.label}</div>
                <div className="text-xs text-gray-500">{point.value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">New course enrollments over time</p>
      </div>

      {/* Category Breakdown & Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {data.categoryBreakdown.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {category.enrollments.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{category.completionRate}% completion</div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] h-2 rounded-full transition-all"
                    style={{ width: `${(category.enrollments / maxCategoryEnrollments) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Courses</h3>
          <div className="space-y-3">
            {data.topCourses.map((course, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#304DB5] hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <span>👥 {course.enrollments.toLocaleString()}</span>
                    <span>•</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <div className="text-green-600 font-medium">{course.completionRate}% done</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl">💡</span>
          <div className="text-sm text-green-800">
            <strong>Insight:</strong> Courses with completion rates above 70% tend to have better
            ratings and higher retention. Focus on improving course structure and engagement for
            lower-performing categories.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalyticsPanel;
