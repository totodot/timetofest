const hourWidth = 200;

const addPadd = number => String(number).padStart('2', 0);

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

export const getPeriodTime = (date1, date2) => `${getTime(date1)}-${getTime(date2)}`

export const getOffset = (min, max, start) => {
    const _min = +new Date(min);
    const _max = +new Date(max);
    const _start = +new Date(start);
    const width = getWidthByDate(_min, _max);
    return (_start - _min) / (_max - _min) * width;
}