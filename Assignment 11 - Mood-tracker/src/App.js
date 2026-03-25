import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState({
    emoji: "😊",
    text: "Happy",
    color: "#ffd93d"
  });

  const moods = [
    { emoji: "😊", text: "Happy", color: "#ffd93d" },
    { emoji: "😢", text: "Sad", color: "#74c0fc" },
    { emoji: "😡", text: "Angry", color: "#ff6b6b" },
    { emoji: "😴", text: "Tired", color: "#adb5bd" }
  ];

  return (
    <div className="container" style={{ backgroundColor: mood.color }}>
      <h1>Mood Tracker</h1>

      <div className="display">
        <h2>{mood.emoji}</h2>
        <p>{mood.text}</p>
      </div>

      <div className="buttons">
        {moods.map((m, index) => (
          <button key={index} onClick={() => setMood(m)}>
            {m.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
