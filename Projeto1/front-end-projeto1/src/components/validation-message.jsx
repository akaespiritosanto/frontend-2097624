import { Fragment } from "preact";

const ValidationMessage = ({ message, type = "error" }) => {
  if (!message) return null;
  
  return (
    <Fragment>
      <div className={`validation-message ${type}`}>
        {message}
      </div>
    </Fragment>
  );
};

export default ValidationMessage;
