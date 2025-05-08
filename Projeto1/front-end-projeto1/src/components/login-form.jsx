import { Fragment } from "preact";
import { authState, updateAuthState, login } from "../store/authStore";

const LoginForm = ({
  showRememberMe = true,
  showForgotPassword = true,
  showRegister = true,
  forgotPasswordUrl = "/recuperar",
  registerUrl = "/registo"
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/inicio";
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="numero-aluno"
            placeholder="Número"
            value={authState.value.studentNumber}
            onInput={(e) => updateAuthState("studentNumber", e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={authState.value.password}
            onInput={(e) => updateAuthState("password", e.target.value)}
          />
        </div>



        <div>
          <a
            id="entrar"
            href="#"
            onClick={handleSubmit}
          >
            Entrar
          </a>
        </div>

        <div>
          {showForgotPassword && (
            <a href={forgotPasswordUrl} id="recuperar-password">
              Recuperar password
            </a>
          )}
          {showRegister && (
            <a href={registerUrl} id="registe-se">
              Não tem conta? Registe-se
            </a>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;
