import { Fragment } from "preact";

const Notification = ({ 
  message, 
  type = "error", 
  onClose = null,
  visible = true
}) => {
  if (!message || !visible) return null;
  
  return (
    <Fragment>
      <div className={`notification ${type}`}>
        <span className="notification-message">{message}</span>
        {onClose && (
          <button 
            className="notification-close" 
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Notification;
