import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Form from "./components/form";
import Owner from "./components/Owner";

function App() {

  

  

  return (
    <Router>
      <div className="App">
        <div className="container">
          

          {/* Use Link for navigation to Owner component */}
         

      <div>
        <div>
         
         {/* style={{display:"flex", margin:"5%", justifyContent:"space-evenly"}} */}
       

          
  
        </div>
      </div>
     
       
         
          {/* Use Routes to wrap Route components */}
          <Routes>
            {/* Set a default route for the home page */}
            <Route path="/" element={<Form/>} />
            {/* Specify the route for the Owner component */}
            <Route path='/owner' element={<Owner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
