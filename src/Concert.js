import React, { useState } from 'react';
import {
  getWidthByDate,
  getPeriodTime,
  existInLS,
  addToLS,
  removeFromLS,
} from './utils';
import logo from './logo.svg';

function Concert(props) {
  const {
    name,
    start,
    end,
    getOffset,
    stage,
    extraText,
    extraInfo,
    id,
    hourWidth,
    cellHeight,
  } = props;
  const [isFav, setIsFav] = useState(existInLS(id));
  const click = () => {
    if (isFav) {
      removeFromLS(id);
    } else {
      addToLS(id);
    }
    setIsFav(existInLS(id));
  };
  const open = (e, name) => {
    e.stopPropagation();
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`
    );
  };
  const width = getWidthByDate(start, end, hourWidth);
  const style = {
    transform: `translateX(${getOffset(start)}px)`,
    width: `${width}px`,
  };
  return (
    <div className="concert-wrapper" style={style}>
      <div
        className={`concert concert_${stage} ${isFav ? 'concert_active' : ''}`}
        onClick={click}
      >
        <div className="concert__time">
          {getPeriodTime(start, end, extraInfo)}
        </div>
        <div className="concert__artist">{name}</div>
        {cellHeight > 50 && hourWidth > 75 && (
          <div className="concert__youtube" onClick={(e) => open(e, name)}>
            <img className="concert__youtube-logo" src={logo} />
          </div>
        )}
        <div className="concert__extra">{extraText}</div>
        <div
          className={`concert__fav ${isFav ? 'concert__fav_active' : ''}`}
        ></div>
      </div>
    </div>
  );
}

export default Concert;
