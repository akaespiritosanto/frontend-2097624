import { Fragment } from "preact";
import { useSignal } from "@preact/signals";

/**
 * Schedule editor component for modifying schedule slots
 * 
 * @param {Object} props
 * @param {Object} props.timeSlot - The selected time slot
 * @param {Array} props.subjects - Available subjects
 * @param {Array} props.weekdays - Available weekdays
 * @param {Function} props.onSave - Handler for saving changes
 * @param {Function} props.onCancel - Handler for canceling
 * @param {React.ReactNode} props.headerSlot - Optional slot for header content
 * @param {React.ReactNode} props.footerSlot - Optional slot for footer content
 */
const ScheduleEditor = ({
  timeSlot,
  subjects = [],
  weekdays = [],
  onSave,
  onCancel,
  headerSlot,
  footerSlot
}) => {
  const selectedDay = useSignal("");
  const selectedSubject = useSignal("");

  const handleSave = () => {
    if (onSave && selectedDay.value && timeSlot) {
      onSave(timeSlot.timeSlot, selectedDay.value, selectedSubject.value);
    }
  };

  if (!timeSlot) return null;

  return (
    <div className="schedule-editor">
      {headerSlot && <div className="editor-header">{headerSlot}</div>}
      
      <div className="editor-form">
        <h3>Editar Horário: {timeSlot.timeSlot}</h3>
        
        <div className="form-group">
          <label htmlFor="day">Dia da Semana</label>
          <select
            id="day"
            value={selectedDay.value}
            onChange={(e) => selectedDay.value = e.target.value}
          >
            <option value="">Selecione um dia</option>
            {weekdays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Disciplina</label>
          <select
            id="subject"
            value={selectedSubject.value}
            onChange={(e) => selectedSubject.value = e.target.value}
          >
            <option value="">Nenhuma (vazio)</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="editor-actions">
          <button className="btn-save" onClick={handleSave}>
            Salvar
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
      
      {footerSlot && <div className="editor-footer">{footerSlot}</div>}
    </div>
  );
};

export default ScheduleEditor;
