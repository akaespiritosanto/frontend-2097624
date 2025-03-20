/*import { h, Component } from 'preact';
import logo from './logo.svg';*/
import './App.css';
import { Router } from 'preact-router'

const App = () => (
  <div>
    <nav>
      <a href="/">Início</a>
      <a href="/sobre">Sobre</a>
    </nav>
    <Router>
      <Home path="/" />
      <About path="/sobre" />
      <NotFound default />
    </Router>
  </div>
);

export default App;

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Preact</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/

