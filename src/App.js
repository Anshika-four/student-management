import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Students from "./components/Students"
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar"
function App() {
  return (
    <Router>

    <div className="App">
      <div className="App-header">
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path = "/register" element ={<SignUp/>}/>
            <Route path = "/students" element = {<Students/>}/>
            <Route path = "/home" element= {<HomePage/>}/>
            <Route path ="/sidebar" element={<Sidebar/>}/>
        </Routes>
          
      </div>
    </div>
  </Router>
  );
}

export default App;
