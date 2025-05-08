import { useSignal } from "@preact/signals";

const EnrollmentSummary = ({ 
    studentName, 
    studentId, 
    course, 
    year, 
    status, 
    lastUpdated,
    children 
}) => {
    const isExpanded = useSignal(false);

    const toggleExpand = () => {
        isExpanded.value = !isExpanded.value;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'ativa': return 'status-active';
            case 'suspensa': return 'status-suspended';
            case 'concluida': return 'status-completed';
            default: return '';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'ativa': return 'Ativa';
            case 'suspensa': return 'Suspensa';
            case 'concluida': return 'Concluída';
            default: return status;
        }
    };

    return (
        <div class="enrollment-summary">
            <div class="summary-header">
                <h2>Resumo da Matrícula</h2>
                <button 
                    class={`expand-button ${isExpanded.value ? 'expanded' : ''}`}
                    onClick={toggleExpand}
                >
                    {isExpanded.value ? 'Recolher' : 'Expandir'}
                </button>
            </div>

            <div class={`summary-content ${isExpanded.value ? 'expanded' : ''}`}>
                <div class="summary-basic-info">
                    <div class="info-row">
                        <span class="info-label">Aluno:</span>
                        <span class="info-value">{studentName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Número:</span>
                        <span class="info-value">{studentId}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Curso:</span>
                        <span class="info-value">{course}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Ano:</span>
                        <span class="info-value">{year}º Ano</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Estado:</span>
                        <span class={`info-value ${getStatusClass(status)}`}>
                            {getStatusLabel(status)}
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Última Atualização:</span>
                        <span class="info-value">{formatDate(lastUpdated)}</span>
                    </div>
                </div>

                <div class="summary-details">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentSummary;
