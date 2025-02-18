import { Fragment } from "react/jsx-runtime";

const localidades = ["Funchal","Santa Cruz","Ribeira Brava"]

function ListGroup(){
    return (
        <>
            <ul className="list-group">{
                localidades.map((item) => (
                <li key=(item)>(item)</li>
            )}
            </ul>
        </>
    );
}

export default ListGroup

// está mal a função ListGroup