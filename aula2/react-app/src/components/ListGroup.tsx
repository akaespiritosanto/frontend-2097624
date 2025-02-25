import { Fragment } from "react/jsx-runtime";
import { MouseEvent } from "react";

var localidades = ["Funchal", "Santa Cruz", "Santana"];

//localidades = [];

const validateArray = () =>  {return localidades.length === 0 ? <h1>O array esta vazio</h1> : null}; 

const getMessage = (event:MouseEvent) => {
    console.log(event);
};

function ListGroup(){
    return (
    <Fragment>
        <h1>List Group</h1>
        {validateArray()}
        <ul className="list-group" key={} onClick={getMessage}>
            {
                localidades.map((item)=>(<li key={item}>{item}</li>))
            }
        </ul>
    </Fragment>
    );
}
export default ListGroup