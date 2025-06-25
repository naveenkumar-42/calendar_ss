import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import "../styles/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("calendarEvents");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");
  const days = [];

  let day = startDay;
  while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  // Count priority-based events (timeline style)
  const priorityCounts = {
    high: 0,
    medium: 0,
    low: 0,
  };

  Object.values(events).forEach((value) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      Object.values(value).forEach((taskArray) => {
        taskArray.forEach((task) => {
          if (priorityCounts.hasOwnProperty(task.priority)) {
            priorityCounts[task.priority]++;
          }
        });
      });
    }
  });

  return (
    <div className="calendar">
      <CalendarHeader date={currentDate} setDate={setCurrentDate} />

      {/* ✅ Priority Count Summary */}
      <div className="priority-summary">
        <span className="count-high">🔴 High: {priorityCounts.high}</span>
        <span className="count-medium">🟡 Medium: {priorityCounts.medium}</span>
        <span className="count-low">🟢 Low: {priorityCounts.low}</span>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div className="calendar-header" key={d}>{d}</div>
        ))}
        {days.map((day, idx) => {
  const dateStr = day.format("YYYY-MM-DD");
  const dayEvents = events[dateStr];

  let priorityCount = { high: 0, medium: 0, low: 0 };

  if (dayEvents && typeof dayEvents === "object" && !Array.isArray(dayEvents)) {
    // timeline-based format
    Object.values(dayEvents).flat().forEach((event) => {
      if (event.priority && priorityCount[event.priority] !== undefined) {
        priorityCount[event.priority]++;
      }
    });
  }

  return (
    <Day
      key={idx}
      date={day}
      currentMonth={currentDate.month()}
      priorityCount={priorityCount}
      addEvent={(event) => {
        const updated = {
          ...events,
          [dateStr]: [...(Array.isArray(events[dateStr]) ? events[dateStr] : []), event],
        };
        setEvents(updated);
      }}
    />
  );
})}``
      </div>
    </div>
  );
};

export default Calendar;
