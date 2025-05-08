import { Fragment } from "preact";

const RememberMe = ({ 
  checked = false, 
  onChange,
  label = "Lembrar-me"
}) => {
  return (
    <Fragment>
      <div className="remember-me-container">
        <label className="remember-me-label">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{label}</span>
        </label>
      </div>
    </Fragment>
  );
};

export default RememberMe;
