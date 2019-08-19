import React from 'react';
import logo from './logo.svg';
import './App.css';
import Concert from './Concert';
import { getWidth, getOffset } from './utils'
import timetable from './timetable';


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
const timeDiff = max - min;
const width = getWidth(min, max);
console.log(width)
function App() {

  const getPercentageOffset = (start) => getOffset(min, max, start);
  return (
    <div className="App">
      <header className="App-header">
        FEST
      </header>
      <div className="timetable">
        <div className="stages">
          {timetable.map(({ id, name, concerts }) => (
            <div className="stage">
              <div className="stage__name">
                {name}
            </div>
            </div>
        ))}
        </div>
        <div className="timelines">
          {timetable.map(({ id, name, concerts }) =>
            <div style={{ width: `${width}px` }}>
              <div className="timeline" key={id}>
                {concerts.map(concert => (
                  <Concert {...concert} stage={id} getOffset={getPercentageOffset} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
