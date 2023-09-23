import React, { useReducer } from 'react';
import Login from "./Login";
import Register from "./Register";
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import Store from './Store';
import ProductsList from './ProductsList';
import { UserContext } from './UserContext';
import { HashRouter, Routes, Route } from 'react-router-dom';

let initialUSer = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null
};

//reducer: operatipns on "user" state
let reducer = (state, action) => {

  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole
      };
    case "logout":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null
      };
    default:
      return state;
  }
};

function App() {
  //useReducer: state + operations
  let [user, dispatch] = useReducer(reducer, initialUSer);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
