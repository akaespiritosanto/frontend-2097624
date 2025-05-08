import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {number} props.totalDue 
 * @param {number} props.totalSelected 
 * @param {number} props.pendingCount
 * @param {number} props.selectedCount 
 * @param {Function} props.onPaySelected
 */

const PaymentSummary = ({ 
  totalDue = 0,
  totalSelected = 0,
  pendingCount = 0,
  selectedCount = 0,
  onPaySelected = () => {}
}) => {
  return (
    <div className="payment-summary-container">
      <div className="payment-summary-info">
        <div className="summary-item">
          <span className="summary-label">Total em Dívida:</span>
          <span className="summary-value">{totalDue.toFixed(2)} EUR</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Pagamentos Pendentes:</span>
          <span className="summary-value">{pendingCount}</span>
        </div>
        
        {selectedCount > 0 && (
          <>
            <div className="summary-item selected">
              <span className="summary-label">Total Selecionado:</span>
              <span className="summary-value">{totalSelected.toFixed(2)} EUR</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Pagamentos Selecionados:</span>
              <span className="summary-value">{selectedCount}</span>
            </div>
          </>
        )}
      </div>
      
      {selectedCount > 0 && (
        <div className="payment-summary-actions">
          <button 
            className="btn-pay-selected"
            onClick={() => onPaySelected("cartao")}
          >
            Pagar Selecionados com Cartão
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSummary;
