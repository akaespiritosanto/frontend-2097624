import { Fragment } from "preact";
import { useSignal } from "@preact/signals";

const ScheduleNotifications = ({
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  const isExpanded = useSignal(false);
  
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };
  
  const handleMarkAsRead = (notificationId, event) => {
    event.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }
  };
  
  const handleMarkAllAsRead = (event) => {
    event.stopPropagation();
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case "schedule_change":
        return "🕒";
      case "summary_added":
        return "📝";
      case "event_reminder":
        return "📅";
      case "event_added":
        return "🆕";
      default:
        return "📢";
    }
  };
  
  return (
    <div className={`schedule-notifications ${isExpanded.value ? 'expanded' : ''}`}>
      <div className="notifications-header" onClick={toggleExpand}>
        <h3>Notificações</h3>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
        <button 
          className="toggle-button"
          aria-label={isExpanded.value ? "Fechar notificações" : "Abrir notificações"}
        >
          {isExpanded.value ? "▲" : "▼"}
        </button>
      </div>
      
      {isExpanded.value && (
        <div className="notifications-content">
          {notifications.length > 0 ? (
            <Fragment>
              <div className="notifications-actions">
                <button 
                  className="mark-all-read"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Marcar todas como lidas
                </button>
              </div>
              
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  >
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-date">{notification.date}</div>
                    </div>
                    {!notification.read && (
                      <button 
                        className="mark-read-button"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        aria-label="Marcar como lida"
                      >
                        ✓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Fragment>
          ) : (
            <p className="no-notifications">Não existem notificações.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleNotifications;
