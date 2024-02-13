import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Form from "./components/form";
import Owner from "./components/Owner";
import Auth from "./components/auth";
import Navbar from './components/Navbar';
import Login from './components/login';


function Home(){
  return(<div>
    <Login/>
    <Form/>
  </div>)
}



function App() {

  

  

  return (
    <Router>
      <div className="App">
        <div className="container">
         
        
          <Routes>
            {/* Set a default route for the home page */}
            <Route path="/" element={<Home/>} />
           
            <Route path="/sign" element={<Auth/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* Specify the route for the Owner component */}
            <Route path='/owner' element={<Owner />} />
          </Routes>
          
        

        </div>
      </div>
    </Router>
  );
}

export default App;
