import './../styles/requerimentos_design.css';
import { Fragment } from "preact";
import { useSignal } from "@preact/signals";
import Header from "./header.jsx";
import FooterRelative from "./footer-relative.jsx";
import SearchForm from "./requerimentos/SearchForm.jsx";
import RequestList from "./requerimentos/RequestList.jsx";
import RequestForm from "./requerimentos/RequestForm.jsx";
import RequestStats from "./requerimentos/RequestStats.jsx";
import {
  requestTypes,
  academicYears,
  requestStatus,
  filteredRequests,
  requestStats,
  searchFilters,
  updateSearchFilter,
  addRequest,
  updateRequest,
  getRequestTypeName,
  getStatusName
} from "../store/requerimentosStore";

const Requerimentos = () => {
    const selectedRequest = useSignal(null);
    const showRequestForm = useSignal(false);
    const newRequest = useSignal({
        type: "",
        academicYear: academicYears.value[0],
        subject: "",
        hasFee: false,
        feeValue: 0,
        attachments: []
    });

    const handleSearch = () => {
        console.log("Pesquisando com filtros:", searchFilters.value);
    };

    const handleRequestSelect = (request) => {
        selectedRequest.value = request;
    };

    const handleAddRequest = (request) => {
        const result = addRequest(request);
        if (result) {
            newRequest.value = {
                type: "",
                academicYear: academicYears.value[0],
                subject: "",
                hasFee: false,
                feeValue: 0,
                attachments: []
            };
            showRequestForm.value = false;
        }
    };

    const handleNewRequestChange = (field, value) => {
        newRequest.value = { ...newRequest.value, [field]: value };
    };

    const RequestListHeader = () => (
        <div className="request-list-actions">
            <button
                className="btn-action"
                onClick={() => { showRequestForm.value = !showRequestForm.value; }}
            >
                {showRequestForm.value ? "Cancelar" : "Novo Requerimento"}
            </button>
        </div>
    );

    const RequestListEmpty = () => (
        <div className="request-list-empty-custom">
            <p>Não foram encontrados requerimentos com os critérios selecionados.</p>
            <p>Tente ajustar os filtros ou criar um novo requerimento.</p>
        </div>
    );

    const RequestListFooter = () => (
        <div className="request-list-footer-info">
            <p>Última atualização: {new Date().toLocaleDateString()}</p>
            <p>Total de registros: {filteredRequests.value.length}</p>
        </div>
    );

    const RequestFormHeader = () => (
        <div className="request-form-header-info">
            <p>Preencha todos os campos obrigatórios para enviar seu requerimento.</p>
            <p>Requerimentos com emolumentos só serão processados após o pagamento.</p>
        </div>
    );

    const RequestFormFooter = () => (
        <div className="request-form-footer-info">
            <p>Ao enviar este formulário, você concorda com os termos e condições da universidade.</p>
        </div>
    );

    return (
        <Fragment>
            <div>
                <Header />
            </div>

            <main>
                <SearchForm
                    title="Requerimentos"
                    fields={[
                        { id: "type", label: "Tipo de Requerimento", type: "select" },
                        { id: "academicYear", label: "Ano Letivo", type: "select" },
                        { id: "subject", label: "Assunto", type: "text", placeholder: "Descrição do assunto" },
                        { id: "status", label: "Status", type: "select" }
                    ]}
                    values={searchFilters.value}
                    onChange={updateSearchFilter}
                    onSubmit={handleSearch}
                    options={{
                        type: requestTypes.value,
                        academicYear: academicYears.value.map(year => ({ id: year, name: year })),
                        status: requestStatus.value
                    }}
                />

                <div className="requests">
                    <div className="alert">
                        <p>Os requerimentos com emolumentos só serão processados após pagamento. Consulte a secção de <a href="/pagamentos">Pagamentos</a> para saber como fazer pagamentos.</p>
                    </div>
                </div>

                <RequestStats
                    stats={requestStats.value}
                    title="Estatísticas de Requerimentos"
                />

                {showRequestForm.value && (
                    <RequestForm
                        request={newRequest.value}
                        onChange={handleNewRequestChange}
                        onSubmit={handleAddRequest}
                        onCancel={() => { showRequestForm.value = false; }}
                        options={{
                            requestTypes: requestTypes.value,
                            academicYears: academicYears.value
                        }}
                        isEdit={false}
                        headerSlot={<RequestFormHeader />}
                        footerSlot={<RequestFormFooter />}
                    />
                )}

                <RequestList
                    requests={filteredRequests.value}
                    getRequestTypeName={getRequestTypeName}
                    getStatusName={getStatusName}
                    onRequestSelect={handleRequestSelect}
                    headerSlot={<RequestListHeader />}
                    emptySlot={<RequestListEmpty />}
                    footerSlot={<RequestListFooter />}
                />

                {selectedRequest.value && (
                    <div className="request-details-container">
                        <h1>Detalhes do Requerimento</h1>
                        <div className="request-details">
                            <p><strong>Código:</strong> {selectedRequest.value.id}</p>
                            <p><strong>Tipo:</strong> {getRequestTypeName(selectedRequest.value.type)}</p>
                            <p><strong>Ano Letivo:</strong> {selectedRequest.value.academicYear}</p>
                            <p><strong>Assunto:</strong> {selectedRequest.value.subject}</p>
                            <p><strong>Data do Pedido:</strong> {selectedRequest.value.requestDate}</p>
                            <p><strong>Data de Entrada:</strong> {selectedRequest.value.processDate || "Não processado"}</p>
                            <p><strong>Data de Saída:</strong> {selectedRequest.value.responseDate || "Aguardando resposta"}</p>
                            <p><strong>Status:</strong> {getStatusName(selectedRequest.value.status)}</p>
                            <p><strong>Observação:</strong> {selectedRequest.value.observation || "Nenhuma observação disponível"}</p>
                            <p><strong>Emolumentos:</strong> {selectedRequest.value.hasFee ? `${selectedRequest.value.feeValue.toFixed(2)}€` : "Não aplicável"}</p>
                            <p><strong>Pago:</strong> {selectedRequest.value.hasFee ? (selectedRequest.value.isPaid ? "Sim" : "Não") : "Não aplicável"}</p>

                            {selectedRequest.value.attachments.length > 0 && (
                                <div>
                                    <p><strong>Anexos:</strong></p>
                                    <ul>
                                        {selectedRequest.value.attachments.map((file, index) => (
                                            <li key={index}>{file}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="request-actions">
                            <button
                                className="btn-action"
                                onClick={() => { selectedRequest.value = null; }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <div>
                <FooterRelative />
            </div>
        </Fragment>
    );
};

export default Requerimentos;