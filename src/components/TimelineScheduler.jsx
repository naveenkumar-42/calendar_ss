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
  const [priority, setPriority] = useState("low");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    setTasks(stored[date] || {});
  }, [date]);

  const handleAddOrUpdate = () => {
    if (!selectedTime || !inputValue.trim()) return;
    const current = tasks[selectedTime] || [];
    let updatedSlot;

    if (editMode && editIndex !== null) {
      updatedSlot = [...current];
      updatedSlot[editIndex] = { text: inputValue, priority };
    } else {
      updatedSlot = [...current, { text: inputValue, priority }];
    }

    const updated = { ...tasks, [selectedTime]: updatedSlot };
    setTasks(updated);

    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updated;
    localStorage.setItem("calendarEvents", JSON.stringify(all));

    setInputValue("");
    setPriority("low");
    setSelectedTime("");
    setEditMode(false);
    setEditIndex(null);
  };

  const handleEdit = (time, idx) => {
    const task = tasks[time][idx];
    setSelectedTime(time);
    setInputValue(task.text);
    setPriority(task.priority);
    setEditMode(true);
    setEditIndex(idx);
  };

  const handleDelete = (time, idx) => {
    const updatedSlotTasks = [...tasks[time]];
    updatedSlotTasks.splice(idx, 1);
    const updatedTasks = { ...tasks, [time]: updatedSlotTasks };
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
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={handleAddOrUpdate}>{editMode ? "Update" : "Add Task"}</button>
      </div>

      <div className="timeline-list">
        {timeSlots.map((slot) => (
          <div key={slot} className="time-slot">
            <div className="slot-time">{slot}</div>
            <div className="slot-task">
              {(tasks[slot] || []).map((task, idx) => (
                <div key={idx} className={`task-item priority-${task.priority}`}>
  <span>{task.text}</span>

                  <div className="slot-buttons">
                    <button onClick={() => handleEdit(slot, idx)}>✏️</button>
                    <button onClick={() => handleDelete(slot, idx)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/")}>Back to Calendar</button>
    </div>
  );
};

export default TimelineScheduler;