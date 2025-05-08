import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const getMonthName = (date) => {
    return date.toLocaleString('pt-PT', { month: 'long' });
  };
  
  const getYear = (date) => {
    return date.getFullYear();
  };
  
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const hasClass = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const weekDay = date.getDay();
    return weekDay === 1 || weekDay === 3 || weekDay === 5;
  };
  
  const hasPendingSummary = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const weekDay = date.getDay();
    return weekDay === 1 && day > 7 && day < 21;
  };
  
  const hasCompletedSummary = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const weekDay = date.getDay();
    return (weekDay === 3 || weekDay === 5) && day < 15;
  };
  
  const renderDays = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === currentMonth.getMonth() && 
                      new Date().getFullYear() === currentMonth.getFullYear();
      
      const isSelected = selectedDate.getDate() === day && 
                         selectedDate.getMonth() === currentMonth.getMonth() && 
                         selectedDate.getFullYear() === currentMonth.getFullYear();
      
      const hasClassToday = hasClass(day);
      const hasPending = hasPendingSummary(day);
      const hasCompleted = hasCompletedSummary(day);
      
      days.push(
        <div 
          key={day} 
          className={`day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasClassToday ? 'has-class' : ''}`}
          onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
        >
          <span className="day-number">{day}</span>
          {hasClassToday && (
            <div className="class-indicator">
              {hasPending && <span className="pending-indicator">⏱</span>}
              {hasCompleted && <span className="completed-indicator">✓</span>}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Calendário de Aulas</h2>
        <div className="month-navigation">
          <button className="month-nav-btn" onClick={prevMonth}>«</button>
          <h3 className="current-month">
            {getMonthName(currentMonth)} {getYear(currentMonth)}
          </h3>
          <button className="month-nav-btn" onClick={nextMonth}>»</button>
        </div>
      </div>
      
      <div className="weekdays">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
      
      <div className="days">
        {renderDays()}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color has-class"></span>
          <span>Dia com aula</span>
        </div>
        <div className="legend-item">
          <span className="legend-color today"></span>
          <span>Hoje</span>
        </div>
        <div className="legend-item">
          <span className="pending-indicator">⏱</span>
          <span>Sumário pendente</span>
        </div>
        <div className="legend-item">
          <span className="completed-indicator">✓</span>
          <span>Sumário completo</span>
        </div>
      </div>
      
      {selectedDate && (
        <div className="selected-date-info">
          <h3>Detalhes do dia {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</h3>
          {hasClass(selectedDate.getDate()) ? (
            <div className="class-details">
              <p><strong>Disciplina:</strong> Design Hipermédia</p>
              <p><strong>Horário:</strong> 14:30 - 16:00</p>
              <p><strong>Sala:</strong> B204</p>
              {hasPendingSummary(selectedDate.getDate()) && (
                <button className="add-summary-btn">Adicionar Sumário</button>
              )}
              {hasCompletedSummary(selectedDate.getDate()) && (
                <button className="view-summary-btn">Ver Sumário</button>
              )}
            </div>
          ) : (
            <p>Não há aulas programadas para este dia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
