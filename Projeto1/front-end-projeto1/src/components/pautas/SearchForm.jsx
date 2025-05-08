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

const SearchForm = ({ 
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
    <section className="search-form">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            {field.type === 'select' ? (
              <select 
                id={field.id} 
                name={field.id}
                value={values[field.id] || ''}
                onChange={(e) => handleChange(field.id, e)}
              >
                <option value="">Selecione...</option>
                {(options[field.id] || []).map(option => 
                  typeof option === 'string' ? (
                    <option key={option} value={option}>{option}</option>
                  ) : (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  )
                )}
              </select>
            ) : (
              <input 
                type={field.type || 'text'} 
                id={field.id} 
                name={field.id}
                placeholder={field.placeholder || ''}
                value={values[field.id] || ''}
                onChange={(e) => handleChange(field.id, e)}
              />
            )}
          </div>
        ))}
        <div className="form-group">
          <button type="submit" className="btn">Pesquisar</button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
