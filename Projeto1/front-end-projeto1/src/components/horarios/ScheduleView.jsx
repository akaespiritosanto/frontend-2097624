import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import ScheduleTable from "./ScheduleTable.jsx";
import ScheduleEditor from "./ScheduleEditor.jsx";
import ScheduleFilter from "./ScheduleFilter.jsx";
import SummaryList from "./SummaryList.jsx";
import SummaryForm from "./SummaryForm.jsx";

const ScheduleView = ({
  scheduleData,
  summaryData,
  subjects,
  weekdays,
  academicYears,
  filters,
  selectedTimeSlot,
  onFilterChange,
  onTimeSlotSelect,
  onClearTimeSlot,
  onSaveSchedule,
  onAddSummary,
  getSubjectName,
  headerSlot,
  filterSlot,
  tableHeaderSlot,
  tableFooterSlot,
  summaryHeaderSlot,
  summaryFooterSlot,
  editorHeaderSlot,
  editorFooterSlot,
  emptyScheduleSlot,
  emptySummarySlot
}) => {
  const showEditor = useSignal(false);
  
  const handleTimeSlotSelect = (timeSlot) => {
    if (onTimeSlotSelect) {
      onTimeSlotSelect(timeSlot);
      showEditor.value = true;
    }
  };
  
  const handleCancelEdit = () => {
    showEditor.value = false;
    if (onClearTimeSlot) {
      onClearTimeSlot();
    }
  };
  
  const handleSaveSchedule = (timeSlot, day, subjectId) => {
    if (onSaveSchedule) {
      onSaveSchedule(timeSlot, day, subjectId);
      showEditor.value = false;
    }
  };
  
  return (
    <div className="schedule-view">
      {headerSlot && <div className="schedule-view-header">{headerSlot}</div>}
      
      <div className="schedule-filter-container">
        {filterSlot || (
          <ScheduleFilter
            academicYears={academicYears}
            subjects={subjects}
            weekdays={weekdays}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        )}
      </div>
      
      <div className="schedule-content">
        <div className="schedule-table-section">
          <ScheduleTable
            scheduleData={scheduleData}
            getSubjectName={getSubjectName}
            onTimeSlotSelect={handleTimeSlotSelect}
            headerSlot={tableHeaderSlot}
            footerSlot={tableFooterSlot}
            emptySlot={emptyScheduleSlot}
          />
        </div>
        
        <div className="schedule-summary-section">
          <SummaryList
            summaries={summaryData}
            getSubjectName={getSubjectName}
            headerSlot={summaryHeaderSlot}
            footerSlot={summaryFooterSlot}
            emptySlot={emptySummarySlot}
          />
          
          <SummaryForm
            subjects={subjects}
            onSubmit={onAddSummary}
          />
        </div>
      </div>
      
      {showEditor.value && selectedTimeSlot && (
        <div className="schedule-editor-overlay">
          <div className="schedule-editor-container">
            <ScheduleEditor
              timeSlot={selectedTimeSlot}
              subjects={subjects}
              weekdays={weekdays}
              onSave={handleSaveSchedule}
              onCancel={handleCancelEdit}
              headerSlot={editorHeaderSlot}
              footerSlot={editorFooterSlot}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
