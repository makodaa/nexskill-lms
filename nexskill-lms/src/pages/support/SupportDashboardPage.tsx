import { useNavigate } from 'react-router-dom';
import SupportStaffAppLayout from '../../layouts/SupportStaffAppLayout';
import SupportKpiStrip from '../../components/support/SupportKpiStrip';
import { Ticket, TrendingUp, Clock, Award } from 'lucide-react';

const SupportDashboardPage = () => {
  const navigate = useNavigate();
  
  const recentActivity = [
    { type: 'ticket', message: 'New ticket opened by Sarah Chen', time: '5 minutes ago', priority: 'high' },
    { type: 'resolved', message: 'Ticket T-2398 resolved successfully', time: '15 minutes ago', priority: 'low' },
    { type: 'certificate', message: 'Certificate resent to Michael Brown', time: '1 hour ago', priority: 'medium' },
    { type: 'ticket', message: 'Urgent ticket from Emma Wilson', time: '2 hours ago', priority: 'urgent' },
  ];

  const quickStats = [
    { label: 'Tickets Today', value: '18', icon: Ticket, color: 'text-blue-600' },
    { label: 'Avg Resolution', value: '3.2h', icon: Clock, color: 'text-indigo-600' },
    { label: 'Satisfaction Rate', value: '94%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Certificates Resent', value: '12', icon: Award, color: 'text-pink-600' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <SupportStaffAppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Dashboard</h1>
          <p className="text-gray-600">Monitor tickets, student issues, and system status</p>
        </div>

        {/* KPI Strip */}
        <SupportKpiStrip />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(activity.priority)}`} style={{ boxShadow: '0 0 8px currentColor' }} />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <span className="text-sm text-gray-600">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Stats</h2>
            <div className="space-y-4">
              {quickStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                      <span className="text-sm text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/support/tickets')}
              className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              View All Tickets
            </button>
            <button 
              onClick={() => navigate('/support/tech-status')}
              className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Check Tech Status
            </button>
            <button 
              onClick={() => navigate('/support/knowledge-base')}
              className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Browse Knowledge Base
            </button>
            <button 
              onClick={() => navigate('/support/students')}
              className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Search Students
            </button>
          </div>
        </div>
      </div>
    </SupportStaffAppLayout>
  );
};

export default SupportDashboardPage;
