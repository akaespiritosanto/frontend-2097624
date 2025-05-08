import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.history 
 * @param {Function} props.getPaymentMethod 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const PaymentHistory = ({ 
  history = [],
  getPaymentMethod = () => ({}),
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <div className="payment-history-container">
      <h1>Histórico de Pagamentos</h1>
      
      {headerSlot && <div className="payment-history-header">{headerSlot}</div>}
      
      {history.length === 0 ? (
        <div className="payment-history-empty">
          {emptySlot || <p>Não há registros de pagamentos anteriores.</p>}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Data de Pagamento</th>
              <th>Valor</th>
              <th>Método</th>
              <th>ID da Transação</th>
            </tr>
          </thead>
          <tbody>
            {history.map((payment) => {
              const method = getPaymentMethod(payment.method);
              return (
                <tr key={payment.id}>
                  <td>{payment.reference}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.amount.toFixed(2)} EUR</td>
                  <td>{method ? method.name : payment.method}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
      {footerSlot && <div className="payment-history-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentHistory;
