import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "../styles/Day.css";

const Day = ({ date, currentMonth, events }) => {
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
        {events.map((e, i) => (
          <div key={i} className="event">{e}</div>
        ))}
      </div>
    </div>
  );
};

export default Day;
