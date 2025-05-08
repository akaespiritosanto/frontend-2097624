import { signal, computed } from "@preact/signals";

const documentCategories = signal([
  { id: "academic", name: "Documentos Académicos" },
  { id: "forms", name: "Formulários" },
  { id: "regulations", name: "Regulamentos" },
  { id: "guides", name: "Guias e Manuais" }
]);

const documentsData = signal([
  {
    id: "guia_estudante",
    categoryId: "academic",
    title: "Guia do Estudante",
    description: "Informações essenciais para novos e atuais estudantes",
    path: "documentos/guia_estudante.pdf",
    dateAdded: "2024-01-15",
    downloadCount: 145,
    size: "2.4 MB",
    isNew: false
  },
  {
    id: "regulamento_interno",
    categoryId: "academic",
    title: "Regulamento Interno",
    description: "Normas e procedimentos internos da universidade",
    path: "documentos/regulamento_interno.pdf",
    dateAdded: "2024-02-10",
    downloadCount: 98,
    size: "1.8 MB",
    isNew: false
  },
  {
    id: "horario_aulas",
    categoryId: "academic",
    title: "Horário de Aulas",
    description: "Horários das aulas do semestre atual",
    path: "documentos/horario_aulas.pdf",
    dateAdded: "2024-03-01",
    downloadCount: 210,
    size: "1.2 MB",
    isNew: true
  },
  {
    id: "formulario_matricula",
    categoryId: "forms",
    title: "Formulário de Matrícula",
    description: "Formulário para matrícula em cursos",
    path: "documentos/formulario_matricula.pdf",
    dateAdded: "2024-01-20",
    downloadCount: 87,
    size: "0.5 MB",
    isNew: false
  },
  {
    id: "formulario_pedido_certificado",
    categoryId: "forms",
    title: "Formulário de Pedido de Certificado",
    description: "Solicite certificados e declarações",
    path: "documentos/formulario_pedido_certificado.pdf",
    dateAdded: "2024-02-15",
    downloadCount: 65,
    size: "0.4 MB",
    isNew: false
  },
  {
    id: "formulario_reclamacao",
    categoryId: "forms",
    title: "Formulário de Reclamação",
    description: "Para submissão de reclamações formais",
    path: "documentos/formulario_reclamacao.pdf",
    dateAdded: "2024-01-25",
    downloadCount: 42,
    size: "0.3 MB",
    isNew: false
  },
  {
    id: "manual_biblioteca",
    categoryId: "guides",
    title: "Manual da Biblioteca",
    description: "Guia de utilização dos recursos da biblioteca",
    path: "documentos/manual_biblioteca.pdf",
    dateAdded: "2024-03-10",
    downloadCount: 35,
    size: "1.5 MB",
    isNew: true
  },
  {
    id: "guia_laboratorios",
    categoryId: "guides",
    title: "Guia de Laboratórios",
    description: "Instruções para uso dos laboratórios",
    path: "documentos/guia_laboratorios.pdf",
    dateAdded: "2024-02-28",
    downloadCount: 28,
    size: "1.1 MB",
    isNew: true
  },
  {
    id: "regulamento_avaliacao",
    categoryId: "regulations",
    title: "Regulamento de Avaliação",
    description: "Normas de avaliação e classificação",
    path: "documentos/regulamento_avaliacao.pdf",
    dateAdded: "2024-01-30",
    downloadCount: 112,
    size: "0.9 MB",
    isNew: false
  },
  {
    id: "regulamento_estagios",
    categoryId: "regulations",
    title: "Regulamento de Estágios",
    description: "Normas para estágios curriculares",
    path: "documentos/regulamento_estagios.pdf",
    dateAdded: "2024-03-05",
    downloadCount: 56,
    size: "0.7 MB",
    isNew: true
  }
]);

const favoriteDocuments = signal([]);

const searchFilters = signal({
  category: "",
  query: "",
  showOnlyNew: false
});

const filteredDocuments = computed(() => {
  try {
    const filters = searchFilters.value;
    return documentsData.value.filter(doc => {
      if (filters.category && doc.categoryId !== filters.category) {
        return false;
      }
      if (filters.showOnlyNew && !doc.isNew) {
        return false;
      }
      if (filters.query && !doc.title.toLowerCase().includes(filters.query.toLowerCase()) && 
          !doc.description.toLowerCase().includes(filters.query.toLowerCase())) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Erro ao filtrar documentos:", error);
    return [];
  }
});

const documentsByCategory = computed(() => {
  try {
    const result = {};
    documentCategories.value.forEach(category => {
      result[category.id] = filteredDocuments.value.filter(doc => doc.categoryId === category.id);
    });
    return result;
  } catch (error) {
    console.error("Erro ao agrupar documentos por categoria:", error);
    return {};
  }
});

function updateSearchFilter(field, value) {
  try {
    searchFilters.value = { ...searchFilters.value, [field]: value };
  } catch (error) {
    console.error("Erro ao atualizar filtro:", error);
  }
}

function addToFavorites(documentId) {
  try {
    if (!favoriteDocuments.value.includes(documentId)) {
      favoriteDocuments.value = [...favoriteDocuments.value, documentId];
    }
  } catch (error) {
    console.error("Erro ao adicionar aos favoritos:", error);
  }
}

function removeFromFavorites(documentId) {
  try {
    favoriteDocuments.value = favoriteDocuments.value.filter(id => id !== documentId);
  } catch (error) {
    console.error("Erro ao remover dos favoritos:", error);
  }
}

function incrementDownloadCount(documentId) {
  try {
    const documents = documentsData.value;
    const index = documents.findIndex(doc => doc.id === documentId);
    
    if (index === -1) return;
    
    const updatedDoc = { 
      ...documents[index], 
      downloadCount: documents[index].downloadCount + 1 
    };
    
    const updatedDocs = [...documents];
    updatedDocs[index] = updatedDoc;
    
    documentsData.value = updatedDocs;
  } catch (error) {
    console.error("Erro ao incrementar contagem de downloads:", error);
  }
}

function getCategoryName(categoryId) {
  try {
    const category = documentCategories.value.find(cat => cat.id === categoryId);
    return category ? category.name : "Desconhecido";
  } catch (error) {
    console.error("Erro ao obter nome da categoria:", error);
    return "Desconhecido";
  }
}

export {
  documentCategories,
  documentsData,
  favoriteDocuments,
  searchFilters,
  filteredDocuments,
  documentsByCategory,
  updateSearchFilter,
  addToFavorites,
  removeFromFavorites,
  incrementDownloadCount,
  getCategoryName
};
