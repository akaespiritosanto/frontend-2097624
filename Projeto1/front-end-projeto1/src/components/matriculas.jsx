import './../styles/matriculas_design.css';
import { Fragment } from "preact";
import { useSignal, useComputed } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";
import SubjectSelector from "./matriculas/SubjectSelector.jsx";
import EnrollmentSummary from "./matriculas/EnrollmentSummary.jsx";
import EnrollmentStatus from "./matriculas/EnrollmentStatus.jsx";
import EnrollmentCredits from "./matriculas/EnrollmentCredits.jsx";
import {
    matriculasData,
    availableCourses,
    subjectsForSelectedCourse,
    isEnrollmentActive,
    updateMatriculasData,
    searchEnrollment,
    getCourseName,
    courseNameById
} from '../store/matriculasStore';

const Matriculas = () => {
    const isLoading = useSignal(false);
    const errorMessage = useSignal('');
    const showEnrollmentDetails = useSignal(false);
    const activeTab = useSignal('form');

    const currentCourseName = useComputed(() => {
        const courseId = matriculasData.value.course;
        return courseNameById.value[courseId] || "Desconhecido";
    });

    const handleSearch = (e) => {
        e.preventDefault();
        isLoading.value = true;
        errorMessage.value = '';

        searchEnrollment()
            .then(data => {
                console.log("Enrollment data:", data);
                isLoading.value = false;
                showEnrollmentDetails.value = true;
            })
            .catch(error => {
                console.error("Error searching enrollment:", error);
                errorMessage.value = 'Erro ao procurar matrícula. Tente novamente.';
                isLoading.value = false;
            });
    };

    const handleFieldChange = (field, value) => {
        updateMatriculasData(field, value);
    };

    const setActiveTab = (tab) => {
        activeTab.value = tab;
    };

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section class="matricula-info">
                    <h1>Gestão de Matrículas</h1>
                    <p>Bem-vindo à secção de gestão de matrículas. Aqui pode ver todas as informações relacionadas com a sua matrícula académica existente.</p>

                    {errorMessage.value && (
                        <div class="error-message">
                            {errorMessage.value}
                        </div>
                    )}

                    <div class="form-container">
                        <form onSubmit={handleSearch}>
                            <div class="form-group">
                                <label for="course">Curso</label>
                                <select
                                    id="course"
                                    name="course"
                                    value={matriculasData.value.course}
                                    onChange={(e) => handleFieldChange('course', e.target.value)}
                                >
                                    {availableCourses.value.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="year">Ano</label>
                                <select
                                    id="year"
                                    name="year"
                                    value={matriculasData.value.year}
                                    onChange={(e) => handleFieldChange('year', e.target.value)}
                                >
                                    <option value="1">1º Ano</option>
                                    <option value="2">2º Ano</option>
                                    <option value="3">3º Ano</option>
                                    <option value="4">4º Ano</option>
                                    <option value="5">5º Ano</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="subjects">Disciplinas</label>
                                <textarea
                                    id="subjects"
                                    name="subjects"
                                    placeholder="Lista das disciplinas que está a frequentar"
                                    value={matriculasData.value.subjects.map(s => s.name).join(', ')}
                                    readOnly
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <label for="status">Status da Matrícula</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={matriculasData.value.status}
                                    onChange={(e) => handleFieldChange('status', e.target.value)}
                                >
                                    <option value="ativa">Ativa</option>
                                    <option value="suspensa">Suspensa</option>
                                    <option value="concluida">Concluída</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="notes">Notas Adicionais</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Notas adicionais sobre a matrícula"
                                    value={matriculasData.value.notes}
                                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn" disabled={isLoading.value}>
                                    {isLoading.value ? 'A procurar...' : 'Procurar matrícula'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {showEnrollmentDetails.value && (
                        <div class="enrollment-components">
                            <EnrollmentSummary
                                studentName={matriculasData.value.studentName}
                                studentId={matriculasData.value.studentId}
                                course={currentCourseName.value}
                                year={matriculasData.value.year}
                                status={matriculasData.value.status}
                                lastUpdated={matriculasData.value.lastUpdated}
                            >
                                <EnrollmentStatus />
                            </EnrollmentSummary>

                            <SubjectSelector
                                availableSubjects={subjectsForSelectedCourse.value}
                                selectedSubjects={matriculasData.value.subjects}
                                courseId={matriculasData.value.course}
                            />

                            <EnrollmentCredits />
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

export default Matriculas;