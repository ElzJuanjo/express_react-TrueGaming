import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Index } from './components/Index';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Wall } from './components/Wall';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wall" element={<Wall />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
