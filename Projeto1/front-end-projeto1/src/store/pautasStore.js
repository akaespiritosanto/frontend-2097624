import { signal, computed } from "@preact/signals";

const academicYears = signal([
  "2024/25",
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20"
]);

const evaluationTypes = signal([
  { id: "teste", name: "Teste" },
  { id: "trabalho", name: "Trabalho" },
  { id: "exame", name: "Exame" },
  { id: "projeto", name: "Projeto" }
]);

const disciplines = signal([
  { id: "mat_ctesp", name: "Matemática_CTeSP_TPSI [S1]", year: "2023/24" },
  { id: "prog_ctesp", name: "Programação_CTeSP_TPSI [S1]", year: "2023/24" },
  { id: "bd_ctesp", name: "Bases de Dados_CTeSP_TPSI [S2]", year: "2023/24" },
  { id: "redes_ctesp", name: "Redes_CTeSP_TPSI [S2]", year: "2023/24" },
  { id: "ia_ctesp", name: "Inteligência Artificial_CTeSP_TPSI [S3]", year: "2024/25" }
]);

const gradesData = signal([
  { 
    id: 1, 
    disciplineId: "mat_ctesp", 
    evaluationType: "teste", 
    date: "2023-10-15", 
    title: "Teste 1 - Matemática",
    year: "2023/24"
  },
  { 
    id: 2, 
    disciplineId: "mat_ctesp", 
    evaluationType: "teste", 
    date: "2023-12-10", 
    title: "Teste 2 - Matemática",
    year: "2023/24"
  },
  { 
    id: 3, 
    disciplineId: "prog_ctesp", 
    evaluationType: "trabalho", 
    date: "2023-11-20", 
    title: "Trabalho 1 - Programação",
    year: "2023/24"
  },
  { 
    id: 4, 
    disciplineId: "prog_ctesp", 
    evaluationType: "exame", 
    date: "2024-01-15", 
    title: "Exame Final - Programação",
    year: "2023/24"
  },
  { 
    id: 5, 
    disciplineId: "bd_ctesp", 
    evaluationType: "projeto", 
    date: "2024-04-10", 
    title: "Projeto - Base de Dados",
    year: "2023/24"
  }
]);

const studentsData = signal([
  { id: 1, name: "Ana Silva", number: "A12345", grades: [
    { gradeId: 1, value: 16 },
    { gradeId: 2, value: 18 },
    { gradeId: 3, value: 15 }
  ]},
  { id: 2, name: "João Pereira", number: "A12346", grades: [
    { gradeId: 1, value: 14 },
    { gradeId: 2, value: 13 },
    { gradeId: 3, value: 17 }
  ]},
  { id: 3, name: "Maria Santos", number: "A12347", grades: [
    { gradeId: 1, value: 19 },
    { gradeId: 2, value: 17 },
    { gradeId: 4, value: 18 }
  ]},
  { id: 4, name: "Pedro Costa", number: "A12348", grades: [
    { gradeId: 3, value: 16 },
    { gradeId: 4, value: 15 },
    { gradeId: 5, value: 17 }
  ]}
]);

const searchFilters = signal({
  academicYear: "2023/24",
  disciplineId: "",
  evaluationType: ""
});

function updateSearchFilter(field, value) {
  searchFilters.value = { ...searchFilters.value, [field]: value };
}

const filteredDisciplines = computed(() => {
  const year = searchFilters.value.academicYear;
  if (!year) return disciplines.value;
  return disciplines.value.filter(discipline => discipline.year === year);
});

const filteredGrades = computed(() => {
  const { academicYear, disciplineId, evaluationType } = searchFilters.value;
  
  return gradesData.value.filter(grade => {
    const yearMatch = !academicYear || grade.year === academicYear;
    const disciplineMatch = !disciplineId || grade.disciplineId === disciplineId;
    const typeMatch = !evaluationType || grade.evaluationType === evaluationType;
    
    return yearMatch && disciplineMatch && typeMatch;
  });
});

const studentsForSelectedGrades = computed(() => {
  const selectedGradeIds = filteredGrades.value.map(grade => grade.id);
  
  if (selectedGradeIds.length === 0) return [];
  
  return studentsData.value.filter(student => 
    student.grades.some(grade => selectedGradeIds.includes(grade.gradeId))
  ).map(student => {
    const filteredStudentGrades = student.grades.filter(grade => 
      selectedGradeIds.includes(grade.gradeId)
    );
    
    return {
      ...student,
      filteredGrades: filteredStudentGrades
    };
  });
});

function getDisciplineName(id) {
  const discipline = disciplines.value.find(d => d.id === id);
  return discipline ? discipline.name : "Desconhecido";
}

function getEvaluationTypeName(id) {
  const type = evaluationTypes.value.find(t => t.id === id);
  return type ? type.name : "Desconhecido";
}

export {
  academicYears,
  evaluationTypes,
  disciplines,
  gradesData,
  studentsData,
  searchFilters,
  filteredDisciplines,
  filteredGrades,
  studentsForSelectedGrades,
  updateSearchFilter,
  getDisciplineName,
  getEvaluationTypeName
};
