import React, { useState } from 'react';
import './App.css';
import Timetable from './Timetable';
import config from './config';
import { getDayName } from './utils';

const getActiveDayId = (config) => {
  const current = new Date();
  const currentTimetable = config.find(({ date }) => {
    const _date = new Date(date);
    _date.setDate(_date.getDate() + 1);
    _date.setHours(8);
    return current < _date;
  }) || config[0];
  return currentTimetable.id;
}

function App() {
  const [activeDayId, setActiveDatId] = useState(getActiveDayId(config));
  const { timetable } = config.find(({ id }) => id === activeDayId);
  return (
    <div className="App">
      <div className="days">
        {config.map(({ id, name, date }) => (
          <div key={id} className={`day ${id === activeDayId ? 'day_active' : ''}`} onClick={() => setActiveDatId(id)}>
            <div>{name}</div>
            <div className="day__name">{getDayName(date)}</div>
          </div>
        ))}
      </div>
      
      <Timetable timetable={timetable} />

    </div>
  );
}

export default App;
