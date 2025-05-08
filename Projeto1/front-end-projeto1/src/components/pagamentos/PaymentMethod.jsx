import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Object} props.method
 * @param {string} props.method.id
 * @param {string} props.method.name
 * @param {string} props.method.description
 * @param {Array} props.method.instructions
 * @param {boolean} props.method.immediate
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const PaymentMethod = ({ 
  method = {
    id: "",
    name: "",
    description: "",
    instructions: [],
    immediate: false
  },
  headerSlot,
  footerSlot
}) => {
  return (
    <div className="payment-method-container">
      <h2>Opção - {method.name}</h2>
      
      {headerSlot && <div className="payment-method-header">{headerSlot}</div>}
      
      <p>{method.description}</p>
      
      <p className="payment-processing">
        Processamento de Transações - {method.immediate ? "IMEDIATO" : "NÃO IMEDIATO"}
      </p>
      
      {method.instructions && method.instructions.length > 0 && (
        <>
          <p>Processo de Pagamento</p>
          <ul>
            {method.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </>
      )}
      
      {footerSlot && <div className="payment-method-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentMethod;
