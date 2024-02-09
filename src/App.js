import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Form from "./components/form";
import Owner from "./components/owner";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <h1>
            Want to cut sign up 
          </h1>
            <Link to="/owner">Owner</Link>
          <Form />
          
      

          {/* Use Routes to wrap Route components */}
          <Routes>
            <Route path="/"/>
            <Route path='/owner' element={<Owner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
