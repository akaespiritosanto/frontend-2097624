import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.payments 
 * @param {Function} props.onToggleSelection
 * @param {Function} props.onPayment 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const PaymentList = ({ 
  payments = [], 
  onToggleSelection = () => {},
  onPayment = () => {},
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <div className="payment-list-container">
      <h1>Pagamentos</h1>
      
      {headerSlot && <div className="payment-list-header">{headerSlot}</div>}
      
      {payments.length === 0 ? (
        <div className="payment-list-empty">
          {emptySlot || <p>Não foram encontrados pagamentos com os critérios selecionados.</p>}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Selecionar</th>
              <th>AL</th>
              <th>B</th>
              <th>Refª MB</th>
              <th>Serviço</th>
              <th>Obs</th>
              <th>Data Emissão</th>
              <th>Data Lim.</th>
              <th>Data Pag.</th>
              <th>Valor</th>
              <th>Pagar c/ Cartão de Crédito</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className={payment.status === "pago" ? "payment-paid" : ""}>
                <td>
                  {payment.status === "pendente" && (
                    <input 
                      type="checkbox" 
                      checked={payment.selected} 
                      onChange={() => onToggleSelection(payment.id)}
                    />
                  )}
                </td>
                <td>{payment.academicYear}</td>
                <td>{payment.status === "pago" ? "P" : "S"}</td>
                <td>{payment.reference}</td>
                <td>{payment.service}</td>
                <td>{payment.observation}</td>
                <td>{payment.issueDate}</td>
                <td>{payment.dueDate}</td>
                <td>{payment.paymentDate || ""}</td>
                <td>{payment.amount.toFixed(2)} EUR</td>
                <td>
                  {payment.status === "pendente" && (
                    <button onClick={() => onPayment([payment.id], "cartao")}>Pagar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {footerSlot && <div className="payment-list-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentList;
