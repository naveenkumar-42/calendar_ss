import React, { useState } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import "../styles/Day.css";

const Day = ({ date, currentMonth, events, addEvent }) => {
  const isToday = date.isSame(dayjs(), "day");
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`day ${date.month() !== currentMonth ? "faded" : ""} ${isToday ? "today" : ""}`}
      onClick={() => setOpen(true)}
    >
      <div className="date-number">{date.date()}</div>
      <div className="events">
        {events.map((e, i) => (
          <div key={i} className="event">{e}</div>
        ))}
      </div>
      {open && <EventModal date={date} close={() => setOpen(false)} onSave={addEvent} />}
    </div>
  );
};

export default Day;
