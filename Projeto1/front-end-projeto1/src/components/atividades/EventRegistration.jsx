import { useSignal } from "@preact/signals";

const EventRegistration = ({ userRegistrations, events, onViewDetails }) => {
  const showAll = useSignal(false);
  
  const registeredEvents = events.filter(event => 
    userRegistrations.includes(event.id)
  );
  
  const displayedEvents = showAll.value 
    ? registeredEvents 
    : registeredEvents.slice(0, 2);
  
  const toggleShowAll = () => {
    showAll.value = !showAll.value;
  };
  
  if (registeredEvents.length === 0) {
    return (
      <div class="event-registration">
        <h2>Minhas Inscrições</h2>
        <p>Você ainda não está inscrito em nenhum evento.</p>
      </div>
    );
  }
  
  return (
    <div class="event-registration">
      <h2>Minhas Inscrições</h2>
      <div class="registered-events">
        {displayedEvents.map(event => (
          <div key={event.id} class="registered-event">
            <h3>{event.title}</h3>
            <p>Data: {event.date}</p>
            <button 
              class="view-details-button"
              onClick={() => onViewDetails(event)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      
      {registeredEvents.length > 2 && (
        <button 
          class="toggle-button"
          onClick={toggleShowAll}
        >
          {showAll.value ? "Mostrar menos" : `Ver mais (${registeredEvents.length - 2})`}
        </button>
      )}
    </div>
  );
};

export default EventRegistration;
