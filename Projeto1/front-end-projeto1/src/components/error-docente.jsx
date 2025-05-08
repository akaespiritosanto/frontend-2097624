import './../styles/error-docente.css';
import { Fragment } from "preact";


const ErrorDocente = () => {
    return (
        <Fragment>
            <div class="error-container3">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>Lamentamos, mas esta página é apenas destinada a docentes.</p>
                <a href="/inicio" class="btn3">Voltar à Página Inicial</a>
            </div>
        </Fragment>
    );
};

export default ErrorDocente;