import React from 'react';
import './App.css';
import Timetable from './Timetable';
import config from './config';

function App() {
  const {timetable} = config[0];
  return (
    <div className="App">
      <header className="App-header">
        FEST
      </header>
      <Timetable timetable={timetable} />

    </div>
  );
}

export default App;
