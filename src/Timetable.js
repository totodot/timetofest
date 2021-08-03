import React, { useEffect, useState, useCallback } from 'react';
import { getWidth, getOffset, getTime } from './utils';
import Concert from './Concert';
import ScrollContainer from 'react-indiana-drag-scroll';

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const getHourPeriods = (min, max) => {
  const periods = [];
  const date = new Date(min);
  date.setMinutes(0);

  while (date < max) {
    periods.push(new Date(date));
    date.setHours(date.getHours() + 1);
  }
  return periods;
};

function Timetable(props) {
  const { timetable, hourWidth, cellHeight } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const scrollRef = React.createRef();
  const timelinesRef = React.createRef();

  const concerts = timetable.reduce(
    (all, next) => [...all, ...next.concerts],
    []
  );
  const getMinDate = (concerts) =>
    concerts.reduce(({ min, max }, next) => {
      const start = new Date(next.start);
      const end = new Date(next.end);
      return {
        min: min ? (min < start ? min : start) : start,
        max: max ? (max > end ? max : end) : end,
      };
    }, {});
  const { min, max } = getMinDate(concerts);
  const width = getWidth(min, max, hourWidth) || '300';
  const getPercentageOffset = useCallback((start) =>
    getOffset(min, max, start, hourWidth)
  );
  const hourPeriods = getHourPeriods(min, max);
  const timeStyle = {
    transform: `translateX(${getPercentageOffset(currentDate)}px)`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentDate < min || currentDate > max) {
      return;
    }
    const scrollOffset = getPercentageOffset(currentDate) - 100;
    if (scrollRef.current) {
      const element = scrollRef.current.container.current;
      element.scrollLeft = scrollOffset;
    }
    if (timelinesRef.current) {
      const element = timelinesRef.current;
      element.scrollLeft = scrollOffset;
    }
  }, [
    currentDate,
    getPercentageOffset,
    max,
    min,
    scrollRef,
    timelinesRef,
    timetable,
  ]);
  const Component = (
    <div className="timelines__scroll" style={{ width: `${width}px` }}>
      <div>
        {hourPeriods.map((d) => (
          <div
            className="grid"
            style={{ transform: `translateX(${getPercentageOffset(d)}px)` }}
          >
            <div className="grid__line" />
            <div className="grid__time">{getTime(d)}</div>
            <div className="grid__time grid__time_bottom">{getTime(d)}</div>
          </div>
        ))}
        {timetable.map(({ id, concerts }) => (
          <div className="timeline" style={{ height: cellHeight }} key={id}>
            {concerts.map((concert) => (
              <Concert
                key={concert.id}
                {...concert}
                stage={id}
                getOffset={getPercentageOffset}
                hourWidth={hourWidth}
                cellHeight={cellHeight}
              />
            ))}
          </div>
        ))}
        {concerts.length === 0 && (
          <div className="no-selection">
            😔😔😔Zaserduszkuj sobie jakieś koncerty
          </div>
        )}
      </div>
      <div className="time" style={timeStyle}></div>
    </div>
  );

  return (
    <div className="timetable">
      <div className="stages">
        {timetable.map(({ id, name }) => (
          <div className="stage" style={{ height: cellHeight }} key={id}>
            <div className="stage__name">{name}</div>
          </div>
        ))}
      </div>
      <div className="timelines" ref={timelinesRef}>
        {isMobile ? (
          Component
        ) : (
          <ScrollContainer ref={scrollRef}>{Component}</ScrollContainer>
        )}
      </div>
    </div>
  );
}

export default Timetable;
