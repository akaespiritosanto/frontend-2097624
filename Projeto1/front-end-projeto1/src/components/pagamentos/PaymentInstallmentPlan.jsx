import { Fragment } from "preact";

const PaymentInstallmentPlan = ({ 
  plans = [],
  selectedPlan = null,
  onSelectPlan = () => {},
  headerSlot,
  footerSlot,
  planItemSlot,
  descriptionSlot
}) => {
  return (
    <div className="payment-installment-plan-container">
      <h2>Planos de Pagamento</h2>
      
      {headerSlot && <div className="payment-installment-plan-header">{headerSlot}</div>}
      
      {descriptionSlot ? (
        <div className="payment-installment-plan-description">{descriptionSlot}</div>
      ) : (
        <p className="payment-installment-plan-description">
          Escolha um plano de pagamento que melhor se adapte às suas necessidades.
          Planos com menos prestações oferecem descontos maiores.
        </p>
      )}
      
      <div className="payment-installment-plan-list">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-item ${selectedPlan && selectedPlan.id === plan.id ? 'selected' : ''}`}
            onClick={() => onSelectPlan(plan.id)}
          >
            {planItemSlot ? (
              planItemSlot(plan)
            ) : (
              <Fragment>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-details">
                  <span className="plan-installments">{plan.numberOfInstallments} prestações</span>
                  {plan.discountRate > 0 && (
                    <span className="plan-discount">Desconto: {plan.discountRate}%</span>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        ))}
      </div>
      
      {footerSlot && <div className="payment-installment-plan-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentInstallmentPlan;
