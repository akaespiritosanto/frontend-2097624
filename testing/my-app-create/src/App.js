import { h, Component } from 'preact';
import logo from './logo.svg';
import './App.css';

function testing(){
  const variavel = true;
  const array = [1,2,3,4,5,6,7,8,9,10];
  while (variavel === true){
    for (let i=0; i < array.length; i++){
      console.log(i)
    }
  }
}

var funcao = testing()

class App extends Component {
  render() {
    return (
      <div>
        <h1 class="testing">Testing values like: {}</h1>
      </div>
    );
  }
}

export default App;
