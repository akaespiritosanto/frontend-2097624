import { Fragment } from "preact";
import { useSignal } from "@preact/signals";

const ScheduleCalendar = ({
  events = [],
  subjects = [],
  getSubjectName = (id) => id,
  onAddEvent,
  onSelectEvent
}) => {
  const selectedDate = useSignal(new Date().toISOString().split('T')[0]);
  const showAddForm = useSignal(false);
  const newEventTitle = useSignal("");
  const newEventSubject = useSignal("");
  const newEventTime = useSignal("");
  const newEventDescription = useSignal("");
  
  const handleDateChange = (e) => {
    selectedDate.value = e.target.value;
  };
  
  const toggleAddForm = () => {
    showAddForm.value = !showAddForm.value;
    if (!showAddForm.value) {
      resetForm();
    }
  };
  
  const resetForm = () => {
    newEventTitle.value = "";
    newEventSubject.value = "";
    newEventTime.value = "";
    newEventDescription.value = "";
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onAddEvent && newEventTitle.value && newEventSubject.value) {
      onAddEvent({
        title: newEventTitle.value,
        subjectId: newEventSubject.value,
        date: selectedDate.value,
        time: newEventTime.value,
        description: newEventDescription.value
      });
      
      toggleAddForm();
    }
  };
  
  const filteredEvents = events.filter(event => event.date === selectedDate.value);
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-PT', options);
  };
  
  return (
    <div className="schedule-calendar">
      <div className="calendar-header">
        <h2>Calendário de Eventos</h2>
        <div className="calendar-controls">
          <input 
            type="date" 
            value={selectedDate.value} 
            onChange={handleDateChange}
            className="date-picker"
          />
          <button 
            className="btn-add-event" 
            onClick={toggleAddForm}
          >
            {showAddForm.value ? "Cancelar" : "Adicionar Evento"}
          </button>
        </div>
      </div>
      
      {showAddForm.value && (
        <div className="add-event-form-container">
          <form onSubmit={handleSubmit} className="add-event-form">
            <div className="form-group">
              <label htmlFor="eventTitle">Título</label>
              <input
                id="eventTitle"
                type="text"
                value={newEventTitle.value}
                onChange={(e) => newEventTitle.value = e.target.value}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="eventSubject">Disciplina</label>
              <select
                id="eventSubject"
                value={newEventSubject.value}
                onChange={(e) => newEventSubject.value = e.target.value}
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
              <label htmlFor="eventTime">Hora</label>
              <input
                id="eventTime"
                type="time"
                value={newEventTime.value}
                onChange={(e) => newEventTime.value = e.target.value}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="eventDescription">Descrição</label>
              <textarea
                id="eventDescription"
                value={newEventDescription.value}
                onChange={(e) => newEventDescription.value = e.target.value}
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="calendar-content">
        <h3>{formatDate(selectedDate.value)}</h3>
        
        {filteredEvents.length > 0 ? (
          <div className="events-list">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="event-card"
                onClick={() => onSelectEvent && onSelectEvent(event)}
              >
                <div className="event-time">{event.time}</div>
                <div className="event-title">{event.title}</div>
                <div className="event-subject">{getSubjectName(event.subjectId)}</div>
                {event.description && (
                  <div className="event-description">{event.description}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-events">Não existem eventos para esta data.</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
