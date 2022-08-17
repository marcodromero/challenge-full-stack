import './App.css';
import Abm from './pages/Abm.js';
import Home from './pages/Home.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/Abm" element= {<Abm />}/>      
      </Routes>

    </Router>
  );
}

export default App;
