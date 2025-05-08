import React, { useState } from 'react';
import './AttendanceList.css';
import defaultAvatar from '../../assets/user.png';

const AttendanceList = ({ students, summaryId, onSave }) => {
  const [attendanceData, setAttendanceData] = useState(
    students.map(student => ({
      ...student,
      present: student.present || false,
      justification: student.justification || ''
    }))
  );

  const handleAttendanceChange = (studentId, present) => {
    setAttendanceData(
      attendanceData.map(student =>
        student.id === studentId
          ? { ...student, present }
          : student
      )
    );
  };

  const handleJustificationChange = (studentId, justification) => {
    setAttendanceData(
      attendanceData.map(student =>
        student.id === studentId
          ? { ...student, justification }
          : student
      )
    );
  };

  const handleSubmit = () => {
    onSave(summaryId, attendanceData);
  };

  return (
    <div className="attendance-list">
      <div className="attendance-header">
        <h2>Registo de Assiduidade</h2>
        <button className="save-attendance-btn" onClick={handleSubmit}>
          Guardar Assiduidade
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th></th>
            <th>Número</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Presença</th>
            <th>Justificação</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(student => (
            <tr key={student.id}>
              <td>
                <div className="student-avatar">
                  <img src={student.avatar || defaultAvatar} alt={student.name} />
                </div>
              </td>
              <td>{student.number}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>
                <label className="attendance-checkbox">
                  <input
                    type="checkbox"
                    checked={student.present}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  className="justification-input"
                  value={student.justification}
                  onChange={(e) => handleJustificationChange(student.id, e.target.value)}
                  placeholder="Justificação (opcional)"
                  disabled={student.present}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="attendance-summary">
        <div className="summary-item">
          <span className="label">Total de Alunos:</span>
          <span className="value">{attendanceData.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Presentes:</span>
          <span className="value">{attendanceData.filter(s => s.present).length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Ausentes:</span>
          <span className="value">{attendanceData.filter(s => !s.present).length}</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
