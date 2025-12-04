import React from 'react';

interface Student {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'At risk';
  progressPercent: number;
}

interface StudentProgressOverviewProps {
  students: Student[];
}

const StudentProgressOverview: React.FC<StudentProgressOverviewProps> = ({ students }) => {
  // Calculate aggregate metrics
  const totalStudents = students.length;
  const completedStudents = students.filter((s) => s.status === 'Completed').length;
  const atRiskStudents = students.filter((s) => s.status === 'At risk').length;
  const averageCompletion =
    totalStudents > 0
      ? Math.round(students.reduce((sum, s) => sum + s.progressPercent, 0) / totalStudents)
      : 0;

  // Calculate distribution by completion brackets
  const brackets = [
    { label: '0–25%', min: 0, max: 25, color: 'bg-red-400' },
    { label: '26–50%', min: 26, max: 50, color: 'bg-orange-400' },
    { label: '51–75%', min: 51, max: 75, color: 'bg-yellow-400' },
    { label: '76–100%', min: 76, max: 100, color: 'bg-green-400' },
  ];

  const distribution = brackets.map((bracket) => {
    const count = students.filter(
      (s) => s.progressPercent >= bracket.min && s.progressPercent <= bracket.max
    ).length;
    const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
    return { ...bracket, count, percentage };
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#111827] mb-6">Progress Overview</h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#304DB5] mb-1">{averageCompletion}%</div>
          <p className="text-xs text-[#5F6473]">Average completion</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#22C55E] mb-1">{completedStudents}</div>
          <p className="text-xs text-[#5F6473]">
            Completed ({totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0}%)
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#F97316] mb-1">{atRiskStudents}</div>
          <p className="text-xs text-[#5F6473]">At risk</p>
        </div>
      </div>

      {/* Distribution Breakdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-[#111827]">Completion Distribution</h4>

        {/* Stacked Bar */}
        <div className="flex h-8 rounded-lg overflow-hidden bg-[#EDF0FB]">
          {distribution.map((bracket, idx) => (
            <div
              key={idx}
              className={`${bracket.color} transition-all`}
              style={{ width: `${bracket.percentage}%` }}
              title={`${bracket.label}: ${bracket.count} students (${bracket.percentage}%)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3">
          {distribution.map((bracket, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${bracket.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-[#111827]">{bracket.label}</span>
                  <span className="text-xs text-[#5F6473]">
                    {bracket.count} ({bracket.percentage}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Insights */}
      {atRiskStudents > 0 && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-orange-900 mb-1">
                {atRiskStudents} student{atRiskStudents !== 1 ? 's' : ''} at risk
              </p>
              <p className="text-xs text-orange-700">
                Consider reaching out to students who haven't been active recently or are falling
                behind.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgressOverview;
