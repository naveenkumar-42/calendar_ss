import React from "react";
import dayjs from "dayjs";
import "../styles/Header.css";

const CalendarHeader = ({ date, setDate }) => {
  const currentYear = dayjs().year();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - 25 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (e) => {
    setDate(date.month(parseInt(e.target.value)));
  };

  const handleYearChange = (e) => {
    setDate(date.year(parseInt(e.target.value)));
  };

  return (
    <>
    <h2 className="calendar-title">Calendar</h2>
    <div className="calendar-header-wrapper">
      <button onClick={() => setDate(date.subtract(1, "month"))}>&lt;</button>
      <div className="calendar-header-controls">
      <select value={date.month()} onChange={handleMonthChange}>
        {months.map((month, idx) => (
          <option key={idx} value={idx}>{month}</option>
        ))}
      </select>

      <select value={date.year()} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
        </div>
      <button onClick={() => setDate(date.add(1, "month"))}>&gt;</button>
    </div>
    </>
  );
};

export default CalendarHeader;
