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

  return (
    <div className="calendar">
      <CalendarHeader date={currentDate} setDate={setCurrentDate} />
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div className="calendar-header" key={d}>{d}</div>
        ))}
        {days.map((day, idx) => {
          const dateStr = day.format("YYYY-MM-DD");
          const dayEvents = events[dateStr];

          // If event type is array, pass it. If it's timeline-based, show time count.
          const displayEvents = Array.isArray(dayEvents)
            ? dayEvents
            : dayEvents
              ? Object.values(dayEvents).flat().map(e => e.text)
              : [];

          return (
            <Day
              key={idx}
              date={day}
              currentMonth={currentDate.month()}
              events={displayEvents}
              addEvent={(event) => {
                const updated = {
                  ...events,
                  [dateStr]: [...(Array.isArray(events[dateStr]) ? events[dateStr] : []), event],
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
