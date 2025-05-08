import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Object} props.grade 
 * @param {Function} props.getDisciplineName 
 * @param {Function} props.getEvaluationTypeName 
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.infoSlot 
 * @param {React.ReactNode} props.actionsSlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const GradeDetails = ({ 
  grade, 
  getDisciplineName,
  getEvaluationTypeName,
  headerSlot,
  infoSlot,
  actionsSlot,
  footerSlot
}) => {
  if (!grade) return null;

  return (
    <div className="grade-details">
      {headerSlot ? (
        <div className="grade-details-header-slot">{headerSlot}</div>
      ) : (
        <div className="grade-details-header">
          <h2>{grade.title}</h2>
        </div>
      )}

      <div className="grade-details-content">
        <div className="grade-details-main">
          <div className="grade-details-info">
            <p><strong>Disciplina:</strong> {getDisciplineName(grade.disciplineId)}</p>
            <p><strong>Tipo de Avaliação:</strong> {getEvaluationTypeName(grade.evaluationType)}</p>
            <p><strong>Data:</strong> {grade.date}</p>
          </div>

          {infoSlot && (
            <div className="grade-details-info-slot">{infoSlot}</div>
          )}
        </div>

        {actionsSlot && (
          <div className="grade-details-actions-slot">{actionsSlot}</div>
        )}
      </div>

      {footerSlot && (
        <div className="grade-details-footer-slot">{footerSlot}</div>
      )}
    </div>
  );
};

export default GradeDetails;
