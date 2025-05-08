import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.evaluations
 * @param {Function} props.getSubjectName
 * @param {Function} props.getEvaluationTypeName
 * @param {Function} props.onEvaluationSelect
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 */
const EvaluationList = ({ 
  evaluations = [], 
  getSubjectName,
  getEvaluationTypeName,
  onEvaluationSelect,
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <section className="evaluations-list">
      <h1>Avaliações</h1>
      
      {headerSlot && <div className="evaluations-header-slot">{headerSlot}</div>}
      
      {evaluations.length > 0 ? (
        <div className="evaluations-table">
          <table>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Data</th>
                <th>Tipo de Avaliação</th>
                <th>Nota</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map(evaluation => (
                <tr key={evaluation.id}>
                  <td>{getSubjectName(evaluation.subjectId)}</td>
                  <td>{evaluation.date}</td>
                  <td>{getEvaluationTypeName(evaluation.evaluationType)}</td>
                  <td>{evaluation.grade !== null ? evaluation.grade : "N/a"}</td>
                  <td>
                    <button 
                      className="btn-view" 
                      onClick={() => onEvaluationSelect && onEvaluationSelect(evaluation)}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        emptySlot || <p className="no-results">Nenhuma avaliação encontrada.</p>
      )}
      
      {footerSlot && <div className="evaluations-footer-slot">{footerSlot}</div>}
    </section>
  );
};

export default EvaluationList;
