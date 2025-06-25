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

  const [priorityFilter, setPriorityFilter] = useState("all");

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

  return (
    <div className="calendar">
      <CalendarHeader date={currentDate} setDate={setCurrentDate} />

      {/* 🔽 Priority Filter Dropdown */}
      <div className="priority-filter-1">
        <label style={{ color: "#fff", marginRight: "10px" }}>Filter by Priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
          }}
        >
          <option value="all">All</option>
          <option value="high">High 🔴</option>
          <option value="medium">Medium 🟡</option>
          <option value="low">Low 🟢</option>
        </select>
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
            Object.values(dayEvents).flat().forEach((event) => {
              if (event.priority && priorityCount[event.priority] !== undefined) {
                priorityCount[event.priority]++;
              }
            });
          }

          // ✅ Filter: if a specific priority is selected and its count is 0, skip rendering anything
          const shouldShow =
            priorityFilter === "all" || priorityCount[priorityFilter] > 0;

          return (
            <Day
              key={idx}
              date={day}
              currentMonth={currentDate.month()}
              priorityCount={shouldShow ? priorityCount : { high: 0, medium: 0, low: 0 }}
              addEvent={(event) => {
                const updated = {
                  ...events,
                  [dateStr]: [
                    ...(Array.isArray(events[dateStr]) ? events[dateStr] : []),
                    event,
                  ],
                };
                setEvents(updated);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
