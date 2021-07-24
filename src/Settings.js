import React from 'react';

const Settings = ({ hourWidth, setHourWidth, cellHeight, setCellHeight }) => (
  <div className="settings">
    <h1>Ustawienia</h1>
    <h2>Szerokość</h2>
    <div className="menu">
      <div
        className={`button  menu__item ${
          hourWidth === 50 ? 'button_active' : ''
        }`}
        onClick={() => setHourWidth(50)}
      >
        <span role="img">50</span>
      </div>
      <div
        className={`button  menu__item ${
          hourWidth === 75 ? 'button_active' : ''
        }`}
        onClick={() => setHourWidth(75)}
      >
        <span role="img">75</span>
      </div>
      <div
        className={`button  menu__item ${
          hourWidth === 100 ? 'button_active' : ''
        }`}
        onClick={() => setHourWidth(100)}
      >
        <span role="img">100</span>
      </div>
      <div
        className={`button  menu__item ${
          hourWidth === 125 ? 'button_active' : ''
        }`}
        onClick={() => setHourWidth(125)}
      >
        <span role="img">125</span>
      </div>
    </div>
    <h2>Wysokość</h2>
    <div className="menu">
      <div
        className={`button  menu__item ${
          cellHeight === 50 ? 'button_active' : ''
        }`}
        onClick={() => setCellHeight(50)}
      >
        <span role="img">50</span>
      </div>
      <div
        className={`button  menu__item ${
          cellHeight === 70 ? 'button_active' : ''
        }`}
        onClick={() => setCellHeight(70)}
      >
        <span role="img">70</span>
      </div>
      <div
        className={`button  menu__item ${
          cellHeight === 90 ? 'button_active' : ''
        }`}
        onClick={() => setCellHeight(90)}
      >
        <span role="img">90</span>
      </div>
    </div>
  </div>
);

export default Settings;
