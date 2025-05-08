import './../styles/atividades_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";
import EventFilter from "./atividades/EventFilter.jsx";
import EventList from "./atividades/EventList.jsx";
import EventDetails from "./atividades/EventDetails.jsx";
import EventRegistration from "./atividades/EventRegistration.jsx";
import {
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
} from "../store/atividadesStore";

const Atividades = () => {
    const showSuccessMessage = useSignal(false);
    const successMessage = useSignal("");

    const handleEventSelect = (event) => {
        selectEvent(event);
    };

    const handleCloseDetails = () => {
        clearSelectedEvent();
    };

    const handleRegister = (eventId) => {
        const success = registerForEvent(eventId);
        if (success) {
            successMessage.value = "Inscrição realizada com sucesso!";
            showSuccessMessage.value = true;
            setTimeout(() => {
                showSuccessMessage.value = false;
            }, 3000);
        }
    };

    const handleCancel = (eventId) => {
        const success = cancelRegistration(eventId);
        if (success) {
            successMessage.value = "Inscrição cancelada com sucesso!";
            showSuccessMessage.value = true;
            setTimeout(() => {
                showSuccessMessage.value = false;
            }, 3000);
        }
    };

    const renderEventHeader = (event) => (
        <div class="event-header">
            <h2>{event.title}</h2>
            <span class="event-category">{getCategoryName(event.category)}</span>
        </div>
    );

    const renderEventContent = (event) => (
        <div class="event-content">
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Local:</strong> {event.location}</p>
            <p>{event.description}</p>
        </div>
    );

    const renderEventFooter = (event) => (
        <div class="event-footer">
            <div class="event-status">
                <span class="participants-count">
                    {event.currentParticipants}/{event.maxParticipants} participantes
                </span>
                {isRegistered(event.id) && (
                    <span class="registered-badge">Inscrito</span>
                )}
            </div>
            <button class="details-button" onClick={(e) => {
                e.stopPropagation();
                handleEventSelect(event);
            }}>
                Ver Detalhes
            </button>
        </div>
    );

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section class="events">
                    <h1>Atividades e Eventos</h1>
                    <p>Participe em eventos e atividades organizados pela universidade.</p>

                    <div class="events-container">
                        <div class="events-main">
                            <EventFilter
                                categories={eventCategories.value}
                                searchFilters={searchFilters.value}
                                onFilterChange={updateSearchFilter}
                            />

                            <EventList
                                events={filteredEvents.value}
                                onEventSelect={handleEventSelect}
                                renderEventHeader={renderEventHeader}
                                renderEventContent={renderEventContent}
                                renderEventFooter={renderEventFooter}
                            />
                        </div>

                        <div class="events-sidebar">
                            <EventRegistration
                                userRegistrations={userRegistrations.value}
                                events={eventsData.value}
                                onViewDetails={handleEventSelect}
                            />

                            <div class="upcoming-events">
                                <h2>Próximos Eventos</h2>
                                {upcomingEvents.value.length > 0 ? (
                                    <ul>
                                        {upcomingEvents.value.map(event => (
                                            <li key={event.id} onClick={() => handleEventSelect(event)}>
                                                <strong>{event.title}</strong>
                                                <span>{event.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Não há eventos próximos.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {selectedEvent.value && (
                        <EventDetails
                            event={selectedEvent.value}
                            isRegistered={isRegistered}
                            hasAvailableSpots={hasAvailableSpots}
                            isRegistrationOpen={isRegistrationOpen}
                            getCategoryName={getCategoryName}
                            onRegister={handleRegister}
                            onCancel={handleCancel}
                            onClose={handleCloseDetails}
                        />
                    )}

                    {showSuccessMessage.value && (
                        <div class="success-message">
                            {successMessage.value}
                        </div>
                    )}
                </section>
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Atividades;