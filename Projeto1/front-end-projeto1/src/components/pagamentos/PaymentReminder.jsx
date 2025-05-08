import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.reminders
 * @param {Function} props.onDismiss
 * @param {Function} props.onPayNow
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 * @param {Function} props.reminderContentSlot
 */

const PaymentReminder = ({ 
  reminders = [],
  onDismiss = () => {},
  onPayNow = () => {},
  headerSlot,
  emptySlot,
  footerSlot,
  reminderContentSlot
}) => {
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getUrgencyClass = (daysRemaining) => {
    if (daysRemaining < 0) return "overdue";
    if (daysRemaining <= 3) return "urgent";
    if (daysRemaining <= 7) return "warning";
    return "normal";
  };

  return (
    <div className="payment-reminder-container">
      <h2>Lembretes de Pagamentos</h2>
      
      {headerSlot && <div className="payment-reminder-header">{headerSlot}</div>}
      
      {reminders.length === 0 ? (
        <div className="payment-reminder-empty">
          {emptySlot || <p>Não há pagamentos próximos do vencimento.</p>}
        </div>
      ) : (
        <div className="payment-reminder-list">
          {reminders.map((reminder) => {
            const daysRemaining = getDaysRemaining(reminder.dueDate);
            const urgencyClass = getUrgencyClass(daysRemaining);
            
            return (
              <div key={reminder.id} className={`reminder-item ${urgencyClass}`}>
                <div className="reminder-content">
                  {reminderContentSlot ? (
                    reminderContentSlot(reminder, daysRemaining)
                  ) : (
                    <Fragment>
                      <h3>{reminder.service}</h3>
                      <p className="reminder-reference">Ref: {reminder.reference}</p>
                      <p className="reminder-amount">Valor: {reminder.amount.toFixed(2)} EUR</p>
                      <p className="reminder-due-date">
                        {daysRemaining < 0 
                          ? `Vencido há ${Math.abs(daysRemaining)} dias` 
                          : `Vence em ${daysRemaining} dias`}
                      </p>
                    </Fragment>
                  )}
                </div>
                <div className="reminder-actions">
                  <button 
                    className="btn-pay-now"
                    onClick={() => onPayNow(reminder.id)}
                  >
                    Pagar Agora
                  </button>
                  <button 
                    className="reminder-dismiss"
                    onClick={() => onDismiss(reminder.id)}
                  >
                    Dispensar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {footerSlot && <div className="payment-reminder-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentReminder;
