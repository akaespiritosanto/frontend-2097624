import { Fragment } from "preact";
import { updateSearchFilter, documentCategories, searchFilters } from "../../store/documentosStore";

const DocumentSearch = () => {
  const handleCategoryChange = (e) => {
    updateSearchFilter("category", e.target.value);
  };

  const handleQueryChange = (e) => {
    updateSearchFilter("query", e.target.value);
  };

  const handleNewToggle = (e) => {
    updateSearchFilter("showOnlyNew", e.target.checked);
  };

  return (
    <div class="document-search">
      <div class="search-input-container">
        <input
          type="text"
          placeholder="Pesquisar documentos..."
          class="search-input"
          onInput={handleQueryChange}
          value={searchFilters.value.query}
        />
      </div>
      <div class="search-filters">
        <select 
          class="category-select" 
          onChange={handleCategoryChange}
          value={searchFilters.value.category}
        >
          <option value="">Todas as categorias</option>
          {documentCategories.value.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label class="new-only-label">
          <input 
            type="checkbox" 
            checked={searchFilters.value.showOnlyNew}
            onChange={handleNewToggle}
          />
          <span>Mostrar apenas novos</span>
        </label>
      </div>
    </div>
  );
};

export default DocumentSearch;
