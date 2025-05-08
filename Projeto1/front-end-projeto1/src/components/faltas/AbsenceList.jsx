import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Array} props.absences
 * @param {Function} props.getSubjectName 
 * @param {Function} props.getStatusName
 * @param {Function} props.onAbsenceSelect
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.emptySlot
 * @param {React.ReactNode} props.footerSlot
 */

const AbsenceList = ({ 
  absences = [], 
  getSubjectName = (id) => id,
  getStatusName = (id) => id,
  onAbsenceSelect = () => {},
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <div className="absence-list-container">
      <h1>Lista de Faltas</h1>
      
      {headerSlot && <div className="absence-list-header">{headerSlot}</div>}
      
      {absences.length === 0 ? (
        <div className="absence-list-empty">
          {emptySlot || <p>Nenhuma falta encontrada com os critérios selecionados.</p>}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Disciplina</th>
              <th>Estado</th>
              <th>Notas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {absences.map((absence) => (
              <tr key={absence.id} onClick={() => onAbsenceSelect(absence)}>
                <td>{absence.date}</td>
                <td>{getSubjectName(absence.subjectId)}</td>
                <td>{getStatusName(absence.status)}</td>
                <td>{absence.notes || "-"}</td>
                <td>
                  <button className="btn-action" onClick={(e) => {
                    e.stopPropagation();
                    onAbsenceSelect(absence);
                  }}>
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {footerSlot && <div className="absence-list-footer">{footerSlot}</div>}
    </div>
  );
};

export default AbsenceList;
