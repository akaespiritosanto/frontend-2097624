import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Object} props.stats
 * @param {number} props.stats.total 
 * @param {number} props.stats.pending 
 * @param {number} props.stats.inAnalysis 
 * @param {number} props.stats.approved 
 * @param {number} props.stats.rejected 
 * @param {number} props.stats.canceled 
 * @param {string} props.title 
 */

const RequestStats = ({ 
  stats = {
    total: 0,
    pending: 0,
    inAnalysis: 0,
    approved: 0,
    rejected: 0,
    canceled: 0
  },
  title = "Estatísticas de Requerimentos"
}) => {
  return (
    <div className="request-stats-container">
      <h1>{title}</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total de Requerimentos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pendentes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.inAnalysis}</div>
          <div className="stat-label">Em Análise</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.approved}</div>
          <div className="stat-label">Deferidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.rejected}</div>
          <div className="stat-label">Indeferidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.canceled}</div>
          <div className="stat-label">Cancelados</div>
        </div>
      </div>
    </div>
  );
};

export default RequestStats;
