import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.fields 
 * @param {Object} props.values
 * @param {Function} props.onChange 
 * @param {Function} props.onSubmit 
 * @param {Object} props.options 
 */

const SearchForm = ({ 
  title = "Pesquisa",
  fields = [],
  values = {},
  onChange = () => {},
  onSubmit = () => {},
  options = {}
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  const handleChange = (field, e) => {
    onChange(field, e.target.value);
  };
  
  return (
    <div className="search-form-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                value={values[field.id] || ""}
                onChange={(e) => handleChange(field.id, e)}
              >
                <option value="">Todos</option>
                {options[field.id]?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                id={field.id}
                name={field.id}
                value={values[field.id] || ""}
                onChange={(e) => handleChange(field.id, e)}
                placeholder={field.placeholder || ""}
              />
            )}
          </div>
        ))}
        <div className="form-group">
          <button type="submit" className="btn">Pesquisar</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
