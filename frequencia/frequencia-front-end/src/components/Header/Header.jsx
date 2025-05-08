import React from 'react';
import './Header.css';
import umaLogo from '../../assets/uma-logo.svg';
import userAvatar from '../../assets/user.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={umaLogo} alt="Universidade da Madeira" className="uma-logo" />
          <div className="system-title">
            <h1>SIDoc - Serviço de Informação dos Docentes</h1>
            <span className="version">v3.2.3</span>
          </div>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <img src={userAvatar} alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
