import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.grades
 * @param {Function} props.getDisciplineName 
 * @param {Function} props.getEvaluationTypeName 
 * @param {Function} props.onGradeSelect 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot
 */

const GradesList = ({ 
  grades = [], 
  getDisciplineName,
  getEvaluationTypeName,
  onGradeSelect,
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <section className="list-of-grades">
      <h1>Lista de Pautas</h1>
      
      {headerSlot && <div className="grades-header-slot">{headerSlot}</div>}
      
      {grades.length > 0 ? (
        <div className="grades-table">
          <table>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Tipo de Avaliação</th>
                <th>Data</th>
                <th>Título</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(grade => (
                <tr key={grade.id}>
                  <td>{getDisciplineName(grade.disciplineId)}</td>
                  <td>{getEvaluationTypeName(grade.evaluationType)}</td>
                  <td>{grade.date}</td>
                  <td>{grade.title}</td>
                  <td>
                    <button 
                      className="btn-view" 
                      onClick={() => onGradeSelect && onGradeSelect(grade)}
                    >
                      Ver Alunos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        emptySlot || <p>Selecione uma disciplina e/ou tipo de avaliação.</p>
      )}
      
      {footerSlot && <div className="grades-footer-slot">{footerSlot}</div>}
    </section>
  );
};

export default GradesList;
