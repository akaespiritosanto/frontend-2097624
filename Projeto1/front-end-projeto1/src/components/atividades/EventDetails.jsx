const EventDetails = ({ 
  event, 
  isRegistered, 
  hasAvailableSpots, 
  isRegistrationOpen, 
  getCategoryName,
  onRegister, 
  onCancel, 
  onClose 
}) => {
  if (!event) return null;

  const registrationStatus = () => {
    if (isRegistered(event.id)) {
      return <span class="registered">Inscrito</span>;
    }
    
    if (!hasAvailableSpots(event.id)) {
      return <span class="full">Lotado</span>;
    }
    
    if (!isRegistrationOpen(event.id)) {
      return <span class="closed">Inscrições encerradas</span>;
    }
    
    return <span class="open">Inscrições abertas</span>;
  };

  return (
    <div class="event-details-overlay">
      <div class="event-details">
        <button class="close-button" onClick={onClose}>×</button>
        
        <h2>{event.title}</h2>
        <div class="event-info">
          <p><strong>Categoria:</strong> {getCategoryName(event.category)}</p>
          <p><strong>Data:</strong> {event.date}</p>
          <p><strong>Local:</strong> {event.location}</p>
          <p><strong>Descrição:</strong> {event.description}</p>
          <p><strong>Vagas:</strong> {event.currentParticipants}/{event.maxParticipants}</p>
          <p><strong>Prazo de inscrição:</strong> {event.registrationDeadline}</p>
          <p><strong>Status:</strong> {registrationStatus()}</p>
        </div>
        
        <div class="event-actions">
          {isRegistered(event.id) ? (
            <button 
              class="cancel-button" 
              onClick={() => onCancel(event.id)}
            >
              Cancelar Inscrição
            </button>
          ) : (
            <button 
              class="register-button" 
              onClick={() => onRegister(event.id)}
              disabled={!hasAvailableSpots(event.id) || !isRegistrationOpen(event.id)}
            >
              Inscrever-se
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
