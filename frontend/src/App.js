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
import { MyAccount } from './components/MyAccount';
import { CloseSession } from './components/CloseSession';
import { SearchIGDB } from './components/SearchIGDB';
import { User } from './components/User';
import { SearchGameInDB } from './components/SearchGameInDB';
import { Game } from './components/Game';
import { ChangeImg } from './components/ChangeImg';

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
          <Route path="/users/:nickname" element={<User />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/searchgame" element={<SearchIGDB />} />
          <Route path="/searchgameindb" element={<SearchGameInDB />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/changeimg" element={<ChangeImg />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
