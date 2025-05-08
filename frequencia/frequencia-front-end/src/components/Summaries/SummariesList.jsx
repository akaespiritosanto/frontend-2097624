import React, { useState } from 'react';
import './SummariesList.css';
import defaultLogo from '../../assets/logo.png';

const SummariesList = ({ summaries, onSelectSummary }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSummaries = summaries.filter(summary =>
    summary.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="summaries-list">
      <div className="list-header">
        <h2>Registo de Assiduidade: Design Hipermédia</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <table className="summaries-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Foto</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredSummaries.map((summary, index) => (
            <tr key={summary.id} onClick={() => onSelectSummary(summary.id)}>
              <td>{index + 1}</td>
              <td>
                <div className="avatar">
                  <img src={summary.avatar || defaultLogo} alt="Avatar" />
                </div>
              </td>
              <td>{summary.date}</td>
              <td>{summary.description}</td>
              <td>
                <span className={`status-indicator ${summary.status}`}>
                  {summary.status === 'completed' ? '✓' : '⏱'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="pagination-btn">Anterior</button>
        <span className="page-info">Página 1 de 5</span>
        <button className="pagination-btn">Próxima</button>
      </div>
    </div>
  );
};

export default SummariesList;
