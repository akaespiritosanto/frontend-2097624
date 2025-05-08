import { signal, computed } from "@preact/signals";

const eventCategories = signal([
  { id: "workshop", name: "Workshop" },
  { id: "feira", name: "Feira" },
  { id: "academica", name: "Semana Académica" },
  { id: "palestra", name: "Palestra" },
  { id: "cultural", name: "Evento Cultural" },
  { id: "desportivo", name: "Evento Desportivo" }
]);

const eventsData = signal([
  { 
    id: 1, 
    title: "Workshop de Programação", 
    date: "2025-01-15", 
    location: "Sala 101", 
    description: "Aprenda os fundamentos da programação com especialistas da área.",
    category: "workshop",
    maxParticipants: 30,
    currentParticipants: 15,
    registrationDeadline: "2025-01-10"
  },
  { 
    id: 2, 
    title: "Feira de Emprego", 
    date: "2025-02-20", 
    location: "Auditório Principal", 
    description: "Conheça empresas e oportunidades de emprego na área da sua formação.",
    category: "feira",
    maxParticipants: 200,
    currentParticipants: 50,
    registrationDeadline: "2025-02-15"
  },
  { 
    id: 3, 
    title: "Semana Académica", 
    date: "2025-03-10", 
    location: "Campus Universitário", 
    description: "Participe em diversas atividades culturais e desportivas.",
    category: "academica",
    maxParticipants: 500,
    currentParticipants: 120,
    registrationDeadline: "2025-03-01"
  },
  { 
    id: 4, 
    title: "Palestra sobre Inteligência Artificial", 
    date: "2025-04-05", 
    location: "Sala de Conferências", 
    description: "Descubra as últimas tendências em IA com especialistas do setor.",
    category: "palestra",
    maxParticipants: 100,
    currentParticipants: 45,
    registrationDeadline: "2025-04-01"
  },
  { 
    id: 5, 
    title: "Concerto de Música Clássica", 
    date: "2025-05-12", 
    location: "Auditório de Música", 
    description: "Apresentação da orquestra universitária com obras de Mozart e Beethoven.",
    category: "cultural",
    maxParticipants: 150,
    currentParticipants: 30,
    registrationDeadline: "2025-05-08"
  },
  { 
    id: 6, 
    title: "Torneio de Futsal", 
    date: "2025-06-20", 
    location: "Pavilhão Desportivo", 
    description: "Competição entre equipas de diferentes cursos da universidade.",
    category: "desportivo",
    maxParticipants: 80,
    currentParticipants: 60,
    registrationDeadline: "2025-06-15"
  }
]);

const userRegistrations = signal([]);

const searchFilters = signal({
  category: "",
  searchTerm: ""
});

const selectedEvent = signal(null);

function updateSearchFilter(field, value) {
  searchFilters.value = { ...searchFilters.value, [field]: value };
}

function selectEvent(event) {
  selectedEvent.value = event;
}

function clearSelectedEvent() {
  selectedEvent.value = null;
}

function registerForEvent(eventId) {
  const registrations = userRegistrations.value;
  if (!registrations.includes(eventId)) {
    userRegistrations.value = [...registrations, eventId];
    
    const events = eventsData.value;
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        currentParticipants: updatedEvents[eventIndex].currentParticipants + 1
      };
      eventsData.value = updatedEvents;
    }
    
    return true;
  }
  return false;
}

function cancelRegistration(eventId) {
  const registrations = userRegistrations.value;
  if (registrations.includes(eventId)) {
    userRegistrations.value = registrations.filter(id => id !== eventId);
    
    const events = eventsData.value;
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        currentParticipants: Math.max(0, updatedEvents[eventIndex].currentParticipants - 1)
      };
      eventsData.value = updatedEvents;
    }
    
    return true;
  }
  return false;
}

function isRegistered(eventId) {
  return userRegistrations.value.includes(eventId);
}

function hasAvailableSpots(eventId) {
  const event = eventsData.value.find(e => e.id === eventId);
  return event && event.currentParticipants < event.maxParticipants;
}

function isRegistrationOpen(eventId) {
  const event = eventsData.value.find(e => e.id === eventId);
  if (!event) return false;
  
  const deadline = new Date(event.registrationDeadline);
  const now = new Date();
  return now <= deadline;
}

function getCategoryName(id) {
  const category = eventCategories.value.find(c => c.id === id);
  return category ? category.name : "Desconhecido";
}

const filteredEvents = computed(() => {
  const { category, searchTerm } = searchFilters.value;
  
  return eventsData.value.filter(event => {
    const matchesCategory = !category || event.category === category;
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
});

const upcomingEvents = computed(() => {
  const now = new Date();
  return eventsData.value
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
});

export {
  eventCategories,
  eventsData,
  userRegistrations,
  searchFilters,
  selectedEvent,
  filteredEvents,
  upcomingEvents,
  updateSearchFilter,
  selectEvent,
  clearSelectedEvent,
  registerForEvent,
  cancelRegistration,
  isRegistered,
  hasAvailableSpots,
  isRegistrationOpen,
  getCategoryName
};
