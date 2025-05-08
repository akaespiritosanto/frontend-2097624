const EventList = ({ 
  events, 
  onEventSelect, 
  renderEventHeader, 
  renderEventContent, 
  renderEventFooter 
}) => {
  return (
    <div class="event-list">
      {events.length === 0 ? (
        <div class="no-events">
          <p>Nenhum evento encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        events.map(event => (
          <div key={event.id} class="event-item" onClick={() => onEventSelect(event)}>
            {/* Header slot */}
            {renderEventHeader ? (
              renderEventHeader(event)
            ) : (
              <h2>{event.title}</h2>
            )}
            
            {/* Content slot */}
            {renderEventContent ? (
              renderEventContent(event)
            ) : (
              <div>
                <p>Data: {event.date}</p>
                <p>Local: {event.location}</p>
                <p>Descrição: {event.description}</p>
              </div>
            )}
            
            {/* Footer slot */}
            {renderEventFooter && renderEventFooter(event)}
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
