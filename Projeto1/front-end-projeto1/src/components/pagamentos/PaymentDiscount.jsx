import { Fragment } from "preact";

const PaymentDiscount = ({ 
  discounts = [],
  selectedDiscount = null,
  onSelectDiscount = () => {},
  payment = null,
  calculatedDiscount = 0
}) => {
  return (
    <div className="payment-discount-container">
      <h2>Descontos Disponíveis</h2>
      
      <p className="payment-discount-description">
        Selecione um tipo de desconto para aplicar ao seu pagamento.
      </p>
      
      {payment && (
        <div className="payment-discount-details">
          <div className="discount-payment-info">
            <span className="discount-payment-label">Pagamento:</span>
            <span className="discount-payment-value">{payment.service}</span>
          </div>
          <div className="discount-payment-info">
            <span className="discount-payment-label">Valor Original:</span>
            <span className="discount-payment-value">{payment.amount.toFixed(2)} EUR</span>
          </div>
          {calculatedDiscount > 0 && (
            <Fragment>
              <div className="discount-payment-info highlight">
                <span className="discount-payment-label">Desconto:</span>
                <span className="discount-payment-value">-{calculatedDiscount.toFixed(2)} EUR</span>
              </div>
              <div className="discount-payment-info total">
                <span className="discount-payment-label">Valor Final:</span>
                <span className="discount-payment-value">{(payment.amount - calculatedDiscount).toFixed(2)} EUR</span>
              </div>
            </Fragment>
          )}
        </div>
      )}
      
      <div className="payment-discount-list">
        {discounts.map((discount) => (
          <div 
            key={discount.id} 
            className={`discount-item ${selectedDiscount && selectedDiscount.id === discount.id ? 'selected' : ''}`}
            onClick={() => onSelectDiscount(discount.id)}
          >
            <h3>{discount.name}</h3>
            <p className="discount-description">{discount.description}</p>
            <div className="discount-rate">Desconto: {discount.rate}%</div>
          </div>
        ))}
      </div>
      
      {selectedDiscount && (
        <div className="payment-discount-actions">
          <button className="btn-apply-discount">
            Aplicar Desconto de {selectedDiscount.rate}%
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentDiscount;
