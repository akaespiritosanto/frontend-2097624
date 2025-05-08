import { signal, computed } from "@preact/signals";

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20"
]);

const installmentPlans = signal([
  {
    id: 1,
    name: "Plano Mensal",
    description: "Pagamento em prestações mensais",
    numberOfInstallments: 10,
    discountRate: 0
  },
  {
    id: 2,
    name: "Plano Trimestral",
    description: "Pagamento em prestações trimestrais",
    numberOfInstallments: 4,
    discountRate: 2
  },
  {
    id: 3,
    name: "Plano Semestral",
    description: "Pagamento em prestações semestrais",
    numberOfInstallments: 2,
    discountRate: 5
  },
  {
    id: 4,
    name: "Pagamento Único",
    description: "Pagamento integral no início do ano letivo",
    numberOfInstallments: 1,
    discountRate: 10
  }
]);

const discountTypes = signal([
  {
    id: "early",
    name: "Pagamento Antecipado",
    description: "Desconto para pagamentos realizados com antecedência",
    rate: 5
  },
  {
    id: "family",
    name: "Desconto Familiar",
    description: "Desconto para famílias com mais de um estudante",
    rate: 8
  },
  {
    id: "merit",
    name: "Desconto por Mérito",
    description: "Desconto para estudantes com excelente desempenho acadêmico",
    rate: 10
  }
]);

const serviceTypes = signal([
  { id: "propina", name: "Propina" },
  { id: "taxa", name: "Taxa" },
  { id: "multa", name: "Multa" },
  { id: "certificado", name: "Certificado" },
  { id: "outros", name: "Outros" }
]);

const paymentStatus = signal([
  { id: "pendente", name: "Pendente" },
  { id: "pago", name: "Pago" },
  { id: "atrasado", name: "Atrasado" },
  { id: "cancelado", name: "Cancelado" }
]);

const paymentMethods = signal([
  {
    id: "multibanco",
    name: "Multibanco",
    description: "Pagamento via terminal Multibanco ou homebanking",
    instructions: [
      "No Multibanco ou homebanking, seleccione 'Pagamento de Serviços'.",
      "Como Entidade introduza 20697, com referência e valor de MB listada.",
      "O processamento é efectuado depois das 22h00."
    ],
    immediate: false
  },
  {
    id: "cartao",
    name: "Cartão de Crédito",
    description: "Pagamento via cartão de crédito ou MBNet",
    instructions: [
      "Selecione os pagamentos que deseja efetuar.",
      "Clique no botão 'Pagar' correspondente.",
      "Siga as instruções para completar o pagamento."
    ],
    immediate: true
  },
  {
    id: "transferencia",
    name: "Transferência Bancária",
    description: "Pagamento via transferência bancária",
    instructions: [
      "Transfira o valor exato para o IBAN PT50 0035 0000 12345678901 72.",
      "Indique o seu número de aluno e referência no descritivo.",
      "Envie o comprovativo para financeiro@universidade.pt."
    ],
    immediate: false
  }
]);

const paymentsData = signal([
  {
    id: 1,
    academicYear: "2024/25",
    reference: "209762405",
    service: "6ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2024-10-07",
    dueDate: "2025-01-31",
    paymentDate: "",
    amount: 77.44,
    status: "pendente",
    selected: false
  },
  {
    id: 2,
    academicYear: "2024/25",
    reference: "209762406",
    service: "7ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2024-10-07",
    dueDate: "2025-02-28",
    paymentDate: "",
    amount: 77.44,
    status: "pendente",
    selected: false
  },
  {
    id: 3,
    academicYear: "2024/25",
    reference: "209762407",
    service: "8ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2024-10-07",
    dueDate: "2025-03-31",
    paymentDate: "",
    amount: 77.44,
    status: "pendente",
    selected: false
  },
  {
    id: 4,
    academicYear: "2024/25",
    reference: "209762408",
    service: "9ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2024-10-07",
    dueDate: "2025-05-31",
    paymentDate: "",
    amount: 77.44,
    status: "pendente",
    selected: false
  },
  {
    id: 5,
    academicYear: "2024/25",
    reference: "209762410",
    service: "10ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2024-10-07",
    dueDate: "2025-06-30",
    paymentDate: "",
    amount: 77.48,
    status: "pendente",
    selected: false
  },
  {
    id: 6,
    academicYear: "2023/24",
    reference: "209762401",
    service: "1ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2023-09-15",
    dueDate: "2023-10-31",
    paymentDate: "2023-10-20",
    amount: 77.44,
    status: "pago",
    selected: false
  },
  {
    id: 7,
    academicYear: "2023/24",
    reference: "209762402",
    service: "2ª Prestação de Propinas de CET's",
    serviceType: "propina",
    observation: "",
    issueDate: "2023-10-15",
    dueDate: "2023-11-30",
    paymentDate: "2023-11-25",
    amount: 77.44,
    status: "pago",
    selected: false
  }
]);

const paymentHistory = signal([
  {
    id: 1,
    reference: "209762401",
    paymentDate: "2023-10-20",
    amount: 77.44,
    method: "multibanco",
    transactionId: "MB123456789"
  },
  {
    id: 2,
    reference: "209762402",
    paymentDate: "2023-11-25",
    amount: 77.44,
    method: "cartao",
    transactionId: "CC987654321"
  }
]);

const paymentNotifications = signal([
  {
    id: 1,
    title: "Pagamento Processado",
    message: "Seu pagamento da 2ª Prestação de Propinas foi processado com sucesso.",
    type: "success",
    date: "2023-11-25",
    read: false
  },
  {
    id: 2,
    title: "Pagamento Próximo do Vencimento",
    message: "A 6ª Prestação de Propinas vence em 7 dias.",
    type: "warning",
    date: "2025-01-24",
    read: false
  },
  {
    id: 3,
    title: "Novo Método de Pagamento Disponível",
    message: "Agora você pode pagar suas propinas via MBWay.",
    type: "info",
    date: "2024-10-15",
    read: false
  }
]);

const paymentReminders = computed(() => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return paymentsData.value
      .filter(payment => {
        if (payment.status !== "pendente") return false;

        const dueDate = new Date(payment.dueDate);
        return dueDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } catch (error) {
    console.error("Erro ao calcular lembretes de pagamentos:", error);
    return [];
  }
});

const searchFilters = signal({
  academicYear: "2024/25",
  serviceType: "",
  status: "pendente"
});

const filteredPayments = computed(() => {
  try {
    const filters = searchFilters.value;
    return paymentsData.value.filter(payment => {
      if (filters.academicYear && payment.academicYear !== filters.academicYear) {
        return false;
      }
      if (filters.serviceType && payment.serviceType !== filters.serviceType) {
        return false;
      }
      if (filters.status && payment.status !== filters.status) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Erro ao filtrar pagamentos:", error);
    return [];
  }
});

const totalDue = computed(() => {
  try {
    return paymentsData.value
      .filter(payment => payment.status === "pendente")
      .reduce((total, payment) => total + payment.amount, 0);
  } catch (error) {
    console.error("Erro ao calcular total em dívida:", error);
    return 0;
  }
});

const totalSelected = computed(() => {
  try {
    return paymentsData.value
      .filter(payment => payment.selected && payment.status === "pendente")
      .reduce((total, payment) => total + payment.amount, 0);
  } catch (error) {
    console.error("Erro ao calcular total selecionado:", error);
    return 0;
  }
});

const selectedPayments = computed(() => {
  try {
    return paymentsData.value.filter(payment => payment.selected && payment.status === "pendente");
  } catch (error) {
    console.error("Erro ao obter pagamentos selecionados:", error);
    return [];
  }
});

const totalPaid = computed(() => {
  try {
    return paymentsData.value
      .filter(payment => payment.status === "pago")
      .reduce((total, payment) => total + payment.amount, 0);
  } catch (error) {
    console.error("Erro ao calcular total pago:", error);
    return 0;
  }
});

const totalOverdue = computed(() => {
  try {
    const today = new Date();

    return paymentsData.value
      .filter(payment => {
        if (payment.status !== "pendente") return false;
        const dueDate = new Date(payment.dueDate);
        return dueDate < today;
      })
      .reduce((total, payment) => total + payment.amount, 0);
  } catch (error) {
    console.error("Erro ao calcular total em atraso:", error);
    return 0;
  }
});

const paymentsByType = computed(() => {
  try {
    const result = {};

    paymentsData.value.forEach(payment => {
      const typeName = getServiceTypeName(payment.serviceType);

      if (!result[typeName]) {
        result[typeName] = 0;
      }

      if (payment.status === "pago") {
        result[typeName] += payment.amount;
      }
    });

    return result;
  } catch (error) {
    console.error("Erro ao calcular pagamentos por tipo:", error);
    return {};
  }
});

const paymentsByMonth = computed(() => {
  try {
    const result = {};
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    paymentsData.value
      .filter(payment => payment.status === "pago" && payment.paymentDate)
      .forEach(payment => {
        const date = new Date(payment.paymentDate);
        const monthName = months[date.getMonth()];

        if (!result[monthName]) {
          result[monthName] = 0;
        }

        result[monthName] += payment.amount;
      });

    return result;
  } catch (error) {
    console.error("Erro ao calcular pagamentos por mês:", error);
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

function togglePaymentSelection(id) {
  try {
    const payments = paymentsData.value;
    const index = payments.findIndex(p => p.id === id);

    if (index === -1) return;

    const updatedPayments = [...payments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      selected: !updatedPayments[index].selected
    };

    paymentsData.value = updatedPayments;
  } catch (error) {
    console.error("Erro ao selecionar pagamento:", error);
  }
}

function processPayment(paymentIds, method) {
  try {
    if (!paymentIds || !paymentIds.length) return false;

    const currentDate = new Date().toISOString().split('T')[0];
    const payments = paymentsData.value;
    const updatedPayments = [...payments];

    paymentIds.forEach(id => {
      const index = updatedPayments.findIndex(p => p.id === id);
      if (index !== -1) {
        updatedPayments[index] = {
          ...updatedPayments[index],
          status: "pago",
          paymentDate: currentDate,
          selected: false
        };

        const newHistoryEntry = {
          id: paymentHistory.value.length + 1,
          reference: updatedPayments[index].reference,
          paymentDate: currentDate,
          amount: updatedPayments[index].amount,
          method: method,
          transactionId: method === "multibanco"
            ? `MB${Math.floor(Math.random() * 1000000000)}`
            : `CC${Math.floor(Math.random() * 1000000000)}`
        };

        paymentHistory.value = [...paymentHistory.value, newHistoryEntry];
      }
    });

    paymentsData.value = updatedPayments;
    return true;
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    return false;
  }
}

function getServiceTypeName(id) {
  try {
    const type = serviceTypes.value.find(t => t.id === id);
    return type ? type.name : "Desconhecido";
  } catch (error) {
    console.error("Erro ao obter nome do tipo de serviço:", error);
    return "Desconhecido";
  }
}

function getStatusName(id) {
  try {
    const status = paymentStatus.value.find(s => s.id === id);
    return status ? status.name : "Desconhecido";
  } catch (error) {
    console.error("Erro ao obter nome do status:", error);
    return "Desconhecido";
  }
}

function getPaymentMethod(id) {
  try {
    return paymentMethods.value.find(m => m.id === id) || null;
  } catch (error) {
    console.error("Erro ao obter método de pagamento:", error);
    return null;
  }
}

function dismissNotification(id) {
  try {
    const notifications = paymentNotifications.value;
    const updatedNotifications = notifications.filter(n => n.id !== id);
    paymentNotifications.value = updatedNotifications;
    return true;
  } catch (error) {
    console.error("Erro ao dispensar notificação:", error);
    return false;
  }
}

function markNotificationAsRead(id) {
  try {
    const notifications = paymentNotifications.value;
    const index = notifications.findIndex(n => n.id === id);

    if (index === -1) return false;

    const updatedNotifications = [...notifications];
    updatedNotifications[index] = {
      ...updatedNotifications[index],
      read: true
    };

    paymentNotifications.value = updatedNotifications;
    return true;
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    return false;
  }
}

function addNotification(notification) {
  try {
    if (!notification) return false;

    const newNotification = {
      id: paymentNotifications.value.length + 1,
      title: notification.title || "Nova Notificação",
      message: notification.message || "",
      type: notification.type || "info",
      date: notification.date || new Date().toISOString().split('T')[0],
      read: false
    };

    paymentNotifications.value = [...paymentNotifications.value, newNotification];
    return true;
  } catch (error) {
    console.error("Erro ao adicionar notificação:", error);
    return false;
  }
}

function dismissReminder(id) {
  try {
    const payments = paymentsData.value;
    const index = payments.findIndex(p => p.id === id);

    if (index === -1) return false;

    const updatedPayments = [...payments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      reminderDismissed: true
    };

    paymentsData.value = updatedPayments;
    return true;
  } catch (error) {
    console.error("Erro ao dispensar lembrete:", error);
    return false;
  }
}

const selectedInstallmentPlan = signal(null);
const selectedDiscountType = signal(null);
const paymentReceipts = signal([]);

const calculateDiscount = (amount, discountType, installmentPlan) => {
  try {
    let totalDiscount = 0;

    if (discountType) {
      const discountTypeObj = discountTypes.value.find(d => d.id === discountType);
      if (discountTypeObj) {
        totalDiscount += (amount * discountTypeObj.rate / 100);
      }
    }

    if (installmentPlan) {
      const planObj = installmentPlans.value.find(p => p.id === installmentPlan);
      if (planObj) {
        totalDiscount += (amount * planObj.discountRate / 100);
      }
    }

    return totalDiscount;
  } catch (error) {
    console.error("Erro ao calcular desconto:", error);
    return 0;
  }
};

const applyInstallmentPlan = (paymentId, planId) => {
  try {
    const payment = paymentsData.value.find(p => p.id === paymentId);
    if (!payment || payment.status !== "pendente") return false;

    const plan = installmentPlans.value.find(p => p.id === planId);
    if (!plan) return false;

    selectedInstallmentPlan.value = plan;
    return true;
  } catch (error) {
    console.error("Erro ao aplicar plano de prestações:", error);
    return false;
  }
};

const applyDiscountType = (paymentId, discountId) => {
  try {
    const payment = paymentsData.value.find(p => p.id === paymentId);
    if (!payment || payment.status !== "pendente") return false;

    const discount = discountTypes.value.find(d => d.id === discountId);
    if (!discount) return false;

    selectedDiscountType.value = discount;
    return true;
  } catch (error) {
    console.error("Erro ao aplicar desconto:", error);
    return false;
  }
};

const generateReceipt = (paymentId) => {
  try {
    const payment = paymentsData.value.find(p => p.id === paymentId);
    if (!payment || payment.status !== "pago") return null;

    const receiptNumber = `REC${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    const receipt = {
      id: paymentReceipts.value.length + 1,
      receiptNumber,
      paymentId: payment.id,
      reference: payment.reference,
      service: payment.service,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      issueDate: new Date().toISOString().split('T')[0],
      studentName: "Estudante Demo",
      studentId: "A12345"
    };

    paymentReceipts.value = [...paymentReceipts.value, receipt];
    return receipt;
  } catch (error) {
    console.error("Erro ao gerar recibo:", error);
    return null;
  }
};

export {
  academicYears,
  serviceTypes,
  paymentStatus,
  paymentMethods,
  paymentsData,
  paymentHistory,
  paymentNotifications,
  paymentReminders,
  searchFilters,
  filteredPayments,
  totalDue,
  totalPaid,
  totalOverdue,
  totalSelected,
  selectedPayments,
  paymentsByType,
  paymentsByMonth,
  installmentPlans,
  discountTypes,
  selectedInstallmentPlan,
  selectedDiscountType,
  paymentReceipts,
  updateSearchFilter,
  togglePaymentSelection,
  processPayment,
  getServiceTypeName,
  getStatusName,
  getPaymentMethod,
  dismissNotification,
  markNotificationAsRead,
  addNotification,
  dismissReminder,
  calculateDiscount,
  applyInstallmentPlan,
  applyDiscountType,
  generateReceipt
};
