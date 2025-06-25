import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "../styles/Day.css";

const Day = ({ date, currentMonth, priorityCount }) => {
  const navigate = useNavigate();
  const isToday = date.isSame(dayjs(), "day");

  const handleClick = () => {
    const dateStr = date.format("YYYY-MM-DD");
    navigate(`/schedule/${dateStr}`);
  };

  return (
    <div
      className={`day ${date.month() !== currentMonth ? "faded" : ""} ${isToday ? "today" : ""}`}
      onClick={handleClick}
    >
      <div className="date-number">{date.date()}</div>
      <div className="events">
        {/* Desktop: show priority count as text */}
        <div className="desktop-events">
        {priorityCount.high > 0 && (
          <div className="event" style={{ color: "#ff4d4d" }}>🔴 High: {priorityCount.high}</div>
        )}
        {priorityCount.medium > 0 && (
          <div className="event" style={{ color: "#ffcc00" }}>🟡 Medium: {priorityCount.medium}</div>
        )}
        {priorityCount.low > 0 && (
          <div className="event" style={{ color: "#4caf50" }}>🟢 Low: {priorityCount.low}</div>
        )}
      </div>

        {/* Mobile: show colored dots only */}
        <div className="mobile-dots">
          {priorityCount.high > 0 && <span className="dot high-dot" title="High" />}
          {priorityCount.medium > 0 && <span className="dot medium-dot" title="Medium" />}
          {priorityCount.low > 0 && <span className="dot low-dot" title="Low" />}
        </div>
      </div>
    </div>
  );
};

export default Day;
