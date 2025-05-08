import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Object} props.stats 
 * @param {number} props.stats.total 
 * @param {number} props.stats.present 
 * @param {number} props.stats.justifiedAbsences 
 * @param {number} props.stats.unjustifiedAbsences 
 * @param {number} props.stats.attendanceRate 
 * @param {string} props.title 
 */

const AbsenceStats = ({ 
  stats = {
    total: 0,
    present: 0,
    justifiedAbsences: 0,
    unjustifiedAbsences: 0,
    attendanceRate: 0
  },
  title = "Estatísticas de Presença"
}) => {
  return (
    <div className="absence-stats-container">
      <h1>{title}</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total de Aulas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.present}</div>
          <div className="stat-label">Presenças</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.justifiedAbsences}</div>
          <div className="stat-label">Faltas Justificadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.unjustifiedAbsences}</div>
          <div className="stat-label">Faltas Injustificadas</div>
        </div>
        <div className="stat-card attendance-rate">
          <div className="stat-value">{stats.attendanceRate}%</div>
          <div className="stat-label">Taxa de Presença</div>
        </div>
      </div>
    </div>
  );
};

export default AbsenceStats;
