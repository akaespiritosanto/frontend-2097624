import { Fragment } from "preact";

const PaymentReceipt = ({ 
  receipt = null,
  onPrint = () => {},
  onDownload = () => {},
  headerSlot,
  footerSlot,
  receiptContentSlot,
  actionsSlot
}) => {
  if (!receipt) return null;
  
  return (
    <div className="payment-receipt-container">
      {headerSlot ? (
        <div className="payment-receipt-header">{headerSlot}</div>
      ) : (
        <div className="payment-receipt-header">
          <h2>Recibo de Pagamento</h2>
          <div className="receipt-number">Nº {receipt.receiptNumber}</div>
        </div>
      )}
      
      <div className="payment-receipt-content">
        {receiptContentSlot ? (
          receiptContentSlot(receipt)
        ) : (
          <Fragment>
            <div className="receipt-section">
              <h3>Dados do Estudante</h3>
              <div className="receipt-info">
                <span className="receipt-label">Nome:</span>
                <span className="receipt-value">{receipt.studentName}</span>
              </div>
              <div className="receipt-info">
                <span className="receipt-label">Número:</span>
                <span className="receipt-value">{receipt.studentId}</span>
              </div>
            </div>
            
            <div className="receipt-section">
              <h3>Dados do Pagamento</h3>
              <div className="receipt-info">
                <span className="receipt-label">Serviço:</span>
                <span className="receipt-value">{receipt.service}</span>
              </div>
              <div className="receipt-info">
                <span className="receipt-label">Referência:</span>
                <span className="receipt-value">{receipt.reference}</span>
              </div>
              <div className="receipt-info">
                <span className="receipt-label">Data de Pagamento:</span>
                <span className="receipt-value">{receipt.paymentDate}</span>
              </div>
              <div className="receipt-info">
                <span className="receipt-label">Data de Emissão:</span>
                <span className="receipt-value">{receipt.issueDate}</span>
              </div>
              <div className="receipt-info total">
                <span className="receipt-label">Valor Pago:</span>
                <span className="receipt-value">{receipt.amount.toFixed(2)} EUR</span>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      
      {actionsSlot ? (
        <div className="payment-receipt-actions">{actionsSlot}</div>
      ) : (
        <div className="payment-receipt-actions">
          <button className="btn-print-receipt" onClick={onPrint}>
            Imprimir Recibo
          </button>
          <button className="btn-download-receipt" onClick={onDownload}>
            Baixar PDF
          </button>
        </div>
      )}
      
      {footerSlot && <div className="payment-receipt-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentReceipt;
