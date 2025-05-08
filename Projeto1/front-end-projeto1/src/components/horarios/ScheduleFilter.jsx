import { Fragment } from "preact";

/**
 * Schedule filter component that accepts props for data and event handlers
 * 
 * @param {Object} props
 * @param {Array} props.academicYears - List of available academic years
 * @param {Array} props.subjects - List of available subjects
 * @param {Array} props.weekdays - List of weekdays
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Handler for filter changes
 * @param {React.ReactNode} props.headerSlot - Optional slot for header content
 * @param {React.ReactNode} props.footerSlot - Optional slot for footer content
 */
const ScheduleFilter = ({
  academicYears = [],
  subjects = [],
  weekdays = [],
  filters = {},
  onFilterChange,
  headerSlot,
  footerSlot
}) => {
  const handleFilterChange = (field, event) => {
    if (onFilterChange) {
      onFilterChange(field, event.target.value);
    }
  };

  return (
    <div className="schedule-filter">
      {headerSlot && <div className="filter-header">{headerSlot}</div>}
      
      <div className="filter-form">
        <div className="form-group">
          <label htmlFor="academicYear">Ano Letivo</label>
          <select
            id="academicYear"
            value={filters.academicYear || ""}
            onChange={(e) => handleFilterChange("academicYear", e)}
          >
            <option value="">Todos</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subjectId">Disciplina</label>
          <select
            id="subjectId"
            value={filters.subjectId || ""}
            onChange={(e) => handleFilterChange("subjectId", e)}
          >
            <option value="">Todas</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weekday">Dia da Semana</label>
          <select
            id="weekday"
            value={filters.weekday || ""}
            onChange={(e) => handleFilterChange("weekday", e)}
          >
            <option value="">Todos</option>
            {weekdays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {footerSlot && <div className="filter-footer">{footerSlot}</div>}
    </div>
  );
};

export default ScheduleFilter;
