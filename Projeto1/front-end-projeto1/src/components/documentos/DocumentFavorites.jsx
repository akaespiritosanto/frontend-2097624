import { Fragment } from "preact";
import { 
  favoriteDocuments, 
  documentsData, 
  removeFromFavorites,
  incrementDownloadCount
} from "../../store/documentosStore";

const DocumentFavorites = () => {
  const getFavoriteDocuments = () => {
    return documentsData.value.filter(doc => 
      favoriteDocuments.value.includes(doc.id)
    );
  };

  const handleDownload = (documentId) => {
    incrementDownloadCount(documentId);
  };

  const handleRemove = (documentId) => {
    removeFromFavorites(documentId);
  };

  const favorites = getFavoriteDocuments();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div class="document-favorites">
      <h2><u>Documentos Favoritos</u></h2>
      <ul>
        {favorites.map(doc => (
          <li key={doc.id} class="favorite-item">
            <div class="favorite-info">
              <a 
                href={doc.path} 
                target="_blank" 
                onClick={() => handleDownload(doc.id)}
              >
                {doc.title}
              </a>
            </div>
            <button 
              class="remove-favorite" 
              onClick={() => handleRemove(doc.id)}
              title="Remover dos favoritos"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentFavorites;
