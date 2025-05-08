import { useComputed } from "@preact/signals";
import { 
    matriculasData, 
    courseCredits, 
    subjectCredits, 
    totalEnrolledCredits 
} from '../../store/matriculasStore';

const EnrollmentCredits = () => {
    const currentCourseCredits = useComputed(() => {
        const courseId = matriculasData.value.course;
        return courseCredits.value[courseId] || { total: 0, required: 0, optional: 0 };
    });

    const subjectCreditsList = useComputed(() => {
        const subjects = matriculasData.value.subjects || [];
        return subjects.map(subject => ({
            ...subject,
            credits: subjectCredits.value[subject.id] || 0
        }));
    });

    const creditsProgress = useComputed(() => {
        const total = currentCourseCredits.value.total;
        const enrolled = totalEnrolledCredits.value;
        
        if (total === 0) return 0;
        return Math.min(100, Math.round((enrolled / total) * 100));
    });

    const getProgressBarClass = (percentage) => {
        if (percentage < 30) return 'progress-low';
        if (percentage < 70) return 'progress-medium';
        return 'progress-high';
    };

    return (
        <div class="enrollment-credits">
            <h3>Créditos do Curso</h3>
            
            <div class="credits-summary">
                <div class="credits-row">
                    <span class="credits-label">Total de Créditos do Curso:</span>
                    <span class="credits-value">{currentCourseCredits.value.total}</span>
                </div>
                <div class="credits-row">
                    <span class="credits-label">Créditos Obrigatórios:</span>
                    <span class="credits-value">{currentCourseCredits.value.required}</span>
                </div>
                <div class="credits-row">
                    <span class="credits-label">Créditos Opcionais:</span>
                    <span class="credits-value">{currentCourseCredits.value.optional}</span>
                </div>
                <div class="credits-row">
                    <span class="credits-label">Créditos Matriculados:</span>
                    <span class="credits-value">{totalEnrolledCredits.value}</span>
                </div>
            </div>
            
            <div class="credits-progress">
                <div class="progress-label">
                    Progresso: {creditsProgress.value}%
                </div>
                <div class="progress-bar-container">
                    <div 
                        class={`progress-bar ${getProgressBarClass(creditsProgress.value)}`}
                        style={`width: ${creditsProgress.value}%`}
                    ></div>
                </div>
            </div>
            
            <div class="subject-credits-list">
                <h4>Créditos por Disciplina</h4>
                {subjectCreditsList.value.length === 0 ? (
                    <p class="no-subjects">Nenhuma disciplina selecionada</p>
                ) : (
                    <ul>
                        {subjectCreditsList.value.map(subject => (
                            <li key={subject.id} class="subject-credit-item">
                                <span class="subject-name">{subject.name}</span>
                                <span class="subject-credits">{subject.credits} créditos</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EnrollmentCredits;
