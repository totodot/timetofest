const HOUR_WIDTH = 100;
const daysNames = {
  0: 'Niedziela',
  1: 'Poniedziałek',
  2: 'Wtorek',
  3: 'Środa',
  4: 'Czwartek',
  5: 'Piątek',
  6: 'Sobota',
};

const addPadd = (number) => String(number).padStart('2', 0);
export const getDayName = (date) => {
  const _date = new Date(date);
  const day = _date.getDay();
  return daysNames[day];
};
export const getWidthByDate = (min, max, hourWidth = HOUR_WIDTH) => {
  const diffInHour = Math.abs(
    (new Date(max) - new Date(min)) / (60 * 60 * 1000)
  );
  const width = hourWidth * diffInHour;
  return width;
};

export const getWidth = (min, max, hourWidth) =>
  getWidthByDate(min, max, hourWidth);

export const getTime = (date) => {
  const dateObj = new Date(date);
  return `${addPadd(dateObj.getHours())}:${addPadd(dateObj.getMinutes())}`;
};

export const getPeriodTime = (date1, date2, extra) => {
  return `${getTime(date1)}-${extra === '?' ? '?(' : ''}${getTime(date2)}${
    extra === '?' ? ')' : ''
  }`;
};

export const getOffset = (min, max, start, hourWidth) => {
  const _min = +new Date(min);
  const _max = +new Date(max);
  const _start = +new Date(start);
  const width = getWidthByDate(_min, _max, hourWidth);
  return ((_start - _min) / (_max - _min)) * width;
};

const LSkey = 'fav';
const LSSettingsKey = 'settings';

export const getLSValue = (key) =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify([]));
const setLSValue = (value, key) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getFavsFromLS = () => getLSValue(LSkey);
export const addToLS = (id) => {
  const fav = getLSValue(LSkey);
  setLSValue([...fav, id], LSkey);
};

export const existInLS = (id) => {
  return getLSValue(LSkey).find((i) => i === id);
};

export const removeFromLS = (id) => {
  const fav = getLSValue(LSkey);
  setLSValue([...fav.filter((i) => i !== id)], LSkey);
};

export const changeLocalStorageSettings = (values) => {
  const settings = getLSValue(LSSettingsKey);
  setLSValue(
    {
      ...(settings || {}),
      ...values,
    },
    LSSettingsKey
  );
};

export const getLocalStorageSettings = () => getLSValue(LSSettingsKey);

const parseScene = (scene, day) =>
  scene.concerts.reduce((all, concert) => {
    return [
      ...all,
      {
        ...concert,
        dayName: day.name,
        dayDate: day.date,
        sceneName: scene.name,
        stage: scene.id,
      },
    ];
  }, []);

const parseTimetable = (day) =>
  day.timetable.reduce((all, scene) => {
    return [...all, ...parseScene(scene, day)];
  }, []);

export const getPlainConcerts = (config) =>
  config.reduce((all, day) => {
    return [...all, ...parseTimetable(day)];
  }, []);
