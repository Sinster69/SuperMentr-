import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Email validation
  const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  // Password strength
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage("❌ Invalid email");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password too short");
      return;
    }

    setMessage("✅ Signup successful!");
  };

  return (
    <div className="container">
      <h1>Smart Signup Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p>Password Strength: {getPasswordStrength(password)}</p>

        <button type="submit">Sign Up</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
}

export default App;