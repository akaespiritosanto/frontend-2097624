import { signal, computed } from "@preact/signals";

let initialData;
try {
  initialData = {
    studentId: "A12345",
    studentName: "João Silva",
    course: "informatica",
    year: "2",
    subjects: [
      { id: "prog1", name: "Programação I" },
      { id: "bd", name: "Bases de Dados" }
    ],
    status: "ativa",
    notes: "Aluno com bom aproveitamento nas disciplinas de programação.",
    lastUpdated: new Date().toISOString()
  };
} catch (error) {
  console.error("Error creating initial data:", error);
  initialData = {
    studentId: "",
    studentName: "",
    course: "informatica",
    year: "1",
    subjects: [],
    status: "ativa",
    notes: "",
    lastUpdated: new Date().toISOString()
  };
}

const matriculasData = signal(initialData);

let coursesData;
try {
  coursesData = [
    { id: "informatica", name: "Informática" },
    { id: "engenharia", name: "Engenharia" },
    { id: "biologia", name: "Biologia" },
    { id: "direito", name: "Direito" },
    { id: "medicina", name: "Medicina" },
    { id: "arquitetura", name: "Arquitetura" },
    { id: "economia", name: "Economia" }
  ];
} catch (error) {
  console.error("Error creating courses data:", error);
  coursesData = [
    { id: "informatica", name: "Informática" }
  ];
}

const availableCourses = signal(coursesData);

let subjectsData;
try {
  subjectsData = {
    informatica: [
      { id: "prog1", name: "Programação I" },
      { id: "bd", name: "Bases de Dados" },
      { id: "redes", name: "Redes de Computadores" },
      { id: "ia", name: "Inteligência Artificial" },
      { id: "web", name: "Desenvolvimento Web" },
      { id: "mobile", name: "Desenvolvimento Mobile" }
    ],
    engenharia: [
      { id: "calc1", name: "Cálculo I" },
      { id: "fisica1", name: "Física I" },
      { id: "mecanica", name: "Mecânica" },
      { id: "eletrica", name: "Engenharia Elétrica" },
      { id: "materiais", name: "Ciência dos Materiais" }
    ],
    biologia: [
      { id: "bio1", name: "Biologia Celular" },
      { id: "quimica", name: "Química Orgânica" },
      { id: "genetica", name: "Genética" },
      { id: "ecologia", name: "Ecologia" },
      { id: "botanica", name: "Botânica" }
    ],
    direito: [
      { id: "civil", name: "Direito Civil" },
      { id: "penal", name: "Direito Penal" },
      { id: "constitucional", name: "Direito Constitucional" },
      { id: "trabalho", name: "Direito do Trabalho" },
      { id: "tributario", name: "Direito Tributário" }
    ],
    medicina: [
      { id: "anatomia", name: "Anatomia" },
      { id: "fisiologia", name: "Fisiologia" },
      { id: "bioquimica", name: "Bioquímica" },
      { id: "patologia", name: "Patologia" },
      { id: "farmacologia", name: "Farmacologia" }
    ],
    arquitetura: [
      { id: "desenho", name: "Desenho Técnico" },
      { id: "historia", name: "História da Arquitetura" },
      { id: "projetos", name: "Projetos" },
      { id: "urbanismo", name: "Urbanismo" },
      { id: "paisagismo", name: "Paisagismo" }
    ],
    economia: [
      { id: "micro", name: "Microeconomia" },
      { id: "macro", name: "Macroeconomia" },
      { id: "estatistica", name: "Estatística" },
      { id: "financas", name: "Finanças" },
      { id: "contabilidade", name: "Contabilidade" }
    ]
  };
} catch (error) {
  console.error("Error creating subjects data:", error);
  subjectsData = {
    informatica: [
      { id: "prog1", name: "Programação I" },
      { id: "bd", name: "Bases de Dados" }
    ]
  };
}

const availableSubjects = signal(subjectsData);

const enrollmentDeadline = signal("2025-02-28T23:59:59");

const enrollmentHistory = signal([
  {
    date: "2024-09-15T10:30:00",
    action: "Matrícula Criada",
    details: "Matrícula inicial para o curso de Informática"
  },
  {
    date: "2024-09-20T14:45:00",
    action: "Disciplina Adicionada",
    details: "Adicionada a disciplina: Programação I"
  },
  {
    date: "2024-09-22T09:15:00",
    action: "Disciplina Adicionada",
    details: "Adicionada a disciplina: Bases de Dados"
  }
]);

const courseCredits = signal({
  informatica: { total: 240, required: 180, optional: 60 },
  engenharia: { total: 300, required: 240, optional: 60 },
  biologia: { total: 240, required: 200, optional: 40 },
  direito: { total: 240, required: 210, optional: 30 },
  medicina: { total: 360, required: 340, optional: 20 },
  arquitetura: { total: 300, required: 270, optional: 30 },
  economia: { total: 240, required: 180, optional: 60 }
});

const subjectCredits = signal({
  prog1: 6,
  bd: 6,
  redes: 6,
  ia: 6,
  web: 6,
  mobile: 6,
  calc1: 6,
  fisica1: 6,
  mecanica: 6,
  eletrica: 6,
  materiais: 6,
  bio1: 6,
  quimica: 6,
  genetica: 6,
  ecologia: 6,
  botanica: 6,
  civil: 6,
  penal: 6,
  constitucional: 6,
  trabalho: 6,
  tributario: 6,
  anatomia: 6,
  fisiologia: 6,
  bioquimica: 6,
  patologia: 6,
  farmacologia: 6,
  desenho: 6,
  historia: 6,
  projetos: 6,
  urbanismo: 6,
  paisagismo: 6,
  micro: 6,
  macro: 6,
  estatistica: 6,
  financas: 6,
  contabilidade: 6
});

const subjectsForSelectedCourse = computed(() => {
  try {
    const courseId = matriculasData.value.course;
    return availableSubjects.value[courseId] || [];
  } catch (error) {
    console.error("Error in subjectsForSelectedCourse computed:", error);
    return [];
  }
});

const isEnrollmentActive = computed(() => {
  try {
    return matriculasData.value.status === "ativa";
  } catch (error) {
    console.error("Error in isEnrollmentActive computed:", error);
    return true;
  }
});

const totalEnrolledCredits = computed(() => {
  try {
    const subjects = matriculasData.value.subjects || [];
    return subjects.reduce((total, subject) => {
      const credits = subjectCredits.value[subject.id] || 0;
      return total + credits;
    }, 0);
  } catch (error) {
    console.error("Error in totalEnrolledCredits computed:", error);
    return 0;
  }
});

const courseNameById = computed(() => {
  try {
    const courseMap = {};
    availableCourses.value.forEach(course => {
      courseMap[course.id] = course.name;
    });
    return courseMap;
  } catch (error) {
    console.error("Error in courseNameById computed:", error);
    return {};
  }
});

function updateMatriculasData(field, value) {
  try {
    if (field && value !== undefined) {
      const oldValue = matriculasData.value[field];
      matriculasData.value = {
        ...matriculasData.value,
        [field]: value,
        lastUpdated: new Date().toISOString()
      };

      const now = new Date().toISOString();

      if (field === "subjects") {
        const addedSubjects = value.filter(newSubj =>
          !oldValue.some(oldSubj => oldSubj.id === newSubj.id)
        );

        const removedSubjects = oldValue.filter(oldSubj =>
          !value.some(newSubj => newSubj.id === oldSubj.id)
        );

        if (addedSubjects.length > 0) {
          addToEnrollmentHistory(now, "Disciplina Adicionada",
            `Adicionada a disciplina: ${addedSubjects.map(s => s.name).join(', ')}`);
        }

        if (removedSubjects.length > 0) {
          addToEnrollmentHistory(now, "Disciplina Removida",
            `Removida a disciplina: ${removedSubjects.map(s => s.name).join(', ')}`);
        }
      } else if (field === "course") {
        const courseName = availableCourses.value.find(c => c.id === value)?.name || value;
        addToEnrollmentHistory(now, "Curso Alterado", `Alterado para: ${courseName}`);
      } else if (field === "status") {
        addToEnrollmentHistory(now, "Status Alterado", `Status alterado para: ${value}`);
      }

      console.log(`Updated ${field} to:`, value);
    }
  } catch (error) {
    console.error("Error updating matriculas data:", error);
  }
}

function addToEnrollmentHistory(date, action, details) {
  try {
    enrollmentHistory.value = [
      { date, action, details },
      ...enrollmentHistory.value
    ];
  } catch (error) {
    console.error("Error adding to enrollment history:", error);
  }
}

function addSubject(subjectId) {
  try {
    if (!subjectId) return false;

    const subject = subjectsForSelectedCourse.value.find(s => s.id === subjectId);
    if (!subject) return false;

    const currentSubjects = matriculasData.value.subjects || [];
    if (!currentSubjects.some(s => s.id === subjectId)) {
      const updatedSubjects = [...currentSubjects, subject];
      updateMatriculasData("subjects", updatedSubjects);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error adding subject:", error);
    return false;
  }
}

function removeSubject(subjectId) {
  try {
    if (!subjectId) return;

    const currentSubjects = matriculasData.value.subjects || [];
    const updatedSubjects = currentSubjects.filter(s => s.id !== subjectId);
    updateMatriculasData("subjects", updatedSubjects);
  } catch (error) {
    console.error("Error removing subject:", error);
  }
}

function searchEnrollment() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(matriculasData.value);
      }, 500);
    } catch (error) {
      console.error("Error in searchEnrollment:", error);
      reject(error);
    }
  });
}

function getCourseName(courseId) {
  try {
    const course = availableCourses.value.find(c => c.id === courseId);
    return course ? course.name : "Desconhecido";
  } catch (error) {
    console.error("Error getting course name:", error);
    return "Desconhecido";
  }
}

export {
  matriculasData,
  availableCourses,
  availableSubjects,
  subjectsForSelectedCourse,
  isEnrollmentActive,
  enrollmentDeadline,
  enrollmentHistory,
  courseCredits,
  subjectCredits,
  totalEnrolledCredits,
  courseNameById,
  updateMatriculasData,
  addSubject,
  removeSubject,
  searchEnrollment,
  getCourseName
};
