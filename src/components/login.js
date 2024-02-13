import {React} from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  

  const handleLogin = async (e) => {
    e.preventDefault();
      
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ loginEmail, loginPassword }),
    });

    const result = await response.json();

    if (response.status === 200) {
      console.log("Login successful:", result.message);
        window.location.href = "/owner" 
      document.getElementById("messag").innerText = "Login successful";
      // Redirect or perform any other action after successful login
    } else {
      console.log("Login failed:", result.error);
      document.getElementById("messag").innerText = "Login failed, try again";
    }
  };

  return (
    <div>
       <div style={{display:"flex", justifyContent:"space-between", marginTop:"4%", marginBottom:"2%"}}>

     <div>
      
      <form className="login" id="login-form" onSubmit={handleLogin} style={{display:"flex"}}>
        <label htmlFor="loginEmail">Email</label>
        <input type="email" id="loginEmail" name="loginEmail" required />
        <br />
        <label htmlFor="loginPassword">Password</label>
        <input type="password" id="loginPassword" name="loginPassword" required />
        <br />
        <button type="submit">Login</button>
      </form>
        <p id="messag"></p>
    </div>

<div>
        <p>
            dont have an account?
        </p>
          <Link to="/sign">
        Sign up
    </Link>
     </div>
  
     </div>

     

    </div>
   
     
  );
}

export default Login;
