import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/TimelineScheduler.css";

const TimelineScheduler = () => {
  const { date } = useParams();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    setTasks(saved[date] || []);
  }, [date]);

  const addTask = () => {
    const updated = [...tasks, input];
    setTasks(updated);

    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updated;
    localStorage.setItem("calendarEvents", JSON.stringify(all));
    setInput("");
  };

  return (
    <div className="timeline-container">
      <h2>Schedule for {date}</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>

      <div className="timeline">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="hour-block">
            <div className="hour-label">{i}:00</div>
            <div className="hour-slot">
              {tasks[i] && <div className="task">{tasks[i]}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineScheduler;
