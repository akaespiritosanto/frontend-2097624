import { Fragment } from "preact";

/**
 * Schedule table component that displays the weekly schedule
 * 
 * @param {Object} props
 * @param {Array} props.scheduleData - The schedule data to display
 * @param {Function} props.getSubjectName - Function to get subject name from ID
 * @param {Function} props.onTimeSlotSelect - Handler for time slot selection
 * @param {React.ReactNode} props.headerSlot - Optional slot for header content
 * @param {React.ReactNode} props.emptySlot - Optional slot for empty state
 * @param {React.ReactNode} props.footerSlot - Optional slot for footer content
 */
const ScheduleTable = ({
  scheduleData = [],
  getSubjectName,
  onTimeSlotSelect,
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  const handleTimeSlotClick = (timeSlot) => {
    if (onTimeSlotSelect) {
      onTimeSlotSelect(timeSlot);
    }
  };

  return (
    <div className="schedule-table-container">
      {headerSlot && <div className="schedule-header">{headerSlot}</div>}
      
      {scheduleData.length > 0 ? (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Segunda</th>
              <th>Terça</th>
              <th>Quarta</th>
              <th>Quinta</th>
              <th>Sexta</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((slot) => (
              <tr key={slot.timeSlot} onClick={() => handleTimeSlotClick(slot)}>
                <td>{slot.timeSlot}</td>
                <td>{slot.monday ? getSubjectName(slot.monday) : ""}</td>
                <td>{slot.tuesday ? getSubjectName(slot.tuesday) : ""}</td>
                <td>{slot.wednesday ? getSubjectName(slot.wednesday) : ""}</td>
                <td>{slot.thursday ? getSubjectName(slot.thursday) : ""}</td>
                <td>{slot.friday ? getSubjectName(slot.friday) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        emptySlot || <p className="no-schedule">Nenhum horário disponível.</p>
      )}
      
      {footerSlot && <div className="schedule-footer">{footerSlot}</div>}
    </div>
  );
};

export default ScheduleTable;
