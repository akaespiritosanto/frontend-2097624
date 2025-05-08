import './../styles/horarios_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterRelative from "./footer-relative.jsx";
import ScheduleView from "./horarios/ScheduleView.jsx";
import ScheduleCalendar from "./horarios/ScheduleCalendar.jsx";
import ScheduleNotifications from "./horarios/ScheduleNotifications.jsx";
import {
  academicYears,
  subjects,
  weekdays,
  calendarEvents,
  notifications,
  searchFilters,
  selectedTimeSlot,
  filteredSchedule,
  filteredSummaries,
  unreadNotificationsCount,
  professorsBySubject,
  updateSearchFilter,
  selectTimeSlot,
  clearSelectedTimeSlot,
  getSubjectName,
  addSummary,
  updateScheduleSlot,
  addCalendarEvent,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../store/horariosStore";

const Horarios = () => {
  const selectedEvent = useSignal(null);

  const handleFilterChange = (field, value) => {
    updateSearchFilter(field, value);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    selectTimeSlot(timeSlot);
  };

  const handleAddEvent = (event) => {
    addCalendarEvent(event);
  };

  const handleSelectEvent = (event) => {
    selectedEvent.value = event;
  };

  const handleAddSummary = (summary) => {
    addSummary(summary);
  };

  const renderScheduleHeader = () => (
    <div>
      <h1>Horário e Sumários</h1>
      <p>Clique em qualquer célula do horário para editar</p>
    </div>
  );

  const renderProfessorInfo = () => {
    if (!selectedTimeSlot.value || !selectedTimeSlot.value.monday) return null;

    const subjectId = selectedTimeSlot.value.monday;
    const profs = professorsBySubject.value[subjectId] || [];

    return (
      <div className="professor-info">
        <h4>Professores de {getSubjectName(subjectId)}</h4>
        <ul>
          {profs.map(prof => (
            <li key={prof.id}>{prof.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Fragment>
      <div>
        <Header />
      </div>

      <main>
        <ScheduleNotifications
          notifications={notifications.value}
          unreadCount={unreadNotificationsCount.value}
          onMarkAsRead={markNotificationAsRead}
          onMarkAllAsRead={markAllNotificationsAsRead}
        />

        <section className="schedule">
          <ScheduleView
            scheduleData={filteredSchedule.value}
            summaryData={filteredSummaries.value}
            subjects={subjects.value}
            weekdays={weekdays.value}
            academicYears={academicYears.value}
            filters={searchFilters.value}
            selectedTimeSlot={selectedTimeSlot.value}
            onFilterChange={handleFilterChange}
            onTimeSlotSelect={handleTimeSlotSelect}
            onClearTimeSlot={clearSelectedTimeSlot}
            onSaveSchedule={updateScheduleSlot}
            onAddSummary={handleAddSummary}
            getSubjectName={getSubjectName}
            headerSlot={renderScheduleHeader()}
            editorHeaderSlot={renderProfessorInfo()}
          />
        </section>

        <section className="calendar-section">
          <ScheduleCalendar
            events={calendarEvents.value}
            subjects={subjects.value}
            getSubjectName={getSubjectName}
            onAddEvent={handleAddEvent}
            onSelectEvent={handleSelectEvent}
          />
        </section>
      </main>

      <div>
        <FooterRelative />
      </div>
    </Fragment>
  );
};

export default Horarios;