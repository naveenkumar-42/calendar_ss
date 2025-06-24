import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/TimelineScheduler.css";

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 6; hour <= 22; hour++) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hr = hour % 12 || 12;
    times.push(`${hr}:00 ${ampm}`);
  }
  return times;
};

const TimelineScheduler = () => {
  const navigate = useNavigate();
  const { date } = useParams();
  const [tasks, setTasks] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("normal");
  const timeSlots = generateTimeSlots();

  // ✅ Safe loading from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    const rawTasks = stored[date] || {};
    const safeTasks = {};

    for (const slot in rawTasks) {
      const val = rawTasks[slot];
      safeTasks[slot] = Array.isArray(val)
        ? val
        : typeof val === "object" && val.text
        ? [val]
        : typeof val === "string"
        ? [{ text: val, priority: "normal" }]
        : [];
    }

    setTasks(safeTasks);
  }, [date]);

  const handleAddTask = () => {
    if (!selectedTime || !inputValue.trim()) return;

    const newTask = { text: inputValue.trim(), priority };
    const updatedSlotTasks = Array.isArray(tasks[selectedTime])
      ? [...tasks[selectedTime], newTask]
      : [newTask];

    const updatedTasks = {
      ...tasks,
      [selectedTime]: updatedSlotTasks,
    };

    setTasks(updatedTasks);

    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updatedTasks;
    localStorage.setItem("calendarEvents", JSON.stringify(all));

    // Reset form
    setInputValue("");
    setSelectedTime("");
    setPriority("normal");
  };

  const handleDeleteTask = (slot, index) => {
    const filtered = tasks[slot].filter((_, i) => i !== index);
    const updatedTasks = { ...tasks, [slot]: filtered };
    setTasks(updatedTasks);

    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updatedTasks;
    localStorage.setItem("calendarEvents", JSON.stringify(all));
  };

  return (
    <div className="timeline-page">
      <h2>Task Schedule for {date}</h2>

      <div className="top-controls">
        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select Time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>

        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="timeline-list">
        {timeSlots.map((slot) => (
          <div key={slot} className="time-slot">
            <div className="slot-time">{slot}</div>
            <div className="slot-task">
              <ul>
                {(tasks[slot] || []).map((task, index) => (
                  <li key={index} style={{ color: getColor(task.priority) }}>
                    {task.text}
                    <button onClick={() => handleDeleteTask(slot, index)}>🗑️</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/")}>← Back to Calendar</button>
    </div>
  );
};

// Helper to return color based on priority
const getColor = (priority) => {
  switch (priority) {
    case "high":
      return "red";
    case "low":
      return "yellow";
    case "normal":
    default:
      return "lightgreen";
  }
};

export default TimelineScheduler;
