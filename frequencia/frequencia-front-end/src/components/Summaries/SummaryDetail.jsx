import React, { useState } from 'react';
import './SummaryDetail.css';

const SummaryDetail = ({ summary, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: summary?.date || '',
    startTime: summary?.startTime || '',
    endTime: summary?.endTime || '',
    description: summary?.description || '',
    topics: summary?.topics || [],
    attendance: summary?.attendance || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...formData.topics];
    updatedTopics[index] = value;
    setFormData({
      ...formData,
      topics: updatedTopics
    });
  };

  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, '']
    });
  };

  const removeTopic = (index) => {
    const updatedTopics = formData.topics.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      topics: updatedTopics
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="summary-detail">
      <div className="detail-header">
        <h2>{summary ? 'Editar Sumário' : 'Novo Sumário'}</h2>
        <div className="header-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
          <button className="save-btn" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>

      <form className="summary-form">
        <div className="form-row">
          <div className="form-group">
            <label>Data</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hora Início</label>
            <input 
              type="time" 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hora Fim</label>
            <input 
              type="time" 
              name="endTime" 
              value={formData.endTime} 
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>

        <div className="topics-section">
          <div className="topics-header">
            <h3>Tópicos abordados na sessão:</h3>
            <button type="button" className="add-topic-btn" onClick={addTopic}>
              + Adicionar Tópico
            </button>
          </div>
          
          <div className="topics-list">
            {formData.topics.map((topic, index) => (
              <div key={index} className="topic-item">
                <div className="topic-number">{index + 1}</div>
                <input 
                  type="text" 
                  value={topic} 
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  placeholder="Descreva o tópico abordado"
                />
                <button 
                  type="button" 
                  className="remove-topic-btn"
                  onClick={() => removeTopic(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SummaryDetail;
