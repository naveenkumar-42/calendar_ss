import React from 'react';
import Calendar from './components/Calendar';
import './components/Calendar.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Calendar App</h1>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;