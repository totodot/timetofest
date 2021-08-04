import React, { useContext, useEffect, useRef, useState } from 'react';
import { FavContext } from './App';
import config from './config';
import { ModalContext } from './Modal';
import { getDayName, getPeriodTime, getPlainConcerts } from './utils';

const concerts = getPlainConcerts(config);

const SearchModal = () => {
  const modalCtx = useContext(ModalContext);
  const favCtx = useContext(FavContext);
  const [query, setQuery] = useState('');
  const onChangeQuery = (e) => setQuery(e.target.value);
  const inputRef = useRef();
  const filteredConcerts =
    query.length > 0
      ? concerts.filter((concert) => {
          const name = concert.name.toLowerCase();
          const q = query.toLowerCase();
          return name.indexOf(q) > -1;
        })
      : [];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="search-modal">
      <div className="search-modal__input-wrapper">
        <input
          ref={inputRef}
          className="search-input"
          value={query}
          onChange={onChangeQuery}
          placeholder="Poszukaj sobie"
        />
        <div className="search-modal__close" onClick={modalCtx.onToggle}>
          CLOSE
        </div>
      </div>
      <div className="search-modal__list">
        {!query.length && (
          <div className="search-modal__empty">
            🧑‍💻 Wpisz sobie jakiś znak
          </div>
        )}
        {!!query.length && !filteredConcerts.length ? (
          <div className="search-modal__empty">Puściutko</div>
        ) : null}
        {filteredConcerts.map((concert) => (
          <div
            onClick={() => favCtx.onChangeFavs(concert.id)}
            key={concert.id}
            className={`search-concert concert_${concert.stage}`}
          >
            <span className="search-concert__stage">{concert.sceneName}</span>
            <p className="search-concert__title">{concert.name}</p>

            <p className="search-concert__time">
              {`${getPeriodTime(concert.start, concert.end)}`}
              <span className="search-concert__day">
                (
                {`${getDayName(
                  concert.dayDate
                )} ${concert.dayName.toUpperCase()}`}
                )
              </span>
            </p>
            <div
              className={`concert__fav ${
                favCtx.favs.includes(concert.id) ? 'concert__fav_active' : ''
              }`}
            >
              <div className="concert__heart">
                <span>❤️</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;
