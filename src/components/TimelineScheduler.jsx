import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const { date } = useParams();
  const [tasks, setTasks] = useState({});
  const [editingSlot, setEditingSlot] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    setTasks(stored[date] || {});
  }, [date]);

  const handleSave = () => {
    const updated = { ...tasks, [editingSlot]: inputValue };
    setTasks(updated);
    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updated;
    localStorage.setItem("calendarEvents", JSON.stringify(all));
    setEditingSlot(null);
    setInputValue("");
  };

  const handleDelete = (slot) => {
    const updated = { ...tasks };
    delete updated[slot];
    setTasks(updated);
    const all = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    all[date] = updated;
    localStorage.setItem("calendarEvents", JSON.stringify(all));
  };

  const slots = generateTimeSlots();

  return (
    <div className="timeline-page">
      <h2>Task Schedule for {date}</h2>
      <div className="timeline-list">
        {slots.map((slot) => (
          <div key={slot} className="time-slot">
            <div className="slot-time">{slot}</div>
            <div className="slot-task">
              {editingSlot === slot ? (
                <div className="task-edit">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter task"
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingSlot(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span>{tasks[slot]}</span>
                  <div className="slot-buttons">
                    <button onClick={() => {
                      setEditingSlot(slot);
                      setInputValue(tasks[slot] || "");
                    }}>✏️</button>
                    {tasks[slot] && <button onClick={() => handleDelete(slot)}>🗑️</button>}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineScheduler;
