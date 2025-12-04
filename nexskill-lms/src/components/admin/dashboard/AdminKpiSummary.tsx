import React from 'react';

interface KpiSummary {
  totalUsers: number;
  usersGrowth: string;
  totalCoaches: number;
  coachesGrowth: string;
  activeCourses: number;
  coursesGrowth: string;
  activeStudents: number;
  studentsGrowth: string;
  avgRating: number;
  ratingChange: string;
}

interface AdminKpiSummaryProps {
  summary: KpiSummary;
}

const AdminKpiSummary: React.FC<AdminKpiSummaryProps> = ({ summary }) => {
  const kpis = [
    {
      label: 'Total Users',
      value: summary.totalUsers.toLocaleString(),
      growth: summary.usersGrowth,
      icon: '👥',
      gradient: 'from-[#304DB5] to-[#5E7BFF]',
    },
    {
      label: 'Total Coaches',
      value: summary.totalCoaches.toLocaleString(),
      growth: summary.coachesGrowth,
      icon: '🎓',
      gradient: 'from-[#22C55E] to-[#10B981]',
    },
    {
      label: 'Active Courses',
      value: summary.activeCourses.toLocaleString(),
      growth: summary.coursesGrowth,
      icon: '📚',
      gradient: 'from-[#F59E0B] to-[#EAB308]',
    },
    {
      label: 'Active Students',
      value: summary.activeStudents.toLocaleString(),
      growth: summary.studentsGrowth,
      icon: '🔥',
      gradient: 'from-[#EF4444] to-[#DC2626]',
    },
    {
      label: 'Avg Course Rating',
      value: summary.avgRating.toFixed(1),
      growth: summary.ratingChange,
      icon: '⭐',
      gradient: 'from-[#8B5CF6] to-[#7C3AED]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-[#EDF0FB] p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${kpi.gradient} rounded-xl flex items-center justify-center text-2xl shadow-md`}
            >
              {kpi.icon}
            </div>
          </div>
          <div>
            <p className="text-sm text-[#9CA3B5] font-semibold mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-[#111827] mb-2">{kpi.value}</p>
            <p
              className={`text-xs font-semibold ${
                kpi.growth.startsWith('+') ? 'text-[#22C55E]' : 'text-[#9CA3B5]'
              }`}
            >
              {kpi.growth}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminKpiSummary;
