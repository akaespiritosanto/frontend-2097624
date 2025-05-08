import './../styles/geral_design.css';
import { Fragment } from "preact";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";

const Geral = () => {
    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section class="general-info">
                    <h1>Informações Gerais</h1>
                    <p>Bem-vindo à secção de informações gerais. Aqui encontrará detalhes importantes sobre a universidade, os nossos serviços, regulamentos e muito mais. Explore o conteúdo para conhecer melhor a Universidade da Madeira.</p>

                    <div class="info-block">
                        <h2>História da Universidade</h2>
                        <p>A Universidade da Madeira foi fundada em 1988, sendo uma instituição jovem e dinâmica. Desde então, tem-se destacado no cenário nacional e internacional pela qualidade do ensino e investigação. A nossa universidade oferece uma ampla variedade de cursos, desde as ciências exatas e naturais até às ciências humanas e sociais. Ao longo dos anos, temos construído uma história de sucesso e inovação, sempre focados no desenvolvimento dos nossos alunos e na contribuição para a sociedade.</p>
                    </div>
                    <div class="info-block">
                        <h2>Missão e Valores</h2>
                        <p>A missão da Universidade da Madeira é proporcionar educação de excelência, fomentar a investigação inovadora e contribuir para o desenvolvimento social, económico e cultural da região. Os nossos valores incluem a integridade, a responsabilidade, o respeito à diversidade e o compromisso com a qualidade. Valorizamos a colaboração e o trabalho em equipa, incentivando a participação ativa de todos os membros da nossa comunidade académica.</p>
                    </div>
                    <div class="info-block">
                        <h2>Contacto</h2>
                        <p>Para mais informações, entre em contacto connosco pelo telefone <strong>(123) 456-7890</strong> ou pelo e-mail <a href="mailto:info@uma.pt">info@uma.pt</a>. Estamos à disposição para responder a todas as suas dúvidas e fornecer o suporte necessário. O nosso horário de atendimento é de segunda a sexta-feira, das 9h às 17h. Visite-nos no campus para conhecer as nossas instalações e saber mais sobre os serviços que oferecemos.</p>
                    </div>
                </section>
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Geral;
