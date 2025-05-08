import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import SummariesList from './components/Summaries/SummariesList';
import SummaryDetail from './components/Summaries/SummaryDetail';
import AttendanceList from './components/Attendance/AttendanceList';
import Calendar from './components/Schedule/Calendar';
import { summariesData, studentsData } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('summaries');
  const [summaries, setSummaries] = useState(summariesData);
  const [students, setStudents] = useState(studentsData);
  const [selectedSummaryId, setSelectedSummaryId] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const selectedSummary = summaries.find(summary => summary.id === selectedSummaryId);

  const handleSelectSummary = (summaryId) => {
    setSelectedSummaryId(summaryId);
    setViewMode('detail');
  };

  const handleNewSummary = () => {
    setSelectedSummaryId(null);
    setViewMode('new');
  };

  const handleSaveSummary = (formData) => {
    if (selectedSummaryId) {
      setSummaries(
        summaries.map(summary =>
          summary.id === selectedSummaryId
            ? { ...summary, ...formData }
            : summary
        )
      );
    } else {
      const newSummary = {
        id: summaries.length + 1,
        ...formData,
        status: 'pending',
        avatar: 'https://via.placeholder.com/30'
      };
      setSummaries([...summaries, newSummary]);
    }
    setViewMode('list');
  };

  const handleCancelEdit = () => {
    setViewMode('list');
  };

  const handleSaveAttendance = (summaryId, attendanceData) => {
    setStudents(attendanceData);
    alert('Assiduidade guardada com sucesso!');
  };

  return (
    <div className="app">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === 'summaries' && (
          <>
            {viewMode === 'list' && (
              <div className="action-bar">
                <button className="new-btn" onClick={handleNewSummary}>
                  + Novo Sumário
                </button>
              </div>
            )}

            {viewMode === 'list' && (
              <SummariesList
                summaries={summaries}
                onSelectSummary={handleSelectSummary}
              />
            )}

            {(viewMode === 'detail' || viewMode === 'new') && (
              <SummaryDetail
                summary={selectedSummary}
                onSave={handleSaveSummary}
                onCancel={handleCancelEdit}
              />
            )}
          </>
        )}

        {activeTab === 'attendance' && (
          <AttendanceList
            students={students}
            summaryId={selectedSummaryId || 1}
            onSave={handleSaveAttendance}
          />
        )}

        {activeTab === 'schedule' && (
          <Calendar />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
