import './../styles/registo_design.css';
import { Fragment } from "preact";
import universityImage from './../images/university.jpg';
import logoImage from './../images/logo2.jpg';
import {
  userData,
  updateUserData
} from '../store/userStore';

const Registo = ({
  loginUrl = "/login"
}) => {
    const validateAndRedirect = (e) => {
        if (!userData.value.fullName || !userData.value.password ||
            !userData.value.confirmPassword || !userData.value.email) {
            e.preventDefault();
            alert("Por favor, preencha todos os campos do formulário.");
            return false;
        }

        if (userData.value.password !== userData.value.confirmPassword) {
            e.preventDefault();
            alert("As senhas não coincidem.");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(userData.value.email)) {
            e.preventDefault();
            alert("Por favor, insira um email válido.");
            return false;
        }

        alert("Registro concluído com sucesso!");
        return true;
    };

    return (
        <Fragment>
            <div class="background2">
                <div>
                    <img id="background-image2" src={universityImage} alt="Background" />
                </div>
                <div class="box-login2">
                    <form>
                        <div>
                            <img id="logo3" src={logoImage} alt="Logo" />
                        </div>

                        <div>
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome completo"
                                value={userData.value.fullName}
                                onInput={(e) => updateUserData("fullName", e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                id="password2"
                                placeholder="Password"
                                value={userData.value.password}
                                onInput={(e) => updateUserData("password", e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                id="password2"
                                placeholder="Confirmar password"
                                value={userData.value.confirmPassword}
                                onInput={(e) => updateUserData("confirmPassword", e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={userData.value.email}
                                onInput={(e) => updateUserData("email", e.target.value)}
                            />
                        </div>

                        <div>
                            <a
                                id="registrar"
                                href="/inicio"
                                onClick={validateAndRedirect}
                            >
                                Registrar-se
                            </a>
                        </div>

                        <div>
                            <a href={loginUrl} id="tem-conta">Já tem conta? Inicie sessão</a>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Registo;