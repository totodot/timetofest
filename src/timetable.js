import React from 'react';
import { getWidth, getOffset } from './utils';
import Concert from './Concert';

function Timetable(props) {
  const { timetable } = props;
  const concerts = timetable.reduce((all, next) => [...all, ...next.concerts], []);
  const getMinDate = concerts => concerts.reduce(({ min, max }, next) => {
    const start = new Date(next.start);
    const end = new Date(next.end);
    return {
      min: min ? (min < start ? min : start) : start,
      max: max ? (max > end ? max : end) : end,
    }
  }, {})
  const { min, max } = getMinDate(concerts);
  const width = getWidth(min, max);
  const getPercentageOffset = (start) => getOffset(min, max, start);

  return (
    <div className="timetable">
      <div className="stages">
        {timetable.map(({ id, name }) => (
          <div className="stage" key={id}>
            <div className="stage__name">
              {name}
            </div>
          </div>
        ))}
      </div>
      <div className="timelines">
        {timetable.map(({ id, concerts }) =>
          <div style={{ width: `${width}px` }} key={id}>
            <div className="timeline">
              {concerts.map(concert => (
                <Concert key={concert.id} {...concert} stage={id} getOffset={getPercentageOffset} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timetable;
