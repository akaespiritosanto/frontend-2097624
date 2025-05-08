import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Object} props.request
 * @param {Function} props.onChange
 * @param {Function} props.onSubmit 
 * @param {Function} props.onCancel 
 * @param {Object} props.options 
 * @param {boolean} props.isEdit 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const RequestForm = ({ 
  request = {
    type: "",
    academicYear: "",
    subject: "",
    hasFee: false,
    attachments: []
  },
  onChange = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  options = {},
  isEdit = false,
  headerSlot,
  footerSlot
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(request);
  };
  
  const handleChange = (field, value) => {
    onChange(field, value);
  };
  
  const handleFileChange = (e) => {
    const fileName = e.target.value.split('\\').pop();
    if (fileName) {
      const updatedAttachments = [...request.attachments, fileName];
      handleChange('attachments', updatedAttachments);
    }
  };
  
  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...request.attachments];
    updatedAttachments.splice(index, 1);
    handleChange('attachments', updatedAttachments);
  };
  
  return (
    <div className="request-form-container">
      <h1>{isEdit ? "Editar Requerimento" : "Novo Requerimento"}</h1>
      
      {headerSlot && <div className="request-form-header">{headerSlot}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Tipo de Requerimento</label>
          <select
            id="type"
            name="type"
            value={request.type}
            onChange={(e) => handleChange("type", e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            {options.requestTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="academicYear">Ano Letivo</label>
          <select
            id="academicYear"
            name="academicYear"
            value={request.academicYear}
            onChange={(e) => handleChange("academicYear", e.target.value)}
            required
          >
            <option value="">Selecione um ano</option>
            {options.academicYears?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Assunto</label>
          <textarea
            id="subject"
            name="subject"
            value={request.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            rows="4"
            required
            placeholder="Descreva detalhadamente o seu pedido"
          ></textarea>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={request.hasFee}
              onChange={(e) => handleChange("hasFee", e.target.checked)}
            />
            Este requerimento possui emolumentos
          </label>
        </div>
        
        {request.hasFee && (
          <div className="form-group">
            <label htmlFor="feeValue">Valor (€)</label>
            <input
              type="number"
              id="feeValue"
              name="feeValue"
              value={request.feeValue || ""}
              onChange={(e) => handleChange("feeValue", parseFloat(e.target.value))}
              step="0.01"
              min="0"
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="attachment">Anexos</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
          />
          
          {request.attachments.length > 0 && (
            <div className="attachments-list">
              <p>Arquivos anexados:</p>
              <ul>
                {request.attachments.map((file, index) => (
                  <li key={index}>
                    {file}
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn">
            {isEdit ? "Atualizar" : "Enviar Requerimento"}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
      
      {footerSlot && <div className="request-form-footer">{footerSlot}</div>}
    </div>
  );
};

export default RequestForm;
