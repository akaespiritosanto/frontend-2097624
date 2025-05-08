import { signal, computed } from "@preact/signals";

const requestTypes = signal([
  { id: "reclamacao", name: "Reclamação" },
  { id: "certificado", name: "Certificado" },
  { id: "inscricao", name: "Inscrição" },
  { id: "declaracao", name: "Declaração" },
  { id: "revisao", name: "Revisão de Prova" },
  { id: "transferencia", name: "Transferência" },
  { id: "outros", name: "Outros" }
]);

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20"
]);

const requestStatus = signal([
  { id: "pendente", name: "Pendente" },
  { id: "em_analise", name: "Em Análise" },
  { id: "deferido", name: "Deferido" },
  { id: "indeferido", name: "Indeferido" },
  { id: "cancelado", name: "Cancelado" }
]);

const requestsData = signal([
  {
    id: "7102/24",
    type: "reclamacao",
    academicYear: "2024/25",
    subject: "Solicito que a minha multa seja retirada, pois a causa da minha inscrição tardia foi terem-me ligado da universidade da...",
    requestDate: "2024-11-29",
    processDate: "2024-11-29",
    responseDate: "2024-12-09",
    status: "deferido",
    observation: "Pedido analisado e aprovado pela coordenação do curso",
    hasFee: false,
    feeValue: 0,
    isPaid: false,
    attachments: []
  },
  {
    id: "6589/24",
    type: "certificado",
    academicYear: "2024/25",
    subject: "Solicito emissão de certificado de conclusão de curso para fins de emprego",
    requestDate: "2024-10-15",
    processDate: "2024-10-16",
    responseDate: "2024-10-20",
    status: "deferido",
    observation: "Certificado disponível para retirada na secretaria",
    hasFee: true,
    feeValue: 15.50,
    isPaid: true,
    attachments: ["comprovante_pagamento.pdf"]
  },
  {
    id: "6123/24",
    type: "inscricao",
    academicYear: "2024/25",
    subject: "Solicito inscrição tardia na disciplina de Programação Avançada devido a problemas técnicos no sistema",
    requestDate: "2024-09-20",
    processDate: "2024-09-21",
    responseDate: "",
    status: "em_analise",
    observation: "Em análise pelo coordenador do curso",
    hasFee: false,
    feeValue: 0,
    isPaid: false,
    attachments: ["justificativa.pdf"]
  },
  {
    id: "5987/24",
    type: "revisao",
    academicYear: "2023/24",
    subject: "Solicito revisão da prova final de Cálculo II realizada em 15/07/2024",
    requestDate: "2024-07-20",
    processDate: "2024-07-22",
    responseDate: "2024-08-05",
    status: "indeferido",
    observation: "Após revisão, a nota foi mantida conforme justificativa do professor",
    hasFee: true,
    feeValue: 25.00,
    isPaid: true,
    attachments: ["comprovante_pagamento.pdf", "justificativa_revisao.pdf"]
  },
  {
    id: "5421/23",
    type: "declaracao",
    academicYear: "2023/24",
    subject: "Solicito declaração de matrícula para fins de transporte público",
    requestDate: "2023-12-05",
    processDate: "2023-12-06",
    responseDate: "2023-12-08",
    status: "deferido",
    observation: "Declaração disponível para download",
    hasFee: false,
    feeValue: 0,
    isPaid: false,
    attachments: []
  }
]);

const searchFilters = signal({
  type: "",
  academicYear: "",
  subject: "",
  status: ""
});

const filteredRequests = computed(() => {
  try {
    const filters = searchFilters.value;
    return requestsData.value.filter(request => {
      if (filters.type && request.type !== filters.type) {
        return false;
      }
      if (filters.academicYear && request.academicYear !== filters.academicYear) {
        return false;
      }
      if (filters.subject && !request.subject.toLowerCase().includes(filters.subject.toLowerCase())) {
        return false;
      }
      if (filters.status && request.status !== filters.status) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Erro ao filtrar requerimentos:", error);
    return [];
  }
});

const requestStats = computed(() => {
  try {
    const total = requestsData.value.length;
    const pending = requestsData.value.filter(r => r.status === "pendente").length;
    const inAnalysis = requestsData.value.filter(r => r.status === "em_analise").length;
    const approved = requestsData.value.filter(r => r.status === "deferido").length;
    const rejected = requestsData.value.filter(r => r.status === "indeferido").length;
    const canceled = requestsData.value.filter(r => r.status === "cancelado").length;
    
    return {
      total,
      pending,
      inAnalysis,
      approved,
      rejected,
      canceled
    };
  } catch (error) {
    console.error("Erro ao calcular estatísticas:", error);
    return {
      total: 0,
      pending: 0,
      inAnalysis: 0,
      approved: 0,
      rejected: 0,
      canceled: 0
    };
  }
});

function updateSearchFilter(field, value) {
  try {
    searchFilters.value = { ...searchFilters.value, [field]: value };
  } catch (error) {
    console.error("Erro ao atualizar filtro:", error);
  }
}

function addRequest(request) {
  try {
    if (!request) return;
    
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const count = requestsData.value.length + 1;
    const id = `${count}/${year}`;
    
    const newRequest = {
      id,
      type: request.type || "",
      academicYear: request.academicYear || academicYears.value[0],
      subject: request.subject || "",
      requestDate: request.requestDate || new Date().toISOString().split('T')[0],
      processDate: "",
      responseDate: "",
      status: "pendente",
      observation: "",
      hasFee: request.hasFee || false,
      feeValue: request.feeValue || 0,
      isPaid: false,
      attachments: request.attachments || []
    };
    
    requestsData.value = [newRequest, ...requestsData.value];
    return newRequest;
  } catch (error) {
    console.error("Erro ao adicionar requerimento:", error);
    return null;
  }
}

function updateRequest(id, updates) {
  try {
    if (!id || !updates) return false;
    
    const requests = requestsData.value;
    const index = requests.findIndex(r => r.id === id);
    
    if (index === -1) return false;
    
    const updatedRequest = { ...requests[index], ...updates };
    const updatedRequests = [...requests];
    updatedRequests[index] = updatedRequest;
    
    requestsData.value = updatedRequests;
    return true;
  } catch (error) {
    console.error("Erro ao atualizar requerimento:", error);
    return false;
  }
}

function getRequestTypeName(id) {
  try {
    const type = requestTypes.value.find(t => t.id === id);
    return type ? type.name : "Desconhecido";
  } catch (error) {
    console.error("Erro ao obter nome do tipo:", error);
    return "Desconhecido";
  }
}

function getStatusName(id) {
  try {
    const status = requestStatus.value.find(s => s.id === id);
    return status ? status.name : "Desconhecido";
  } catch (error) {
    console.error("Erro ao obter nome do status:", error);
    return "Desconhecido";
  }
}

export {
  requestTypes,
  academicYears,
  requestStatus,
  requestsData,
  searchFilters,
  filteredRequests,
  requestStats,
  updateSearchFilter,
  addRequest,
  updateRequest,
  getRequestTypeName,
  getStatusName
};
