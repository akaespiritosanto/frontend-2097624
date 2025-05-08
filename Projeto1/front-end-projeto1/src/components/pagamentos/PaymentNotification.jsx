import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Array} props.notifications 
 * @param {Function} props.onDismiss 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 * @param {Function} props.notificationContentSlot
 */

const PaymentNotification = ({ 
  notifications = [],
  onDismiss = () => {},
  headerSlot,
  emptySlot,
  footerSlot,
  notificationContentSlot
}) => {
  return (
    <div className="payment-notification-container">
      <h2>Notificações</h2>
      
      {headerSlot && <div className="payment-notification-header">{headerSlot}</div>}
      
      {notifications.length === 0 ? (
        <div className="payment-notification-empty">
          {emptySlot || <p>Não há notificações no momento.</p>}
        </div>
      ) : (
        <div className="payment-notification-list">
          {notifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.type}`}>
              <div className="notification-content">
                {notificationContentSlot ? (
                  notificationContentSlot(notification)
                ) : (
                  <Fragment>
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <span className="notification-date">{notification.date}</span>
                  </Fragment>
                )}
              </div>
              <button 
                className="notification-dismiss"
                onClick={() => onDismiss(notification.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      {footerSlot && <div className="payment-notification-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentNotification;
