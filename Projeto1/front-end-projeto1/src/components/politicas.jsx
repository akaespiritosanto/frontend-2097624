import './../styles/politicas_design.css';
import { Fragment } from "preact";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";

const Politicas = () => {
    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section class="policies">
                    <h1><u>Políticas do Site:</u></h1>
                    <h2>Privacidade</h2>
                    <p>Respeitamos a sua privacidade e estamos comprometidos em proteger as suas informações pessoais. Todas as informações recolhidas são utilizadas apenas para fins académicos e administrativos.</p>

                    <h2>Termos de Uso</h2>
                    <p>Ao utilizar este site, você concorda com os nossos termos de uso. O uso indevido das informações e recursos disponíveis no site pode resultar em ações disciplinares.</p>

                    <h2>Segurança</h2>
                    <p>Implementamos medidas de segurança para proteger as suas informações contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir a segurança absoluta das informações transmitidas pela internet.</p>

                    <h2>Cookies</h2>
                    <p>Utilizamos cookies para melhorar a sua experiência de navegação. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a lembrar das suas preferências e a melhorar a funcionalidade do site.</p>

                    <h2>Alterações às Políticas</h2>
                    <p>Reservamo-nos o direito de alterar estas políticas a qualquer momento. Quaisquer alterações serão publicadas nesta página e entrarão em vigor imediatamente após a publicação.</p>
                </section>
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Politicas;