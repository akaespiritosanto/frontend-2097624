import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Object} props.evaluation
 * @param {Function} props.getSubjectName
 * @param {Function} props.getEvaluationTypeName
 * @param {Function} props.onClose
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.contentSlot
 * @param {React.ReactNode} props.footerSlot
 */
const EvaluationDetails = ({ 
  evaluation, 
  getSubjectName,
  getEvaluationTypeName,
  onClose,
  headerSlot,
  contentSlot,
  footerSlot
}) => {
  if (!evaluation) return null;

  return (
    <div className="evaluation-details">
      {headerSlot ? (
        <div className="details-header-slot">{headerSlot}</div>
      ) : (
        <div className="details-header">
          <h2>Detalhes da Avaliação</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
      )}
      
      {contentSlot ? (
        <div className="details-content-slot">{contentSlot}</div>
      ) : (
        <div className="details-content">
          <div className="details-row">
            <span className="details-label">Disciplina:</span>
            <span className="details-value">{getSubjectName(evaluation.subjectId)}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">Tipo de Avaliação:</span>
            <span className="details-value">{getEvaluationTypeName(evaluation.evaluationType)}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">Data:</span>
            <span className="details-value">{evaluation.date}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">Nota:</span>
            <span className="details-value">
              {evaluation.grade !== null ? `${evaluation.grade}/${evaluation.maxGrade}` : "Não avaliado"}
            </span>
          </div>
          
          <div className="details-row">
            <span className="details-label">Ano Letivo:</span>
            <span className="details-value">{evaluation.year}</span>
          </div>
          
          {evaluation.feedback && (
            <div className="details-feedback">
              <h3>Feedback do Professor</h3>
              <p>{evaluation.feedback}</p>
            </div>
          )}
        </div>
      )}
      
      {footerSlot && <div className="details-footer-slot">{footerSlot}</div>}
    </div>
  );
};

export default EvaluationDetails;
