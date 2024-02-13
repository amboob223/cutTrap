import {React,useState} from "react";
import "../App.css";


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
       <div style={{display:"flex", justifyContent:"center"}}>

      <div>
        <p>Sign up</p>
         <form className="signup" id="signup-form" onSubmit={handleSignup}>
       <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <br />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p id="message"></p>

      </div>
     </div>
    </div>
   
     
  );
}

export default Auth;
