import './../styles/header.css';
import logoImg from './../images/logo2.jpg';

const Header = () =>{
    return(
        <header>
                <div className="header-container">
                    <img id="logo2" src={logoImg} alt="Universidade da Madeira" />
                    <nav>
                        <ul>
                            <li><a href="/inicio">Início</a></li>
                            <li><a href="/geral">Geral</a></li>
                            <li className="dropdown">
                                <a href="#">Serviços</a>
                                <ul className="dropdown-content">
                                    <li><a href="/pagamentos">Pagamentos</a></li>
                                    <li><a href="/matriculas">Matrículas</a></li>
                                    <li><a href="/requerimentos">Requerimentos</a></li>
                                </ul>
                            </li>
                            <li><a href="/avaliacoes">Avaliações</a></li>
                            <li><a href="/documentos">Documentos</a></li>
                            <li className="dropdown">
                                <a href="#">Docentes</a>
                                <ul className="dropdown-content">
                                    <li><a href="/error/docente">Unidades curriculares</a></li>
                                    <li><a href="/error/docente">Matrículas</a></li>
                                    <li><a href="/error/docente">Avaliações</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#">Administração</a>
                                <ul className="dropdown-content">
                                    <li><a href="/error/admin">Unidades curriculares</a></li>
                                    <li><a href="/error/admin">Docentes (unidades curriculares)</a></li>
                                    <li><a href="/error/admin">Docentes</a></li>
                                    <li><a href="/error/admin">Alunos</a></li>
                                    <li><a href="/error/admin">Matrículas (alunos)</a></li>
                                    <li><a href="/error/admin">Matrículas (docentes)</a></li>
                                    <li><a href="/error/admin">Avaliações (alunos)</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};

export default Header;