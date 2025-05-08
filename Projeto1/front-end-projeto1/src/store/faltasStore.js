import { signal, computed } from "@preact/signals";

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20"
]);

const subjects = signal([
  { id: "mat", name: "Matemática" },
  { id: "fis", name: "Física" },
  { id: "quim", name: "Química" },
  { id: "prog", name: "Programação" },
  { id: "bd", name: "Bases de Dados" },
  { id: "redes", name: "Redes" },
  { id: "ia", name: "Inteligência Artificial" }
]);

const attendanceStatus = signal([
  { id: "presente", name: "Presente" },
  { id: "falta_justificada", name: "Falta Justificada" },
  { id: "falta_injustificada", name: "Falta Injustificada" }
]);

const absenceRecords = signal([
  { 
    id: 1, 
    date: "2024-09-01", 
    subjectId: "mat", 
    status: "presente",
    academicYear: "2024/25",
    notes: ""
  },
  { 
    id: 2, 
    date: "2024-09-02", 
    subjectId: "fis", 
    status: "falta_justificada",
    academicYear: "2024/25",
    notes: "Atestado médico apresentado"
  },
  { 
    id: 3, 
    date: "2024-09-03", 
    subjectId: "quim", 
    status: "falta_injustificada",
    academicYear: "2024/25",
    notes: ""
  },
  { 
    id: 4, 
    date: "2024-09-05", 
    subjectId: "prog", 
    status: "presente",
    academicYear: "2024/25",
    notes: ""
  },
  { 
    id: 5, 
    date: "2024-09-06", 
    subjectId: "bd", 
    status: "falta_justificada",
    academicYear: "2024/25",
    notes: "Participação em evento académico"
  },
  { 
    id: 6, 
    date: "2023-10-10", 
    subjectId: "mat", 
    status: "presente",
    academicYear: "2023/24",
    notes: ""
  },
  { 
    id: 7, 
    date: "2023-10-12", 
    subjectId: "fis", 
    status: "falta_injustificada",
    academicYear: "2023/24",
    notes: ""
  }
]);

const searchFilters = signal({
  academicYear: "2024/25",
  subjectId: "",
  status: ""
});

const filteredAbsences = computed(() => {
  try {
    const filters = searchFilters.value;
    return absenceRecords.value.filter(record => {
      if (filters.academicYear && record.academicYear !== filters.academicYear) {
        return false;
      }
      
      if (filters.subjectId && record.subjectId !== filters.subjectId) {
        return false;
      }
      
      if (filters.status && record.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  } catch (error) {
    console.error("Error in filteredAbsences computed:", error);
    return [];
  }
});

const absenceStats = computed(() => {
  try {
    const filtered = filteredAbsences.value;
    const total = filtered.length;
    const present = filtered.filter(r => r.status === "presente").length;
    const justifiedAbsences = filtered.filter(r => r.status === "falta_justificada").length;
    const unjustifiedAbsences = filtered.filter(r => r.status === "falta_injustificada").length;
    
    return {
      total,
      present,
      justifiedAbsences,
      unjustifiedAbsences,
      attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0
    };
  } catch (error) {
    console.error("Error in absenceStats computed:", error);
    return {
      total: 0,
      present: 0,
      justifiedAbsences: 0,
      unjustifiedAbsences: 0,
      attendanceRate: 0
    };
  }
});

function updateSearchFilter(field, value) {
  try {
    searchFilters.value = { ...searchFilters.value, [field]: value };
  } catch (error) {
    console.error("Error updating search filter:", error);
  }
}

function addAbsenceRecord(record) {
  try {
    if (!record) return;
    
    const newRecord = {
      id: absenceRecords.value.length + 1,
      date: record.date || new Date().toISOString().split('T')[0],
      subjectId: record.subjectId || "",
      status: record.status || "presente",
      academicYear: record.academicYear || searchFilters.value.academicYear,
      notes: record.notes || ""
    };
    
    absenceRecords.value = [...absenceRecords.value, newRecord];
  } catch (error) {
    console.error("Error adding absence record:", error);
  }
}

function updateAbsenceRecord(id, updates) {
  try {
    if (!id || !updates) return;
    
    const records = absenceRecords.value;
    const index = records.findIndex(r => r.id === id);
    
    if (index === -1) return;
    
    const updatedRecord = { ...records[index], ...updates };
    const updatedRecords = [...records];
    updatedRecords[index] = updatedRecord;
    
    absenceRecords.value = updatedRecords;
  } catch (error) {
    console.error("Error updating absence record:", error);
  }
}

function getSubjectName(id) {
  try {
    const subject = subjects.value.find(s => s.id === id);
    return subject ? subject.name : "Desconhecido";
  } catch (error) {
    console.error("Error getting subject name:", error);
    return "Desconhecido";
  }
}

function getStatusName(id) {
  try {
    const status = attendanceStatus.value.find(s => s.id === id);
    return status ? status.name : "Desconhecido";
  } catch (error) {
    console.error("Error getting status name:", error);
    return "Desconhecido";
  }
}

export {
  academicYears,
  subjects,
  attendanceStatus,
  absenceRecords,
  searchFilters,
  filteredAbsences,
  absenceStats,
  updateSearchFilter,
  addAbsenceRecord,
  updateAbsenceRecord,
  getSubjectName,
  getStatusName
};
