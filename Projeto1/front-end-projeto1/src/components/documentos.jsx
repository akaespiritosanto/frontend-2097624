import './../styles/documentos_design.css';
import { Fragment } from "preact";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";
import DocumentHeader from "./documentos/DocumentHeader.jsx";
import DocumentSearch from "./documentos/DocumentSearch.jsx";
import DocumentList from "./documentos/DocumentList.jsx";
import DocumentFavorites from "./documentos/DocumentFavorites.jsx";
import {
  documentCategories,
  documentsByCategory,
  getCategoryName
} from "../store/documentosStore";

const Documentos = () => {
    const renderDocumentsByCategory = () => {
        return documentCategories.value.map(category => {
            const docs = documentsByCategory.value[category.id] || [];
            if (docs.length === 0) return null;

            return (
                <DocumentList
                    key={category.id}
                    documents={docs}
                    categoryName={category.name}
                />
            );
        });
    };

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section class="documentation">
                    <DocumentHeader
                        title="Documentação"
                        description="Acesse todos os documentos e formulários importantes da universidade."
                    >
                        <div class="header-actions">
                            <span>Última atualização: {new Date().toLocaleDateString()}</span>
                        </div>
                    </DocumentHeader>

                    <DocumentSearch />

                    <DocumentFavorites />

                    {renderDocumentsByCategory()}
                </section>
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Documentos;