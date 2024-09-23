import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Index } from './components/Index';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Wall } from './components/Wall';
import { RecoverPass } from './components/RecoverPass';
import { Logout } from './components/Logout';
import { Upload } from './components/Upload';
import { ReviewComments } from './components/ReviewComments';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/recoverPass" element={<RecoverPass />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/review/:id" element={<ReviewComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
