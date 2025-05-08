import { signal, computed } from "@preact/signals";

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21"
]);

const subjects = signal([
  { id: "mat", name: "Matemática" },
  { id: "prog", name: "Programação" },
  { id: "hist", name: "História" },
  { id: "ing", name: "Inglês" },
  { id: "intprog", name: "Introdução à programação" },
  { id: "design", name: "Design hipermédia" }
]);

const evaluationTypes = signal([
  { id: "freq", name: "Frequência" },
  { id: "trab", name: "Trabalho" },
  { id: "exam", name: "Exame" },
  { id: "proj", name: "Projeto" }
]);

const evaluationsData = signal([
  { 
    id: 1, 
    subjectId: "mat", 
    date: "2025-01-15", 
    evaluationType: "freq", 
    grade: 18,
    year: "2024/25",
    feedback: "Excelente compreensão dos conceitos matemáticos.",
    maxGrade: 20
  },
  { 
    id: 2, 
    subjectId: "prog", 
    date: "2025-02-20", 
    evaluationType: "trab", 
    grade: 17,
    year: "2024/25",
    feedback: "Bom trabalho, código bem estruturado.",
    maxGrade: 20
  },
  { 
    id: 3, 
    subjectId: "hist", 
    date: "2025-03-10", 
    evaluationType: "freq", 
    grade: 16,
    year: "2024/25",
    feedback: "Boa análise histórica, poderia aprofundar mais alguns temas.",
    maxGrade: 20
  },
  { 
    id: 4, 
    subjectId: "ing", 
    date: "2025-05-20", 
    evaluationType: "freq", 
    grade: null,
    year: "2024/25",
    feedback: "",
    maxGrade: 20
  },
  { 
    id: 5, 
    subjectId: "intprog", 
    date: "2025-05-22", 
    evaluationType: "trab", 
    grade: null,
    year: "2024/25",
    feedback: "",
    maxGrade: 20
  },
  { 
    id: 6, 
    subjectId: "design", 
    date: "2025-06-02", 
    evaluationType: "freq", 
    grade: null,
    year: "2024/25",
    feedback: "",
    maxGrade: 20
  }
]);

const searchFilters = signal({
  academicYear: "2024/25",
  subjectId: "",
  evaluationType: ""
});

const selectedEvaluation = signal(null);

function updateSearchFilter(field, value) {
  searchFilters.value = { ...searchFilters.value, [field]: value };
}

function selectEvaluation(evaluation) {
  selectedEvaluation.value = evaluation;
}

function clearSelectedEvaluation() {
  selectedEvaluation.value = null;
}

const filteredEvaluations = computed(() => {
  return evaluationsData.value.filter(evaluation => {
    if (searchFilters.value.academicYear && 
        evaluation.year !== searchFilters.value.academicYear) {
      return false;
    }
    
    if (searchFilters.value.subjectId && 
        evaluation.subjectId !== searchFilters.value.subjectId) {
      return false;
    }
    
    if (searchFilters.value.evaluationType && 
        evaluation.evaluationType !== searchFilters.value.evaluationType) {
      return false;
    }
    
    return true;
  });
});

const evaluationStats = computed(() => {
  const completedEvaluations = filteredEvaluations.value.filter(e => e.grade !== null);
  
  if (completedEvaluations.length === 0) {
    return {
      average: 0,
      highest: 0,
      lowest: 0,
      completed: 0,
      pending: filteredEvaluations.value.length
    };
  }
  
  const grades = completedEvaluations.map(e => e.grade);
  const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  const highest = Math.max(...grades);
  const lowest = Math.min(...grades);
  
  return {
    average: parseFloat(average.toFixed(1)),
    highest,
    lowest,
    completed: completedEvaluations.length,
    pending: filteredEvaluations.value.length - completedEvaluations.length
  };
});

function getSubjectName(id) {
  const subject = subjects.value.find(s => s.id === id);
  return subject ? subject.name : "Desconhecido";
}

function getEvaluationTypeName(id) {
  const type = evaluationTypes.value.find(t => t.id === id);
  return type ? type.name : "Desconhecido";
}

export {
  academicYears,
  subjects,
  evaluationTypes,
  evaluationsData,
  searchFilters,
  selectedEvaluation,
  filteredEvaluations,
  evaluationStats,
  updateSearchFilter,
  selectEvaluation,
  clearSelectedEvaluation,
  getSubjectName,
  getEvaluationTypeName
};
