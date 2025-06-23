import React, { useState } from "react";
import dayjs from "dayjs";
import { Button, Grid, Typography, Paper } from "@mui/material";
import "./Calendar.css"; // Assuming you have a CSS file for styles

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");
  const today = dayjs();

  const generateCalendar = () => {
    const date = startDay.clone();
    const calendar = [];

    while (date.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => date.add(1, "day").clone())
      );
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
        <Typography variant="h5">
          {currentDate.format("MMMM YYYY")}
        </Typography>
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
                  } ${
                    day.isSame(currentDate, "month") ? "" : "other-month"
                  }`}
                  elevation={2}
                >
                  <Typography align="center">
                    {day.date()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default Calendar;
