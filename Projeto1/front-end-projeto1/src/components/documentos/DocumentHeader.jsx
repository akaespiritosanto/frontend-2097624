import { Fragment } from "preact";

const DocumentHeader = ({ title, description, children }) => {
  return (
    <div class="document-header">
      <div class="document-header-content">
        <h1>{title || "Documentação"}</h1>
        {description && <p class="document-description">{description}</p>}
      </div>
      <div class="document-header-slot">
        {children}
      </div>
    </div>
  );
};

export default DocumentHeader;
