import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Form from "./components/form";
import Owner from "./components/Owner";
import Auth from "./components/auth";

function Home(){
  return(<div>
    <Auth/>
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
           

            {/* Specify the route for the Owner component */}
            <Route path='/owner' element={<Owner />} />
          </Routes>
          
        

        </div>
      </div>
    </Router>
  );
}

export default App;
