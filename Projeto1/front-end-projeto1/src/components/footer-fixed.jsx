import './../styles/footer_fixed.css';

const FooterFixed = () =>{
    return(
        <footer class="footer">
                <div>
                    <p>Universidade da Madeira - InfoAlunos © 2025</p>
                    <ul id="footer-list">
                        <li id="footer-element"><a id="footer-link" href="/geral">Sobre</a></li>
                        <li id="footer-element"><a  id="footer-link" href="/geral">Contactos</a></li>
                        <li id="footer-element"><a  id="footer-link" href="/politicas">Políticas</a></li>
                    </ul>
                </div>
            </footer>
    );
};

export default FooterFixed;