import './../styles/error-admin.css';
import { Fragment } from "preact";


const ErrorAdmin = () => {
    return (
        <Fragment>
            <div class="error-container2">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>Lamentamos, mas esta página é apenas destinada a administradores.</p>
                <a href="/inicio" class="btn2">Voltar à Página Inicial</a>
            </div>
        </Fragment>
    );
};

export default ErrorAdmin;