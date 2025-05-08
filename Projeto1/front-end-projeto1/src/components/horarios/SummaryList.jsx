import { Fragment } from "preact";

/**
 * Summary list component that displays class summaries
 * 
 * @param {Object} props
 * @param {Array} props.summaries - The summaries to display
 * @param {Function} props.getSubjectName - Function to get subject name from ID
 * @param {React.ReactNode} props.headerSlot - Optional slot for header content
 * @param {React.ReactNode} props.emptySlot - Optional slot for empty state
 * @param {React.ReactNode} props.footerSlot - Optional slot for footer content
 */
const SummaryList = ({
  summaries = [],
  getSubjectName,
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <div className="summary-list-container">
      {headerSlot && <div className="summary-header">{headerSlot}</div>}
      
      {summaries.length > 0 ? (
        <div className="summary-list">
          {summaries.map((summary, index) => (
            <div key={`${summary.subjectId}-${index}`} className="summary">
              <h2>{getSubjectName(summary.subjectId)}</h2>
              <p>{summary.content}</p>
            </div>
          ))}
        </div>
      ) : (
        emptySlot || <p className="no-summaries">Nenhum sumário disponível.</p>
      )}
      
      {footerSlot && <div className="summary-footer">{footerSlot}</div>}
    </div>
  );
};

export default SummaryList;
