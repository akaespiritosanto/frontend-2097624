import { Fragment } from "preact";

/**
 * @param {Object} props
 * @param {Array} props.requests
 * @param {Function} props.getRequestTypeName
 * @param {Function} props.getStatusName 
 * @param {Function} props.onRequestSelect 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const RequestList = ({ 
  requests = [], 
  getRequestTypeName = (id) => id,
  getStatusName = (id) => id,
  onRequestSelect = () => {},
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <div className="request-list-container">
      <h1>Lista de Requerimentos</h1>
      
      {headerSlot && <div className="request-list-header">{headerSlot}</div>}
      
      {requests.length === 0 ? (
        <div className="request-list-empty">
          {emptySlot || <p>Nenhum requerimento encontrado com os critérios selecionados.</p>}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cod. Entrada</th>
              <th>Tipo</th>
              <th>Ano Letivo</th>
              <th>Assunto</th>
              <th>Data Pedido</th>
              <th>Data Entrada/Data Saída</th>
              <th>Despacho Obs</th>
              <th>Emolumentos</th>
              <th>Pago</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} onClick={() => onRequestSelect(request)}>
                <td>{request.id}</td>
                <td>{getRequestTypeName(request.type)}</td>
                <td>{request.academicYear}</td>
                <td>{request.subject}</td>
                <td>{request.requestDate}</td>
                <td>{request.processDate} {request.responseDate ? `/ ${request.responseDate}` : ""}</td>
                <td>{getStatusName(request.status)}</td>
                <td>{request.hasFee ? `${request.feeValue.toFixed(2)}€` : ""}</td>
                <td>{request.isPaid ? "Sim" : request.hasFee ? "Não" : ""}</td>
                <td>
                  <button 
                    className="btn-action" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestSelect(request);
                    }}
                  >
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {footerSlot && <div className="request-list-footer">{footerSlot}</div>}
    </div>
  );
};

export default RequestList;
