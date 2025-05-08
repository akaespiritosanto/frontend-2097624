import './../styles/error.css';
import { Fragment } from "preact";


const Error = () => {
    return (
        <Fragment>
            <div class="error-container">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>Lamentamos, mas a página que procura não está disponível.</p>
                <a href="/inicio" class="btn">Voltar à Página Inicial</a>
            </div>
        </Fragment>
    );
};

export default Error;