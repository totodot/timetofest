import React, { useState } from 'react';
import { getWidthByDate, getPeriodTime, existInLS, addToLS, removeFromLS } from './utils';

function Concert(props) {
  const { name, start, end, getOffset, stage, extraText, extraInfo, id } = props;
  const [isFav, setIsFav] = useState(existInLS(id));
  const click = () => {
    if (isFav) {
      removeFromLS(id);
    } else {
      addToLS(id);
    };
    setIsFav(existInLS(id))
  }
  const width = getWidthByDate(start, end);
  const style = {
    transform: `translateX(${getOffset(start)}px)`,
    width: `${width}px`,
  }
  return (
    <div className='concert-wrapper' style={style}>
      <div className={`concert concert_${stage}`} onClick={click}>
        <div className="concert__time">
          {getPeriodTime(start, end, extraInfo)}
        </div>
        <div className="concert__artist">
          {name}
        </div>
        <div className="concert__extra">
          {extraText}
        </div>
        <div className={`concert__fav ${isFav ? 'concert__fav_active' : ''}`}>
          F
        </div>
      </div>

    </ div>
  );
}

export default Concert;
