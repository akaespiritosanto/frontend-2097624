import { Fragment } from "react/jsx-runtime";
import { MouseEvent } from "react";

let localidades = ["Funchal", "Santa Cruz", "Santana"];
const getMessage = () => {return localidades.length === 0 ? <p>No item found</p>:null};

//Event handler
const handleClick = (event: MouseEvent) => (console.log(event));

function ListGroup(){
    return(
    <>
     <h1>Título da lista</h1>
     {getMessage()}
     <ul className="list-group">
        {localidades.map((item) => (<li className="list-group-item" key={item} onClick={handleClick}>{item}</li>))}
     </ul>
    </>
    );
}

function ListGroup2(props: ListGroupProps){
    const  [selectedindex, setSelectedIndex] = useState(-1);
    return (
        <>
        <h1>{props.title}</h1>
        <ul className="list-group">
            {props.cities.map((item, index) =>(
            <li className={selectedindex === index ? "list-group-item active" : "list-group-item"}key={item}
            onClick={() => {setSelectedIndex(index);}}
            >
                {item}
            </li>))}
        </ul>
</>);}

export default ListGroup2;
export default ListGroup;