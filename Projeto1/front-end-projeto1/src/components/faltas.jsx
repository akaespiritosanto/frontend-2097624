import './../styles/faltas_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";
import SearchForm from "./faltas/SearchForm.jsx";
import AbsenceList from "./faltas/AbsenceList.jsx";
import AbsenceStats from "./faltas/AbsenceStats.jsx";
import {
  academicYears,
  subjects,
  attendanceStatus,
  filteredAbsences,
  absenceStats,
  searchFilters,
  updateSearchFilter,
  addAbsenceRecord,
  updateAbsenceRecord,
  getSubjectName,
  getStatusName
} from "../store/faltasStore";

const Faltas = () => {
    const selectedAbsence = useSignal(null);
    const showAbsenceForm = useSignal(false);
    const newAbsence = useSignal({
        date: new Date().toISOString().split('T')[0],
        subjectId: "",
        status: "presente",
        notes: ""
    });

    const handleSearch = () => {
        console.log("Searching with filters:", searchFilters.value);
    };

    const handleAbsenceSelect = (absence) => {
        selectedAbsence.value = absence;
    };

    const handleAddAbsence = (e) => {
        e.preventDefault();
        addAbsenceRecord(newAbsence.value);
        newAbsence.value = {
            date: new Date().toISOString().split('T')[0],
            subjectId: "",
            status: "presente",
            notes: ""
        };
        showAbsenceForm.value = false;
    };

    const handleNewAbsenceChange = (field, value) => {
        newAbsence.value = { ...newAbsence.value, [field]: value };
    };

    const AbsenceListHeader = () => (
        <div className="absence-list-actions">
            <button
                className="btn-action"
                onClick={() => { showAbsenceForm.value = !showAbsenceForm.value; }}
            >
                {showAbsenceForm.value ? "Cancelar" : "Registrar Nova Presença"}
            </button>
        </div>
    );

    const AbsenceListEmpty = () => (
        <div className="absence-list-empty-custom">
            <p>Não foram encontradas faltas com os critérios selecionados.</p>
            <p>Tente ajustar os filtros ou registrar uma nova presença.</p>
        </div>
    );

    const AbsenceListFooter = () => (
        <div className="absence-list-footer-info">
            <p>Última atualização: {new Date().toLocaleDateString()}</p>
            <p>Total de registros: {filteredAbsences.value.length}</p>
        </div>
    );

    return(
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                {}
                <SearchForm
                    title="Gestão de Faltas"
                    fields={[
                        { id: "academicYear", label: "Ano Lectivo", type: "select" },
                        { id: "subjectId", label: "Disciplina", type: "select" },
                        { id: "status", label: "Estado de Presença", type: "select" }
                    ]}
                    values={searchFilters.value}
                    onChange={updateSearchFilter}
                    onSubmit={handleSearch}
                    options={{
                        academicYear: academicYears.value.map(year => ({ id: year, name: year })),
                        subjectId: subjects.value,
                        status: attendanceStatus.value
                    }}
                />

                {}
                <AbsenceStats
                    stats={absenceStats.value}
                    title="Estatísticas de Presença"
                />

                {}
                {showAbsenceForm.value && (
                    <div className="absence-detail-container">
                        <h1>Registrar Nova Presença</h1>
                        <form onSubmit={handleAddAbsence}>
                            <div className="form-group">
                                <label htmlFor="date">Data</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={newAbsence.value.date}
                                    onChange={(e) => handleNewAbsenceChange("date", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subjectId">Disciplina</label>
                                <select
                                    id="subjectId"
                                    value={newAbsence.value.subjectId}
                                    onChange={(e) => handleNewAbsenceChange("subjectId", e.target.value)}
                                    required
                                >
                                    <option value="">Selecione uma disciplina</option>
                                    {subjects.value.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Estado</label>
                                <select
                                    id="status"
                                    value={newAbsence.value.status}
                                    onChange={(e) => handleNewAbsenceChange("status", e.target.value)}
                                    required
                                >
                                    {attendanceStatus.value.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notas</label>
                                <textarea
                                    id="notes"
                                    value={newAbsence.value.notes}
                                    onChange={(e) => handleNewAbsenceChange("notes", e.target.value)}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn">Salvar</button>
                            </div>
                        </form>
                    </div>
                )}

                <AbsenceList
                    absences={filteredAbsences.value}
                    getSubjectName={getSubjectName}
                    getStatusName={getStatusName}
                    onAbsenceSelect={handleAbsenceSelect}
                    headerSlot={<AbsenceListHeader />}
                    emptySlot={<AbsenceListEmpty />}
                    footerSlot={<AbsenceListFooter />}
                />
                
                {selectedAbsence.value && (
                    <div className="absence-detail-container">
                        <h1>Detalhes da Presença</h1>
                        <div className="absence-details">
                            <p><strong>Data:</strong> {selectedAbsence.value.date}</p>
                            <p><strong>Disciplina:</strong> {getSubjectName(selectedAbsence.value.subjectId)}</p>
                            <p><strong>Estado:</strong> {getStatusName(selectedAbsence.value.status)}</p>
                            <p><strong>Notas:</strong> {selectedAbsence.value.notes || "Nenhuma nota disponível"}</p>
                        </div>
                        <div className="absence-actions">
                            <button
                                className="btn-action"
                                onClick={() => { selectedAbsence.value = null; }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Faltas;