import { render } from 'preact';
import { Router } from "preact-router";
import Login from "./components/login.jsx";
import Inicio from "./components/inicio.jsx";
import Geral from "./components/geral.jsx";
import Pagamentos from "./components/pagamentos.jsx";
import Matriculas from "./components/matriculas.jsx";
import Requerimentos from "./components/requerimentos.jsx";
import Avaliacoes from "./components/avaliacoes.jsx";
import Documentos from "./components/documentos.jsx";
import Atividades from "./components/atividades.jsx";
import Faltas from "./components/faltas.jsx";
import Horarios from "./components/horarios.jsx";
import Pautas from "./components/pautas.jsx";
import Politicas from "./components/politicas.jsx";
import Registo from "./components/registo.jsx";
import Error from "./components/error.jsx";
import ErrorAdmin from "./components/error-admin.jsx";
import ErrorDocente from "./components/error-admin.jsx";

const Main = () => {
    return (
        <div>
            <Router>
                <Login path="/login" />
                <Inicio path="/inicio" />
                <Geral path="/geral" />
                <Pagamentos path="/pagamentos" />
                <Matriculas path="/matriculas" />
                <Requerimentos path="/requerimentos" />
                <Avaliacoes path="/avaliacoes" />
                <Documentos path="/documentos" />
                <Atividades path="/atividades" />
                <Faltas path="/faltas" />
                <Horarios path="/horarios" />
                <Pautas path="/pautas" />
                <Politicas path="/politicas" />
                <Registo path="/registo" loginUrl="/login" />
                <ErrorAdmin path="/error/admin" />
                <ErrorDocente path="/error/docente" />
                <Error path="/error" />
                <Inicio path="/" />
            </Router>
        </div>
    );
};

render(<Main />, document.getElementById("app"));
