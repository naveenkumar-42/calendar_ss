// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import TimelineScheduler from "./components/TimelineScheduler";
import "./App.css"; // Ensure this path is correct

function App() {
  return (
    <Router basename="/calendar_ss">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/schedule/:date" element={<TimelineScheduler />} />
      </Routes>
    </Router>
  );
}

export default App;
