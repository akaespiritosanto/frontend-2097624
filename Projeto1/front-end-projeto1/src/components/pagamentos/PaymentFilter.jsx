import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.academicYears 
 * @param {Array} props.serviceTypes 
 * @param {Array} props.paymentStatus 
 * @param {Object} props.currentFilters 
 * @param {Function} props.onFilterChange 
 * @param {React.ReactNode} props.headerSlot
 * @param {React.ReactNode} props.footerSlot 
 */

const PaymentFilter = ({ 
  academicYears = [],
  serviceTypes = [],
  paymentStatus = [],
  currentFilters = {},
  onFilterChange = () => {},
  headerSlot,
  footerSlot
}) => {
  const handleFilterChange = (field, value) => {
    onFilterChange(field, value);
  };

  return (
    <div className="payment-filter-container">
      <h2>Filtrar Pagamentos</h2>
      
      {headerSlot && <div className="payment-filter-header">{headerSlot}</div>}
      
      <div className="payment-filter-form">
        <div className="filter-group">
          <label htmlFor="academicYear">Ano Letivo:</label>
          <select 
            id="academicYear"
            value={currentFilters.academicYear || ""}
            onChange={(e) => handleFilterChange("academicYear", e.target.value)}
          >
            <option value="">Todos</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="serviceType">Tipo de Serviço:</label>
          <select 
            id="serviceType"
            value={currentFilters.serviceType || ""}
            onChange={(e) => handleFilterChange("serviceType", e.target.value)}
          >
            <option value="">Todos</option>
            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select 
            id="status"
            value={currentFilters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Todos</option>
            {paymentStatus.map((status) => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-actions">
          <button 
            className="btn-clear-filters"
            onClick={() => {
              handleFilterChange("academicYear", "");
              handleFilterChange("serviceType", "");
              handleFilterChange("status", "");
            }}
          >
            Limpar Filtros
          </button>
        </div>
      </div>
      
      {footerSlot && <div className="payment-filter-footer">{footerSlot}</div>}
    </div>
  );
};

export default PaymentFilter;
