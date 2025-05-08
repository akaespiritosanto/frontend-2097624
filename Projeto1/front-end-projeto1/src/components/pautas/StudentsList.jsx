import { Fragment } from "preact";

/**
 * @param {Object} props 
 * @param {Array} props.students 
 * @param {boolean} props.loading 
 * @param {React.ReactNode} props.headerSlot 
 * @param {React.ReactNode} props.emptySlot 
 * @param {React.ReactNode} props.footerSlot 
 */

const StudentsList = ({ 
  students = [], 
  loading = false,
  headerSlot,
  emptySlot,
  footerSlot
}) => {
  return (
    <section className="students-associated">
      <h1>Alunos Associados às Pautas</h1>
      
      {headerSlot && <div className="students-header-slot">{headerSlot}</div>}
      
      {loading ? (
        <p>Carregando dados dos alunos...</p>
      ) : students.length > 0 ? (
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Nome</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                student.filteredGrades.map(grade => (
                  <tr key={`${student.id}-${grade.gradeId}`}>
                    <td>{student.number}</td>
                    <td>{student.name}</td>
                    <td>{grade.value}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        emptySlot || <p className="no-results">Selecione uma ou mais pautas.</p>
      )}
      
      {footerSlot && <div className="students-footer-slot">{footerSlot}</div>}
    </section>
  );
};

export default StudentsList;
