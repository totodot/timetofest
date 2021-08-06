import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Timetable from './Timetable';
import Modal from './Modal';
import Map from './Map';
import Bus from './Bus';
import config from './config';
import {
  getDayName,
  existInLS,
  getLocalStorageSettings,
  changeLocalStorageSettings,
  getFavsFromLS,
  removeFromLS,
  addToLS,
} from './utils';
import Settings from './Settings';
import SearchModal from './SearchModal';

export const FavContext = React.createContext('fav');
const TRACKING_ID = 'UA-151949465-3';

const getActiveDayId = (config) => {
  const current = new Date();
  const currentTimetable =
    config.find(({ date }) => {
      const _date = new Date(date);
      _date.setDate(_date.getDate() + 1);
      _date.setHours(8);
      return current < _date;
    }) || config[0];
  return currentTimetable.id;
};

function App() {
  const lsSettings = getLocalStorageSettings();
  const [favs, setFavs] = useState(getFavsFromLS() || []);
  const [hourWidth, setHourWidth] = useState(lsSettings.hourWidth || 75);
  const [cellHeight, setCellHeight] = useState(lsSettings.cellHeight || 70);
  const [activeDayId, setActiveDatId] = useState(getActiveDayId(config));
  const [isFavActive, setIsFavActive] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [busOpen, setBusOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(lsSettings.darkMode || false);
  const [sticky, setSticky] = useState(false);

  const onChangeFavs = (id) => {
    if (favs.includes(id)) {
      setFavs(favs.filter((fav) => fav !== id));
      removeFromLS(id);
    } else {
      setFavs([...favs, id]);
      addToLS(id);
    }
  };

  const openMap = () => {
    setMapOpen(!mapOpen);
  };
  const openSearch = () => setSearchOpen((v) => !v);
  const openBus = () => {
    setBusOpen(!busOpen);
  };
  const openSettings = () => setSettingsOpen((v) => !v);

  const { timetable } = config.find(({ id }) => id === activeDayId);
  const favTimetable = useMemo(
    () =>
      timetable.map(({ concerts, ...rest }) => {
        return {
          ...rest,
          concerts: concerts.filter(({ id }) => existInLS(id)),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timetable, isFavActive]
  );

  useEffect(() => {
    changeLocalStorageSettings({ darkMode });
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);
  useEffect(() => {
    changeLocalStorageSettings({ cellHeight, hourWidth });
  }, [cellHeight, hourWidth]);
  const observer = useRef(
    new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio === 0) {
          setSticky(true);
        } else if (entries[0].intersectionRatio === 1) {
          setSticky(false);
        }
      },
      { threshold: 0.5, rootMargin: '50px' }
    )
  );

  useEffect(() => {
    // ReactGA.initialize(TRACKING_ID);
    observer.current.observe(document.querySelector('#menu-top'));
  }, []);
  return (
    <FavContext.Provider
      value={{
        favs,
        onChangeFavs,
      }}
    >
      <div className="App">
        <div id="menu-top" />
        <div className="menu">
          {config.map(({ id, name, date }) => (
            <div
              key={id}
              className={`button menu__item ${
                id === activeDayId ? 'button_active' : ''
              }`}
              onClick={() => setActiveDatId(id)}
            >
              <div>{name}</div>
              <div className="day__name">{getDayName(date)}</div>
            </div>
          ))}
          <div
            className={`button  menu__item ${
              isFavActive ? 'button_active' : ''
            }`}
            onClick={() => setIsFavActive(!isFavActive)}
          >
            <span role="img">❤️</span>
          </div>
          <div className="button  menu__item" onClick={openSettings}>
            <span role="img">⚙️</span>
          </div>
          {/* <div className="button  menu__item" onClick={openMap}>
            <span role="img">🗺️</span>
          </div>
          <div className="button  menu__item" onClick={openBus}>
            <span role="img">🚌</span>
          </div> */}
          <div className="button  menu__item" onClick={openSearch}>
            <span role="img">🔍</span>
          </div>
          <div
            className={`button  menu__item ${darkMode ? 'button_active' : ''}`}
            onClick={() => setDarkMode((mode) => !mode)}
          >
            <span role="img">{darkMode ? '🌞' : '🌑'}</span>
          </div>
        </div>
        <div className={`sticky-menu ${sticky ? 'sticky-menu_active' : ''}`}>
          {config.map(({ id, shortName, date }) => (
            <div
              key={id}
              className={`button menu__item ${
                id === activeDayId ? 'button_active' : ''
              }`}
              onClick={() => setActiveDatId(id)}
            >
              <div>{shortName}</div>
            </div>
          ))}
          <div
            className={`button  menu__item ${
              isFavActive ? 'button_active' : ''
            }`}
            onClick={() => setIsFavActive(!isFavActive)}
          >
            <span role="img">❤️</span>
          </div>
          <div className="button  menu__item" onClick={openSettings}>
            <span role="img">⚙️</span>
          </div>
          {/* <div className="button  menu__item" onClick={openMap}>
            <span role="img">🗺️</span>
          </div>
          <div className="button  menu__item" onClick={openBus}>
            <span role="img">🚌</span>
          </div> */}
          <div className="button  menu__item" onClick={openSearch}>
            <span role="img">🔍</span>
          </div>
          <div
            className={`button  menu__item ${darkMode ? 'button_active' : ''}`}
            onClick={() => setDarkMode((mode) => !mode)}
          >
            <span role="img">{darkMode ? '🌞' : '🌑'}</span>
          </div>
        </div>

        <Timetable
          timetable={isFavActive ? favTimetable : timetable}
          hourWidth={hourWidth}
          cellHeight={cellHeight}
        />
        {mapOpen && (
          <Modal open={mapOpen} onToggle={openMap}>
            <Map></Map>
          </Modal>
        )}
        {busOpen && (
          <Modal open={busOpen} onToggle={openBus}>
            <Bus></Bus>
          </Modal>
        )}
        {searchOpen && (
          <Modal open={searchOpen} onToggle={openSearch} disable={false}>
            <SearchModal />
          </Modal>
        )}
        {settingsOpen && (
          <Modal open={settingsOpen} onToggle={openSettings}>
            <Settings
              hourWidth={hourWidth}
              setHourWidth={setHourWidth}
              cellHeight={cellHeight}
              setCellHeight={setCellHeight}
            />
          </Modal>
        )}
      </div>
    </FavContext.Provider>
  );
}

export default App;
