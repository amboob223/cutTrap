import {React,useState} from "react";
import "../App.css";
import pic from "../images/CutTrap.png";
import { Link } from "react-router-dom";

function Auth() {

  const handleSignup = async (e) => {

    e.preventDefault();
   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    document.getElementById("message").innerText = `Signup successful ${data.id}`;
  };

  
  return (
    <div>
       <div>

      <div>
        <img src={pic} width="50px"/>
        <p>Sign up</p>
        <Link to ="/">go Back</Link>
         <form className="signup" id="signup-form" onSubmit={handleSignup}>
          <label htmlFor="email">Email</label>
          <br/>
        <input className="form-group" type="email" id="email" name="email" required />


          <label htmlFor="password">Password</label>
    <br/>
        <input className="form-group" type="password" id="password" name="password" />
        <br/>
     
        <button className="btn btn-warning" type="submit" style={{marginTop:"30px"}}>Sign Up</button>
      </form>
      <p id="message"></p>

      </div>
     </div>
    </div>
   
     
  );
}

export default Auth;
