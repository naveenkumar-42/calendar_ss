# 🗓️ React Calendar Scheduler

A fully functional and responsive **calendar application** built with React that allows users to:

- View a monthly calendar.
- Schedule tasks for specific time slots in a day.
- Assign **priority levels** (High, Medium, Low).
- Filter tasks by priority.
- Store and retrieve data using `localStorage`.

## 🚀 Features

- 📆 Monthly calendar grid with proper alignment.
- 🕘 Timeline-based task scheduler per day (6:00 AM to 10:00 PM).
- 🎯 Priority-based tasks: `High 🔴`, `Medium 🟡`, `Low 🟢`.
- 🔍 Filter view by priority (both in calendar and timeline).
- 🧠 Task editing and deletion support.
- 💾 Persistent data storage using browser's localStorage.
- 💻 Fully **responsive** for desktop and mobile views.
- 🎨 Clean dark UI with modern CSS styling.

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Day.js](https://day.js.org/) – lightweight date manipulation library
- CSS (custom, responsive with media queries)

---

## 📁 Project Structure
```bash
calendar-app/
├── public/
├── src/
│ ├── components/
│ │ ├── Calendar.js
│ │ ├── CalendarHeader.js
│ │ ├── Day.js
│ │ └── TimelineScheduler.js
│ ├── styles/
│ │ ├── Calendar.css
│ │ ├── Day.css
│ │ └── TimelineScheduler.css
│ ├── App.js
│ └── index.js
├── README.md
└── package.json
```
---

## 📦 Installation & Setup

### Clone the repository:
```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
```

### Install dependencies:
```bash
npm install
```
### Start the development server:
```bash
npm start
```
```bash
Open your browser at http://localhost:3000
```
## 📌 Notes

This app uses localStorage so your events persist even after page reload.

Mobile view shows only colored dots for tasks instead of text for clarity.

You can update task priority and delete tasks from the timeline view.

## 🙌 Author

Naveen Kumar P GitHub: @naveenkumar-42

## 📄 License

This project is licensed under the MIT License - feel free to use and modify it.

