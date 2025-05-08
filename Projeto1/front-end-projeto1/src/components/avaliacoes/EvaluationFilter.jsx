import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.fields
 * @param {Function} props.onSubmit
 * @param {Object} props.values
 * @param {Function} props.onChange
 * @param {Object} props.options
 */
const EvaluationFilter = ({ 
  title, 
  fields = [], 
  onSubmit, 
  values = {}, 
  onChange,
  options = {}
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  };

  const handleChange = (field, e) => {
    if (onChange) onChange(field, e.target.value);
  };

  return (
    <div className="evaluation-filter">
      <h2>{title || "Filtrar Avaliações"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="filter-fields">
          {fields.map(field => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              {field.type === "select" ? (
                <select 
                  id={field.id}
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e)}
                >
                  <option value="">Todos</option>
                  {options[field.id] && options[field.id].map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type || "text"}
                  id={field.id}
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e)}
                  placeholder={field.placeholder || ""}
                />
              )}
            </div>
          ))}
        </div>
        <div className="filter-actions">
          <button type="submit" className="btn-filter">Filtrar</button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationFilter;
