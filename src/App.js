import React, { useState } from "react";
import dayjs from "dayjs";
// import Calendar from "./components/Calendar";
import "./components/Calendar.css";
import { Button, Typography, Grid, Paper } from "@mui/material";

const App = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");
  const today = dayjs();

  const generateCalendar = () => {
    const calendar = [];
    let date = startDay.clone();

    while (date.isBefore(endDay, "day") || date.isSame(endDay, "day")) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(date.clone());
        date = date.add(1, "day");
      }

      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Button onClick={handlePrevMonth}>Prev</Button>
        <Typography variant="h5">{currentDate.format("MMMM YYYY")}</Typography>
        <Button onClick={handleNextMonth}>Next</Button>
      </div>

      <Grid container spacing={1}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <Grid item xs={1.71} key={d}>
            <Typography align="center" className="day-name">
              {d}
            </Typography>
          </Grid>
        ))}

        {calendar.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day) => (
              <Grid item xs={1.71} key={day.format("DD-MM-YYYY")}>
                <Paper
                  className={`day-cell ${
                    day.isSame(today, "day") ? "today" : ""
                  } ${day.isSame(currentDate, "month") ? "" : "other-month"}`}
                  elevation={2}
                >
                  <Typography align="center">{day.date()}</Typography>
                </Paper>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default App;
