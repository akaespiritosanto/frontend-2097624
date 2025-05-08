import { Fragment } from "preact";
import { 
  favoriteDocuments, 
  addToFavorites, 
  removeFromFavorites, 
  incrementDownloadCount 
} from "../../store/documentosStore";

const DocumentList = ({ documents, categoryName }) => {
  const handleDownload = (documentId) => {
    incrementDownloadCount(documentId);
  };

  const toggleFavorite = (documentId) => {
    if (favoriteDocuments.value.includes(documentId)) {
      removeFromFavorites(documentId);
    } else {
      addToFavorites(documentId);
    }
  };

  return (
    <div class="document-list">
      <h2><u>{categoryName}</u></h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} class={doc.isNew ? "document-item new-document" : "document-item"}>
            <div class="document-info">
              <a 
                href={doc.path} 
                target="_blank" 
                onClick={() => handleDownload(doc.id)}
                class="document-title"
              >
                {doc.title}
                {doc.isNew && <span class="new-badge">Novo</span>}
              </a>
              <p class="document-description">{doc.description}</p>
              <div class="document-meta">
                <span class="document-size">{doc.size}</span>
                <span class="document-downloads">{doc.downloadCount} downloads</span>
                <span class="document-date">Adicionado: {doc.dateAdded}</span>
              </div>
            </div>
            <button 
              class={favoriteDocuments.value.includes(doc.id) ? "favorite-button active" : "favorite-button"}
              onClick={() => toggleFavorite(doc.id)}
              title={favoriteDocuments.value.includes(doc.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              ★
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
