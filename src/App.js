import React, { useState } from 'react';
import './App.css';
import Timetable from './Timetable';
import Modal from './Modal';
import Map from './Map';
import Bus from './Bus';
import config from './config';
import { getDayName, existInLS } from './utils';

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
  const [isFavActive, setIsFavActive] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [busOpen, setBusOpen] = useState(false);

  const openMap =  () => {
    setMapOpen(!mapOpen);
  }
 
  const openBus =  () => {
    setBusOpen(!busOpen);
  }
 
  const { timetable } = config.find(({ id }) => id === activeDayId);
  const filteredTimetable = isFavActive ? timetable.map(({ concerts, ...rest }) => {
    return {
      ...rest,
      concerts: concerts.filter(({ id }) => existInLS(id))
    };
  }) : timetable;
  return (
    <>
    <div className="App">
      <div className="menu">
        {config.map(({ id, name, date }) => (
          <div key={id} className={`button menu__item ${id === activeDayId ? 'day_active' : ''}`} onClick={() => setActiveDatId(id)}>
            <div>{name}</div>
            <div className="day__name">{getDayName(date)}</div>
          </div>
        ))}
        <div className={`button  menu__item ${isFavActive ? 'hearts_active' : ''}`} onClick={() => setIsFavActive(!isFavActive)}>❤️</div>
        <div className="button  menu__item" onClick={openMap}>🗺️</div>
        <div className="button  menu__item" onClick={openBus}>🚌</div>
      </div>
      <Timetable timetable={filteredTimetable} />
      {mapOpen && <Modal open={mapOpen} onToggle={openMap}>
        <Map></Map>
      </Modal>}
      {busOpen && <Modal open={busOpen} onToggle={openBus}>
        <Bus></Bus>
      </Modal>}
    </div>
    </>
  );
}

export default App;
