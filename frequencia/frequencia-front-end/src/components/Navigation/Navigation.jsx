import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'summaries', label: 'Sumários' },
    { id: 'attendance', label: 'Assiduidade' },
    { id: 'schedule', label: 'Calendário' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-tabs">
          {tabs.map(tab => (
            <li 
              key={tab.id} 
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
