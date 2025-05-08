import { useSignal } from "@preact/signals";

const EventFilter = ({ categories, searchFilters, onFilterChange }) => {
  const searchTerm = useSignal("");

  const handleCategoryChange = (e) => {
    onFilterChange("category", e.target.value);
  };

  const handleSearchChange = (e) => {
    searchTerm.value = e.target.value;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange("searchTerm", searchTerm.value);
  };

  return (
    <div class="event-filter">
      <h2>Filtrar Eventos</h2>
      <div class="filter-options">
        <div class="filter-group">
          <label for="category-filter">Categoria:</label>
          <select 
            id="category-filter" 
            value={searchFilters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div class="filter-group">
          <form onSubmit={handleSearchSubmit}>
            <label for="search-filter">Pesquisar:</label>
            <div class="search-input-group">
              <input 
                type="text" 
                id="search-filter" 
                placeholder="Pesquisar eventos..." 
                value={searchTerm.value}
                onInput={handleSearchChange}
              />
              <button type="submit" class="search-button">Buscar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
