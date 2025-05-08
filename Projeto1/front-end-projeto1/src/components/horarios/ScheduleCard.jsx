import { Fragment } from "preact";

/**
 * Schedule card component with slots for custom content
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.headerSlot - Slot for header content
 * @param {React.ReactNode} props.contentSlot - Slot for main content
 * @param {React.ReactNode} props.footerSlot - Slot for footer content
 * @param {string} props.className - Additional CSS class
 */
const ScheduleCard = ({
  title,
  headerSlot,
  contentSlot,
  footerSlot,
  className = ""
}) => {
  return (
    <div className={`schedule-card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      
      {headerSlot && (
        <div className="card-header">
          {headerSlot}
        </div>
      )}
      
      <div className="card-content">
        {contentSlot}
      </div>
      
      {footerSlot && (
        <div className="card-footer">
          {footerSlot}
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
