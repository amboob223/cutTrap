import React from 'react';
import "./App.css";
import Form from "./components/form";


function App() {


  return (
    <div className="App">
     <header>

     </header>
        <body>
          <div  className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div>
            <table>
              <tr>
                
                  <h1 style={{"background":"grey"}}>
                  Book a booth by the  Week, day, or the hour.
                  </h1>
                </tr>
                <tr>
                <Form/>
              </tr>
          </table>
          </div>
          
          </div>
          
            
        </body>
      <footer>


      </footer>
     
    </div>
  );
}

export default App;
