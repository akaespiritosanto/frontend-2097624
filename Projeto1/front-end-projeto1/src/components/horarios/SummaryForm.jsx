import { Fragment } from "preact";
import { useSignal } from "@preact/signals";

/**
 * Summary form component for adding new summaries
 * 
 * @param {Object} props
 * @param {Array} props.subjects - Available subjects
 * @param {Function} props.onSubmit - Handler for form submission
 * @param {React.ReactNode} props.headerSlot - Optional slot for header content
 * @param {React.ReactNode} props.footerSlot - Optional slot for footer content
 */
const SummaryForm = ({
  subjects = [],
  onSubmit,
  headerSlot,
  footerSlot
}) => {
  const selectedSubject = useSignal("");
  const summaryContent = useSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onSubmit && selectedSubject.value && summaryContent.value.trim()) {
      onSubmit({
        subjectId: selectedSubject.value,
        content: summaryContent.value.trim()
      });
      
      // Reset form
      selectedSubject.value = "";
      summaryContent.value = "";
    }
  };

  return (
    <div className="summary-form-container">
      {headerSlot && <div className="form-header">{headerSlot}</div>}
      
      <form onSubmit={handleSubmit} className="summary-form">
        <div className="form-group">
          <label htmlFor="subject">Disciplina</label>
          <select
            id="subject"
            value={selectedSubject.value}
            onChange={(e) => selectedSubject.value = e.target.value}
            required
          >
            <option value="">Selecione uma disciplina</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Sumário</label>
          <textarea
            id="content"
            value={summaryContent.value}
            onChange={(e) => summaryContent.value = e.target.value}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Adicionar Sumário
          </button>
        </div>
      </form>
      
      {footerSlot && <div className="form-footer">{footerSlot}</div>}
    </div>
  );
};

export default SummaryForm;
