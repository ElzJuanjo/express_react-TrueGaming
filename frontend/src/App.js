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
import { User } from './components/User';
import { MyAccount } from './components/MyAccount';
import { CloseSession } from './components/CloseSession';

function App() {
  return (
    <div className="App">
      <Router>
        <CloseSession></CloseSession>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/recoverPass" element={<RecoverPass />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/review/:id" element={<ReviewComments />} />
          <Route path="/user/:nickname" element={<User />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
