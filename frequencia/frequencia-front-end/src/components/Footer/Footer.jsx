import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          © {new Date().getFullYear()} Universidade da Madeira - Serviço de Desenvolvimento de Aplicações Informáticas
        </div>
      </div>
    </footer>
  );
};

export default Footer;
