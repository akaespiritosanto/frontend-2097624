import { Fragment } from "preact";

const FormInput = ({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error,
  className = ""
}) => {
  return (
    <Fragment>
      <div>
        <input 
          type={type} 
          id={id} 
          placeholder={placeholder}
          value={value}
          onInput={(e) => onChange(e.target.value)}
          className={className}
        />
        {error && <p className="input-error">{error}</p>}
      </div>
    </Fragment>
  );
};

export default FormInput;
