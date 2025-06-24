import React from "react";
import "../styles/Header.css";

const CalendarHeader = ({ date, setDate }) => {
  return (
    <div className="calendar-header-wrapper">
      <button onClick={() => setDate(date.subtract(1, "month"))}>&lt;</button>
      <h2>{date.format("MMMM YYYY")}</h2>
      <button onClick={() => setDate(date.add(1, "month"))}>&gt;</button>
    </div>
  );
};

export default CalendarHeader;
