import React from 'react';
import { getWidthByDate, getPeriodTime } from './utils';

function Concert(props) {
  const { name, start, end, getOffset, stage } = props;
  const width = getWidthByDate(start, end);
  const style = {
    transform: `translateX(${getOffset(start)}px)`,
    width: `${width}px`,
  }
  return (
    <div className='concert-wrapper' style={style}>
      <div className={`concert concert_${stage}`}>
        <div className="concert__time">
          {getPeriodTime(start, end)}
        </div>
        <div className="concert__artist">
          {name}
        </div>
      </div>

    </ div>
  );
}

export default Concert;
