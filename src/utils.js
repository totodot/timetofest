const hourWidth = 100;
const daysNames = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

const addPadd = number => String(number).padStart('2', 0);
export const getDayName = date => {
    const _date = new Date(date);
    const day = _date.getDay();
    return daysNames[day];
}
export const getWidthByDate = (min, max) => {
    const diffInHour = Math.abs((new Date(max) - new Date(min)) / (60 * 60 * 1000));
    const width = hourWidth * diffInHour;
    return width;
}

export const getWidth = (min, max) => getWidthByDate(min, max);

export const getTime = date => {
    const dateObj = new Date(date);
    return `${addPadd(dateObj.getHours())}:${addPadd(dateObj.getMinutes())}`;
}

export const getPeriodTime = (date1, date2, extra) => {

    return `${getTime(date1)}-${extra === '?' ? '?(' : ''}${getTime(date2)}${extra === '?' ? ')' : ''}`
}

export const getOffset = (min, max, start, a) => {
    const _min = +new Date(min);
    const _max = +new Date(max);
    const _start = +new Date(start);
    const width = getWidthByDate(_min, _max);
    return (_start - _min) / (_max - _min) * width;
}

const LSkey = 'fav';

const getLSValue = () => JSON.parse(localStorage.getItem(LSkey) || JSON.stringify([]));
const setLSValue = (value) => localStorage.setItem(LSkey, JSON.stringify(value));

export const addToLS = id => {
    const fav = getLSValue();
    setLSValue([...fav, id]);
}

export const existInLS = id => {
    return getLSValue().find(i => i === id);
}

export const removeFromLS = id => {
    const fav = getLSValue();
    setLSValue([...fav.filter(i => i !== id)])
}