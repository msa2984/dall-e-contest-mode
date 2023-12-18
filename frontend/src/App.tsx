import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Imagine from "./components/Imagine";
import Contest from "./components/Contest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/imagine" Component={Imagine} />
        <Route path="/contest" Component={Contest} />

      </Routes>
    </Router>
  );
}

export default App;
