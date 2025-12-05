import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubCoachKpiStripProps {
  stats: {
    studentsAssigned: number;
    activeCoursesSupporting: number;
    assignmentsInQueue: number;
    upcomingSessions: number;
  };
}

const SubCoachKpiStrip: React.FC<SubCoachKpiStripProps> = ({ stats }) => {
  const navigate = useNavigate();

  const kpiTiles = [
    {
      label: 'Students Assigned',
      value: stats.studentsAssigned,
      icon: '👨‍🎓',
      color: 'from-teal-500 to-teal-600',
      route: '/subcoach/students',
    },
    {
      label: 'Courses Supporting',
      value: stats.activeCoursesSupporting,
      icon: '📚',
      color: 'from-cyan-500 to-cyan-600',
      route: '/subcoach/lessons',
    },
    {
      label: 'To Grade',
      value: stats.assignmentsInQueue,
      icon: '✍️',
      color: 'from-amber-500 to-amber-600',
      route: '/subcoach/grading',
    },
    {
      label: 'Upcoming Sessions',
      value: stats.upcomingSessions,
      icon: '📅',
      color: 'from-purple-500 to-purple-600',
      route: '/subcoach/groups',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiTiles.map((tile, index) => (
        <button
          key={index}
          onClick={() => navigate(tile.route)}
          className="bg-white rounded-2xl p-5 border border-[#EDF0FB] hover:shadow-lg transition-all text-left group"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
            {tile.icon}
          </div>
          <p className="text-2xl font-bold text-text-primary mb-1">{tile.value}</p>
          <p className="text-xs text-text-muted">{tile.label}</p>
        </button>
      ))}
    </div>
  );
};

export default SubCoachKpiStrip;
