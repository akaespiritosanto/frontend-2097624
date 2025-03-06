import { h } from "preact";
import { Router } from "preact-router";
import Home from "./Home";
import About from "./About";

const App = () => (
    <Router>
        <Home path="/"/>
        <About path="/about"/>
    </Router>
);