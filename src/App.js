import React from "react";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">My Calendar</h1>
      <div className="calendar-wrapper">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
