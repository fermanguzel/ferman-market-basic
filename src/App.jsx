import Login from "./Login";
import Register from "./Register";
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import { UserContext } from './UserContext';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
