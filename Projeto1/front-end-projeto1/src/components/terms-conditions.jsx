import { Fragment } from "preact";

const TermsAndConditions = ({ accepted, onAcceptChange }) => {
  return (
    <Fragment>
      <div className="terms-container">
        <label className="terms-label">
          <input 
            type="checkbox" 
            checked={accepted} 
            onChange={(e) => onAcceptChange(e.target.checked)}
          />
          <span>Aceito os termos e condições de uso</span>
        </label>
        <div className="terms-text">
          <p>
            Ao criar uma conta, você concorda com os termos de serviço e política de privacidade
            da Universidade da Madeira. Seus dados serão processados de acordo com a LGPD.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;
