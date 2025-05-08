import './../styles/login_design.css';
import { Fragment } from 'preact';
import universityImage from './../images/university.jpg';
import defaultLogoImage from './../images/logo2.jpg';
import LoginForm from './login-form.jsx';

const Login = ({
    backgroundImage = universityImage,
    logoImage = defaultLogoImage,
    showForgotPassword = true,
    showRegister = true,
    forgotPasswordUrl = "/recuperar",
    registerUrl = "/registo"
}) => {
    return (
        <Fragment>
            <div className="background">
                <div>
                    <img id="background-image" src={backgroundImage} alt="Universidade" />
                </div>
                <div className="box-login">
                    <div>
                        <img id="logo" src={logoImage} alt="Logo" />
                    </div>

                    <LoginForm
                        showRememberMe={false}
                        showForgotPassword={showForgotPassword}
                        showRegister={showRegister}
                        forgotPasswordUrl={forgotPasswordUrl}
                        registerUrl={registerUrl}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Login;