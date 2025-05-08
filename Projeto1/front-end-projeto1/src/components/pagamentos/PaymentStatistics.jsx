import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {number} props.totalPaid
 * @param {number} props.totalPending 
 * @param {number} props.totalOverdue 
 * @param {Object} props.paymentsByType
 * @param {Object} props.paymentsByMonth 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.footerSlot 
 * @param {React.ReactNode} props.chartSlot 
 */

const PaymentStatistics = ({ 
  totalPaid = 0,
  totalPending = 0,
  totalOverdue = 0,
  paymentsByType = {},
  paymentsByMonth = {},
  headerSlot,
  footerSlot,
  chartSlot
}) => {
  return (
    <div className="payment-statistics-container">
      <h2>Estatísticas de Pagamentos</h2>
      
      {headerSlot && <div className="payment-statistics-header">{headerSlot}</div>}
      
      <div className="payment-statistics-summary">
        <div className="statistic-item">
          <span className="statistic-label">Total Pago:</span>
          <span className="statistic-value paid">{totalPaid.toFixed(2)} EUR</span>
        </div>
        
        <div className="statistic-item">
          <span className="statistic-label">Total Pendente:</span>
          <span className="statistic-value pending">{totalPending.toFixed(2)} EUR</span>
        </div>
        
        <div className="statistic-item">
          <span className="statistic-label">Total em Atraso:</span>
          <span className="statistic-value overdue">{totalOverdue.toFixed(2)} EUR</span>
        </div>
      </div>
      
      {chartSlot ? (
        <div className="payment-statistics-chart">
          {chartSlot}
        </div>
      ) : (
        <div className="payment-statistics-details">
          <div className="payment-by-type">
            <h3>Pagamentos por Tipo</h3>
            <ul>
              {Object.entries(paymentsByType).map(([type, amount]) => (
                <li key={type}>
                  <span>{type}:</span>
                  <span>{amount.toFixed(2)} EUR</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="payment-by-month">
            <h3>Pagamentos por Mês</h3>
            <ul>
              {Object.entries(paymentsByMonth).map(([month, amount]) => (
                <li key={month}>
                  <span>{month}:</span>
                  <span>{amount.toFixed(2)} EUR</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {footerSlot && <div className="payment-statistics-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentStatistics;
