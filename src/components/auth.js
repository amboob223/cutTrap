import React from "react";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      window.location.href = "index.html";
    } else {
      document.getElementById("message").innerText = "Login failed, try again";
    }
  };

  return (
    <div>
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

      <p>Already have an account?</p>
      <form className="signup" id="login-form" onSubmit={handleLogin}>
        <label htmlFor="loginEmail">Email</label>
        <input type="email" id="loginEmail" name="email" required />
        <br />
        <label htmlFor="loginPassword">Password</label>
        <input type="password" id="loginPassword" name="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Auth;
