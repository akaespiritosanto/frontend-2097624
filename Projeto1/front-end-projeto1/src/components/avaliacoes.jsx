import './../styles/avaliacoes_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterFixed from "./footer-fixed.jsx";
import EvaluationFilter from "./avaliacoes/EvaluationFilter.jsx";
import EvaluationList from "./avaliacoes/EvaluationList.jsx";
import EvaluationStats from "./avaliacoes/EvaluationStats.jsx";
import EvaluationDetails from "./avaliacoes/EvaluationDetails.jsx";
import {
  academicYears,
  subjects,
  evaluationTypes,
  filteredEvaluations,
  evaluationStats,
  searchFilters,
  selectedEvaluation,
  updateSearchFilter,
  selectEvaluation,
  clearSelectedEvaluation,
  getSubjectName,
  getEvaluationTypeName
} from "../store/avaliacoesStore";

const Avaliacoes = () => {
    const isLoading = useSignal(false);
    const handleSearch = () => {
        isLoading.value = true;
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    };

    const handleEvaluationSelect = (evaluation) => {
        selectEvaluation(evaluation);
    };

    const EvaluationListHeader = () => (
        <div className="evaluation-list-header">
            <p>Visualize suas avaliações e clique em "Detalhes" para mais informações.</p>
        </div>
    );

    const EvaluationListEmpty = () => (
        <div className="evaluation-list-empty">
            <p>Nenhuma avaliação encontrada com os filtros selecionados.</p>
            <p>Tente ajustar os filtros para ver mais resultados.</p>
        </div>
    );

    const EvaluationListFooter = () => (
        <div className="evaluation-list-footer">
            <p>Total de avaliações: {filteredEvaluations.value.length}</p>
        </div>
    );

    const EvaluationStatsHeader = () => (
        <div className="evaluation-stats-header">
            <p>Resumo do seu desempenho acadêmico</p>
        </div>
    );

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <section className="assessments">
                    <h1>Avaliações</h1>
                    <p>Consulte as suas notas e avaliações.</p>

                    <EvaluationFilter
                        title="Filtrar Avaliações"
                        fields={[
                            { id: "academicYear", label: "Ano Letivo", type: "select" },
                            { id: "subjectId", label: "Disciplina", type: "select" },
                            { id: "evaluationType", label: "Tipo de Avaliação", type: "select" }
                        ]}
                        values={searchFilters.value}
                        onChange={updateSearchFilter}
                        onSubmit={handleSearch}
                        options={{
                            academicYear: academicYears.value.map(year => ({ id: year, name: year })),
                            subjectId: subjects.value,
                            evaluationType: evaluationTypes.value
                        }}
                    />

                    <EvaluationStats
                        stats={evaluationStats.value}
                        title="Estatísticas de Desempenho"
                        headerSlot={<EvaluationStatsHeader />}
                    />

                    <EvaluationList
                        evaluations={filteredEvaluations.value}
                        getSubjectName={getSubjectName}
                        getEvaluationTypeName={getEvaluationTypeName}
                        onEvaluationSelect={handleEvaluationSelect}
                        headerSlot={<EvaluationListHeader />}
                        emptySlot={<EvaluationListEmpty />}
                        footerSlot={<EvaluationListFooter />}
                    />

                    {selectedEvaluation.value && (
                        <EvaluationDetails
                            evaluation={selectedEvaluation.value}
                            getSubjectName={getSubjectName}
                            getEvaluationTypeName={getEvaluationTypeName}
                            onClose={clearSelectedEvaluation}
                            headerSlot={
                                <div className="custom-details-header">
                                    <h2>Detalhes da Avaliação - {getSubjectName(selectedEvaluation.value.subjectId)}</h2>
                                    <button className="btn-close" onClick={clearSelectedEvaluation}>×</button>
                                </div>
                            }
                            footerSlot={
                                <div className="custom-details-footer">
                                    <p>Informações atualizadas em: {new Date().toLocaleDateString()}</p>
                                </div>
                            }
                        />
                    )}
                </section>
            </main>

            <div>
                <FooterFixed />
            </div>
        </Fragment>
    );
};

export default Avaliacoes;