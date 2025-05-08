import { signal, computed } from "@preact/signals";

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21"
]);

const subjects = signal([
  { id: "mat", name: "Matemática" },
  { id: "fis", name: "Física" },
  { id: "quim", name: "Química" },
  { id: "port", name: "Português" },
  { id: "ing", name: "Inglês" },
  { id: "bio", name: "Biologia" },
  { id: "hist", name: "História" },
  { id: "geo", name: "Geografia" },
  { id: "ef", name: "Educação Física" },
  { id: "art", name: "Artes" }
]);

const professors = signal([
  { id: "prof1", name: "Prof. Silva", subjectIds: ["mat", "fis"] },
  { id: "prof2", name: "Prof. Santos", subjectIds: ["quim", "bio"] },
  { id: "prof3", name: "Prof. Oliveira", subjectIds: ["port", "hist"] },
  { id: "prof4", name: "Prof. Costa", subjectIds: ["ing", "geo"] },
  { id: "prof5", name: "Prof. Pereira", subjectIds: ["ef", "art"] }
]);

const weekdays = signal([
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta"
]);

const timeSlots = signal([
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00"
]);

const scheduleData = signal([
  { timeSlot: "08:00 - 09:00", monday: "mat", tuesday: "fis", wednesday: "", thursday: "bio", friday: "hist" },
  { timeSlot: "09:00 - 10:00", monday: "", tuesday: "quim", wednesday: "", thursday: "geo", friday: "" },
  { timeSlot: "10:00 - 11:00", monday: "port", tuesday: "", wednesday: "ing", thursday: "", friday: "ef" },
  { timeSlot: "11:00 - 12:00", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "" },
  { timeSlot: "12:00 - 13:00", monday: "art", tuesday: "", wednesday: "", thursday: "bio", friday: "" },
  { timeSlot: "13:00 - 14:00", monday: "Intervalo", tuesday: "Intervalo", wednesday: "Intervalo", thursday: "Intervalo", friday: "Intervalo" },
  { timeSlot: "14:00 - 15:00", monday: "mat", tuesday: "", wednesday: "quim", thursday: "", friday: "port" },
  { timeSlot: "15:00 - 16:00", monday: "", tuesday: "fis", wednesday: "", thursday: "ing", friday: "" },
  { timeSlot: "16:00 - 17:00", monday: "", tuesday: "", wednesday: "hist", thursday: "", friday: "geo" },
  { timeSlot: "17:00 - 18:00", monday: "ef", tuesday: "", wednesday: "", thursday: "art", friday: "" }
]);

const summaryData = signal([
  {
    subjectId: "mat",
    content: "Hoje revisámos as funções quadráticas e resolvemos problemas de aplicação. Os alunos foram divididos em grupos para discutir as diferentes abordagens para a solução dos problemas."
  },
  {
    subjectId: "fis",
    content: "Introduzimos o conceito de movimento uniforme. Fizemos experiências práticas para medir a velocidade e a aceleração dos objetos em diferentes condições."
  },
  {
    subjectId: "quim",
    content: "Estudámos as propriedades dos gases e as leis de Boyle e Charles. Os alunos realizaram uma experiência para observar a relação entre pressão e volume em gases."
  },
  {
    subjectId: "port",
    content: "Análise do poema 'Mensagem' de Fernando Pessoa. Discussão sobre o contexto histórico e as influências literárias."
  },
  {
    subjectId: "ing",
    content: "Prática de conversação em inglês sobre temas atuais. Revisão de vocabulário e estruturas gramaticais avançadas."
  }
]);

const calendarEvents = signal([
  {
    id: "event1",
    title: "Teste de Matemática",
    subjectId: "mat",
    date: "2024-06-15",
    time: "10:00",
    description: "Teste sobre funções quadráticas e exponenciais"
  },
  {
    id: "event2",
    title: "Entrega de Trabalho",
    subjectId: "port",
    date: "2024-06-20",
    time: "23:59",
    description: "Entrega do trabalho sobre literatura portuguesa"
  },
  {
    id: "event3",
    title: "Aula Prática",
    subjectId: "fis",
    date: "2024-06-18",
    time: "14:00",
    description: "Aula prática no laboratório sobre movimento uniforme"
  }
]);

const notifications = signal([
  {
    id: "notif1",
    title: "Alteração de Horário",
    message: "A aula de Física de terça-feira foi alterada para quinta-feira",
    date: "2024-06-10",
    read: false,
    type: "schedule_change"
  },
  {
    id: "notif2",
    title: "Novo Sumário",
    message: "Foi adicionado um novo sumário para a disciplina de Matemática",
    date: "2024-06-08",
    read: true,
    type: "summary_added"
  },
  {
    id: "notif3",
    title: "Evento Próximo",
    message: "Teste de Matemática em 5 dias",
    date: "2024-06-10",
    read: false,
    type: "event_reminder"
  }
]);

const searchFilters = signal({
  academicYear: "2024/25",
  subjectId: "",
  weekday: ""
});

const selectedTimeSlot = signal(null);

const filteredSchedule = computed(() => {
  const filters = searchFilters.value;

  if (!filters.subjectId && !filters.weekday) {
    return scheduleData.value;
  }

  return scheduleData.value.filter(slot => {
    if (filters.weekday) {
      const day = filters.weekday.toLowerCase();
      if (day === "segunda" && filters.subjectId && slot.monday !== filters.subjectId) return false;
      if (day === "terça" && filters.subjectId && slot.tuesday !== filters.subjectId) return false;
      if (day === "quarta" && filters.subjectId && slot.wednesday !== filters.subjectId) return false;
      if (day === "quinta" && filters.subjectId && slot.thursday !== filters.subjectId) return false;
      if (day === "sexta" && filters.subjectId && slot.friday !== filters.subjectId) return false;
    }

    if (filters.subjectId && !filters.weekday) {
      return slot.monday === filters.subjectId ||
             slot.tuesday === filters.subjectId ||
             slot.wednesday === filters.subjectId ||
             slot.thursday === filters.subjectId ||
             slot.friday === filters.subjectId;
    }

    return true;
  });
});

const filteredSummaries = computed(() => {
  const filters = searchFilters.value;

  if (!filters.subjectId) {
    return summaryData.value;
  }

  return summaryData.value.filter(summary =>
    summary.subjectId === filters.subjectId
  );
});

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter(notif => !notif.read).length;
});

const upcomingEvents = computed(() => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return calendarEvents.value.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= nextWeek;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
});

const professorsBySubject = computed(() => {
  const result = {};

  subjects.value.forEach(subject => {
    result[subject.id] = professors.value.filter(prof =>
      prof.subjectIds.includes(subject.id)
    );
  });

  return result;
});

function updateSearchFilter(field, value) {
  searchFilters.value = { ...searchFilters.value, [field]: value };
}

function selectTimeSlot(timeSlot) {
  selectedTimeSlot.value = timeSlot;
}

function clearSelectedTimeSlot() {
  selectedTimeSlot.value = null;
}

function getSubjectName(subjectId) {
  const subject = subjects.value.find(s => s.id === subjectId);
  return subject ? subject.name : subjectId;
}

function getProfessorName(profId) {
  const professor = professors.value.find(p => p.id === profId);
  return professor ? professor.name : profId;
}

function addSummary(summary) {
  if (!summary || !summary.subjectId || !summary.content) return;

  summaryData.value = [...summaryData.value, {
    subjectId: summary.subjectId,
    content: summary.content
  }];

  addNotification({
    title: "Novo Sumário",
    message: `Foi adicionado um novo sumário para a disciplina de ${getSubjectName(summary.subjectId)}`,
    type: "summary_added"
  });
}

function updateScheduleSlot(timeSlot, day, subjectId) {
  const updatedSchedule = scheduleData.value.map(slot => {
    if (slot.timeSlot === timeSlot) {
      const updatedSlot = { ...slot };

      if (day === "Segunda") updatedSlot.monday = subjectId;
      else if (day === "Terça") updatedSlot.tuesday = subjectId;
      else if (day === "Quarta") updatedSlot.wednesday = subjectId;
      else if (day === "Quinta") updatedSlot.thursday = subjectId;
      else if (day === "Sexta") updatedSlot.friday = subjectId;

      return updatedSlot;
    }
    return slot;
  });

  scheduleData.value = updatedSchedule;

  if (subjectId) {
    addNotification({
      title: "Alteração de Horário",
      message: `A aula de ${getSubjectName(subjectId)} foi adicionada para ${day}`,
      type: "schedule_change"
    });
  }
}

function addCalendarEvent(event) {
  if (!event || !event.title || !event.subjectId || !event.date) return;

  const newEvent = {
    id: `event${Date.now()}`,
    title: event.title,
    subjectId: event.subjectId,
    date: event.date,
    time: event.time || "00:00",
    description: event.description || ""
  };

  calendarEvents.value = [...calendarEvents.value, newEvent];

  addNotification({
    title: "Novo Evento",
    message: `Foi adicionado um novo evento: ${event.title}`,
    type: "event_added"
  });

  return newEvent;
}

function addNotification(notification) {
  if (!notification || !notification.title || !notification.message) return;

  const newNotification = {
    id: `notif${Date.now()}`,
    title: notification.title,
    message: notification.message,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: notification.type || "general"
  };

  notifications.value = [newNotification, ...notifications.value];

  return newNotification;
}

function markNotificationAsRead(notificationId) {
  notifications.value = notifications.value.map(notif => {
    if (notif.id === notificationId) {
      return { ...notif, read: true };
    }
    return notif;
  });
}

function markAllNotificationsAsRead() {
  notifications.value = notifications.value.map(notif => ({ ...notif, read: true }));
}

export {
  academicYears,
  subjects,
  professors,
  weekdays,
  timeSlots,
  scheduleData,
  summaryData,
  calendarEvents,
  notifications,
  searchFilters,
  selectedTimeSlot,
  filteredSchedule,
  filteredSummaries,
  unreadNotificationsCount,
  upcomingEvents,
  professorsBySubject,
  updateSearchFilter,
  selectTimeSlot,
  clearSelectedTimeSlot,
  getSubjectName,
  getProfessorName,
  addSummary,
  updateScheduleSlot,
  addCalendarEvent,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead
};
