import './../styles/pautas_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterRelative from "./footer-relative.jsx";
import SearchForm from "./pautas/SearchForm.jsx";
import GradesList from "./pautas/GradesList.jsx";
import StudentsList from "./pautas/StudentsList.jsx";
import GradeDetails from "./pautas/GradeDetails.jsx";
import {
  academicYears,
  evaluationTypes,
  filteredDisciplines,
  filteredGrades,
  studentsForSelectedGrades,
  searchFilters,
  updateSearchFilter,
  getDisciplineName,
  getEvaluationTypeName
} from "../store/pautasStore";

const Pautas = () => {
    const selectedGrade = useSignal(null);
    const isLoading = useSignal(false);

    const handleDisciplineSearch = () => {
      console.log("Searching disciplines with filters:", searchFilters.value);
    };

    const handleEvaluationSearch = () => {
      console.log("Searching evaluations with filters:", searchFilters.value);
    };

    const handleGradeSelect = (grade) => {
      selectedGrade.value = grade;
      isLoading.value = true;

      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };

    const GradesListHeader = () => (
      <div className="grades-info">
        <p>Total de pautas encontradas: {filteredGrades.value.length}</p>
        <p>Clique em "Ver Alunos" para visualizar os alunos associados a cada pauta.</p>
      </div>
    );

    const GradesListEmpty = () => (
      <div className="grades-empty">
        <p>Nenhuma pauta encontrada com os critérios selecionados.</p>
        <p>Tente ajustar os filtros de pesquisa.</p>
      </div>
    );

    const StudentsListFooter = () => (
      <div className="students-stats">
        <p>Estatísticas:</p>
        <ul>
          <li>Total de alunos: {studentsForSelectedGrades.value.length}</li>
          <li>Média das notas: {calculateAverageGrade()}</li>
        </ul>
      </div>
    );

    const calculateAverageGrade = () => {
      const students = studentsForSelectedGrades.value;
      if (students.length === 0) return "N/A";

      let total = 0;
      let count = 0;

      students.forEach(student => {
        student.filteredGrades.forEach(grade => {
          total += grade.value;
          count++;
        });
      });

      return count > 0 ? (total / count).toFixed(1) : "N/A";
    };

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <SearchForm
                  title="Pesquisa de Disciplinas"
                  fields={[
                    { id: "academicYear", label: "Ano Lectivo", type: "select" },
                    { id: "disciplineId", label: "Disciplina", type: "select" }
                  ]}
                  values={searchFilters.value}
                  onChange={updateSearchFilter}
                  onSubmit={handleDisciplineSearch}
                  options={{
                    academicYear: academicYears.value,
                    disciplineId: filteredDisciplines.value
                  }}
                />

                <SearchForm
                  title="Pesquisa de Avaliações"
                  fields={[
                    { id: "evaluationType", label: "Tipo de Avaliação", type: "select" }
                  ]}
                  values={searchFilters.value}
                  onChange={updateSearchFilter}
                  onSubmit={handleEvaluationSearch}
                  options={{
                    evaluationType: evaluationTypes.value
                  }}
                />

                <GradesList
                  grades={filteredGrades.value}
                  getDisciplineName={getDisciplineName}
                  getEvaluationTypeName={getEvaluationTypeName}
                  onGradeSelect={handleGradeSelect}
                  headerSlot={<GradesListHeader />}
                  emptySlot={<GradesListEmpty />}
                />

                <StudentsList
                  students={studentsForSelectedGrades.value}
                  loading={isLoading.value}
                  footerSlot={<StudentsListFooter />}
                />

                {selectedGrade.value && (
                  <section className="grade-details-section">
                    <h1>Detalhes da Pauta</h1>
                    <GradeDetails
                      grade={selectedGrade.value}
                      getDisciplineName={getDisciplineName}
                      getEvaluationTypeName={getEvaluationTypeName}
                      headerSlot={
                        <div className="grade-details-custom-header">
                          <h2>{selectedGrade.value.title}</h2>
                          <span className="grade-year">{selectedGrade.value.year}</span>
                        </div>
                      }
                      infoSlot={
                        <div className="grade-additional-info">
                          <h3>Informações Adicionais</h3>
                          <p>Esta pauta contém as avaliações dos alunos para a disciplina selecionada.</p>
                          <p>Total de alunos: {studentsForSelectedGrades.value.length}</p>
                        </div>
                      }
                      actionsSlot={
                        <div className="grade-actions">
                          <button
                            className="btn-action"
                            onClick={() => { alert('Exportando pauta para PDF...'); }}
                          >
                            Exportar PDF
                          </button>
                          <button
                            className="btn-action"
                            onClick={() => { alert('Enviando pauta por email...'); }}
                          >
                            Enviar por Email
                          </button>
                        </div>
                      }
                      footerSlot={
                        <div className="grade-footer-info">
                          <p>Última atualização: {new Date().toLocaleDateString()}</p>
                        </div>
                      }
                    />
                  </section>
                )}
            </main>

            <div>
                <FooterRelative />
            </div>
        </Fragment>
    );
};

export default Pautas;