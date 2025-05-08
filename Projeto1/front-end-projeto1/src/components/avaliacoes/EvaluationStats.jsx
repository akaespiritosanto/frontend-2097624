import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Object} props.stat
 * @param {string} props.title
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.footerSlot
 */

const EvaluationStats = ({ 
  stats = {}, 
  title,
  headerSlot,
  footerSlot
}) => {
  return (
    <div className="evaluation-stats">
      <h2>{title || "Estatísticas de Avaliações"}</h2>
      
      {headerSlot && <div className="stats-header-slot">{headerSlot}</div>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.average}</div>
          <div className="stat-label">Média</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.highest}</div>
          <div className="stat-label">Nota Mais Alta</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.lowest}</div>
          <div className="stat-label">Nota Mais Baixa</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Avaliações Concluídas</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Avaliações Pendentes</div>
        </div>
      </div>
      
      {footerSlot && <div className="stats-footer-slot">{footerSlot}</div>}
    </div>
  );
};

export default EvaluationStats;
