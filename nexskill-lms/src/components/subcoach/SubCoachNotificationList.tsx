import React from 'react';

interface Notification {
  id: string;
  type: 'assignment' | 'question' | 'session' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface SubCoachNotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (notificationId: string) => void;
  onNotificationClick?: (notificationId: string) => void;
}

const SubCoachNotificationList: React.FC<SubCoachNotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onNotificationClick,
}) => {
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return '✍️';
      case 'question':
        return '❓';
      case 'session':
        return '📅';
      case 'system':
        return '🔔';
      default:
        return '📬';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return 'bg-amber-50 border-amber-200';
      case 'question':
        return 'bg-blue-50 border-blue-200';
      case 'session':
        return 'bg-purple-50 border-purple-200';
      case 'system':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-xl p-5 border transition-all ${
            notification.read
              ? 'bg-white border-[#EDF0FB] opacity-70'
              : `${getTypeColor(notification.type)} shadow-sm`
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl flex-shrink-0 border border-[#EDF0FB]">
              {getTypeIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="text-sm font-semibold text-text-primary">
                  {notification.title}
                </h4>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
                )}
              </div>
              <p className="text-sm text-text-secondary mb-3">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{notification.timestamp}</span>
                <div className="flex items-center gap-3">
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead?.(notification.id)}
                      className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => onNotificationClick?.(notification.id)}
                    className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                  >
                    View →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#EDF0FB]">
          <div className="text-4xl mb-3">📬</div>
          <p className="text-text-primary font-medium mb-1">No notifications</p>
          <p className="text-sm text-text-muted">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default SubCoachNotificationList;
