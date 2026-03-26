import React, { useState } from "react";

function Mood() {
  const [mood, setMood] = useState("😊");

  return (
    <div>
      <h2>Mood Tracker</h2>
      <h1>{mood}</h1>

      <button onClick={() => setMood("😊")}>Happy</button>
      <button onClick={() => setMood("😢")}>Sad</button>
      <button onClick={() => setMood("😡")}>Angry</button>
    </div>
  );
}

export default Mood;