import { useSignal, useComputed } from "@preact/signals";
import { 
    isEnrollmentActive, 
    enrollmentDeadline, 
    enrollmentHistory 
} from '../../store/matriculasStore';

const EnrollmentStatus = () => {
    const showHistory = useSignal(false);

    const daysUntilDeadline = useComputed(() => {
        if (!enrollmentDeadline.value) return null;
        
        const deadline = new Date(enrollmentDeadline.value);
        const today = new Date();
        
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    });

    const deadlineStatus = useComputed(() => {
        if (!daysUntilDeadline.value) return null;
        
        if (daysUntilDeadline.value < 0) {
            return { message: "Prazo expirado", class: "deadline-expired" };
        } else if (daysUntilDeadline.value <= 7) {
            return { message: `${daysUntilDeadline.value} dias restantes`, class: "deadline-warning" };
        } else {
            return { message: `${daysUntilDeadline.value} dias restantes`, class: "deadline-ok" };
        }
    });

    const toggleHistory = () => {
        showHistory.value = !showHistory.value;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div class="enrollment-status">
            <div class="status-header">
                <h3>Estado da Matrícula</h3>
            </div>
            
            <div class="status-content">
                <div class="status-indicator">
                    <span class={`indicator ${isEnrollmentActive.value ? 'active' : 'inactive'}`}></span>
                    <span class="status-text">
                        {isEnrollmentActive.value ? 'Matrícula Ativa' : 'Matrícula Inativa'}
                    </span>
                </div>
                
                {enrollmentDeadline.value && (
                    <div class="deadline-info">
                        <div class="deadline-date">
                            <span class="deadline-label">Prazo de Matrícula:</span>
                            <span class="deadline-value">{formatDate(enrollmentDeadline.value)}</span>
                        </div>
                        
                        {deadlineStatus.value && (
                            <div class={`deadline-countdown ${deadlineStatus.value.class}`}>
                                {deadlineStatus.value.message}
                            </div>
                        )}
                    </div>
                )}
                
                <div class="history-section">
                    <button class="history-toggle" onClick={toggleHistory}>
                        {showHistory.value ? 'Ocultar Histórico' : 'Mostrar Histórico'}
                    </button>
                    
                    {showHistory.value && (
                        <div class="history-list">
                            <h4>Histórico de Alterações</h4>
                            {enrollmentHistory.value.length === 0 ? (
                                <p class="no-history">Nenhum histórico disponível</p>
                            ) : (
                                <ul>
                                    {enrollmentHistory.value.map((entry, index) => (
                                        <li key={index} class="history-item">
                                            <div class="history-date">{formatDate(entry.date)}</div>
                                            <div class="history-action">{entry.action}</div>
                                            <div class="history-details">{entry.details}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentStatus;
