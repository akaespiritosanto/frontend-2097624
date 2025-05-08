import { Fragment } from 'preact';
import './../styles/inicio_design.css';
import matriculaImg from './../images/matricula.png';
import taxasImg from './../images/taxas.jpg';
import eventosImg from './../images/eventos.jpg';
import FooterRelative from "./footer-relative.jsx";
import Header from "./header.jsx";


const Inicio = () => {
    return (
        <Fragment>
            <div>
                <Header/>
            </div>

            <main>
                <section className="dashboard">
                    <h1>Bem-vindo ao InfoAlunos</h1>
                    <p>Selecione uma das opções abaixo para navegar no sistema.</p>
                    <div className="modules">
                        <a href="/matriculas" className="module">
                            <span className="module-title">Matrícula</span>
                            <div>
                                <span className="module-description">Gerencie a sua matrícula académica</span>
                            </div>
                        </a>
                        <a href="/pautas" className="module">
                            <span className="module-title">Pautas</span>
                            <div>
                                <span className="module-description">Consulte as suas notas e avaliações</span>
                            </div>
                        </a>
                        <a href="/horarios" className="module">
                            <span className="module-title">Horários/Sumários</span>
                            <div>
                                <span className="module-description">Veja os horários e conteúdos das aulas</span>
                            </div>
                        </a>
                        <a href="/faltas" className="module">
                            <span className="module-title">Gestão de Faltas</span>
                            <div>
                                <span className="module-description">Acompanhe as suas faltas</span>
                            </div>
                        </a>
                        <a href="/requerimentos" className="module">
                            <span className="module-title">Requerimentos</span>
                            <div>
                                <span className="module-description">Solicite documentos ou alterações</span>
                            </div>
                        </a>
                        <a href="/documentos" className="module">
                            <span className="module-title">Documentação</span>
                            <div>
                                <span className="module-description">Acesse e baixe documentos importantes</span>
                            </div>
                        </a>
                        <a href="/pagamentos" className="module">
                            <span className="module-title">Pagamentos</span>
                            <div>
                                <span className="module-description">Gerencie pagamentos de taxas</span>
                            </div>
                        </a>
                        <a href="/atividades" className="module">
                            <span className="module-title">Atividades/Eventos</span>
                            <div>
                                <span className="module-description">Participe em eventos e atividades</span>
                            </div>
                        </a>
                    </div>
                </section>

                <section className="highlights">
                    <h2>Novidades e Destaques</h2>
                    <div className="highlight-cards">
                        <div className="highlight-card">
                            <img src={matriculaImg} alt="Novidade 1" />
                            <h3>Nova plataforma de matrículas</h3>
                            <p>Descubra como utilizar a nova plataforma de matrículas online para o próximo semestre.</p>
                        </div>
                        <div className="highlight-card">
                            <img src={eventosImg} alt="Novidade 2" />
                            <h3>Eventos Académicos</h3>
                            <p>Confira a agenda de eventos académicos e não perca nenhuma oportunidade.</p>
                        </div>
                        <div className="highlight-card">
                            <img src={taxasImg} alt="Novidade 3" />
                            <h3>Descontos em taxas</h3>
                            <p>Saiba mais sobre os descontos disponíveis para pagamentos antecipados.</p>
                        </div>
                    </div>
                </section>
            </main>

            <div>
                <FooterRelative />
            </div>
        </Fragment>
    );
};

export default Inicio;