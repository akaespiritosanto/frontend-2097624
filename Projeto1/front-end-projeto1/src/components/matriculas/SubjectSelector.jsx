import { useSignal } from "@preact/signals";
import { addSubject, removeSubject } from '../../store/matriculasStore';

const SubjectSelector = ({ availableSubjects, selectedSubjects, courseId }) => {
    const selectedSubjectId = useSignal('');
    const showConfirmation = useSignal(false);
    const subjectToRemove = useSignal(null);

    const handleAddSubject = () => {
        if (selectedSubjectId.value) {
            const success = addSubject(selectedSubjectId.value);
            if (success) {
                selectedSubjectId.value = '';
            }
        }
    };

    const confirmRemoveSubject = (subject) => {
        subjectToRemove.value = subject;
        showConfirmation.value = true;
    };

    const handleRemoveSubject = () => {
        if (subjectToRemove.value) {
            removeSubject(subjectToRemove.value.id);
            showConfirmation.value = false;
            subjectToRemove.value = null;
        }
    };

    const cancelRemoveSubject = () => {
        showConfirmation.value = false;
        subjectToRemove.value = null;
    };

    return (
        <div class="subject-selector">
            <h2>Selecionar Disciplinas</h2>
            
            <div class="subject-selection">
                <select 
                    value={selectedSubjectId.value}
                    onChange={(e) => selectedSubjectId.value = e.target.value}
                >
                    <option value="">-- Selecione uma disciplina --</option>
                    {availableSubjects.map(subject => (
                        <option 
                            key={subject.id} 
                            value={subject.id}
                            disabled={selectedSubjects.some(s => s.id === subject.id)}
                        >
                            {subject.name}
                        </option>
                    ))}
                </select>
                <button 
                    class="btn-add" 
                    onClick={handleAddSubject}
                    disabled={!selectedSubjectId.value}
                >
                    Adicionar
                </button>
            </div>

            <div class="selected-subjects">
                <h3>Disciplinas Selecionadas</h3>
                {selectedSubjects.length === 0 ? (
                    <p class="no-subjects">Nenhuma disciplina selecionada</p>
                ) : (
                    <ul>
                        {selectedSubjects.map(subject => (
                            <li key={subject.id}>
                                <span>{subject.name}</span>
                                <button 
                                    class="btn-remove" 
                                    onClick={() => confirmRemoveSubject(subject)}
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showConfirmation.value && (
                <div class="confirmation-dialog">
                    <div class="confirmation-content">
                        <p>Tem certeza que deseja remover a disciplina "{subjectToRemove.value?.name}"?</p>
                        <div class="confirmation-buttons">
                            <button class="btn-confirm" onClick={handleRemoveSubject}>Sim, remover</button>
                            <button class="btn-cancel" onClick={cancelRemoveSubject}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectSelector;
