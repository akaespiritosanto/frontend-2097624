import { Fragment } from "preact";

const LoginAnnouncement = ({ 
  title = "Anúncio Importante", 
  message = "Não há anúncios no momento.",
  bgColor = "rgba(80, 65, 209, 0.7)",
  textColor = "white"
}) => {
  return (
    <Fragment>
      <div 
        style={{ 
          backgroundColor: bgColor, 
          padding: "15px", 
          borderRadius: "8px",
          color: textColor,
          marginBottom: "15px"
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>{title}</h3>
        <p style={{ fontSize: "14px" }}>{message}</p>
      </div>
    </Fragment>
  );
};

export default LoginAnnouncement;
