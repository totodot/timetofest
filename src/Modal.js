import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Map from './Map';

const modalRoot = document.getElementById('modal-root');

export const ModalContext = React.createContext('modal');
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.open ? (
        <ModalContext.Provider
          value={{
            onToggle: this.props.onToggle,
          }}
        >
          <ModalComponent disable={this.props.disable}>{this.props.children}</ModalComponent>
        </ModalContext.Provider>
      ) : null,
      this.el
    );
  }
}

const ModalComponent = ({ children, disable = true }) => {
  const { onToggle } = useContext(ModalContext);
  const modalEl = useRef(null);
  useEffect(() => {
    if (!disable) {
      return;
    }
    disableBodyScroll(modalEl.current);
    return () => {
      enableBodyScroll(modalEl.current);
    };
  }, [disable]);
  return (
    <div className="modal" ref={modalEl}>
      <div className="modal__content">
        <div className="modal__overlay" onClick={onToggle} />
        <div className="modal__button button button_light" onClick={onToggle}>
          close
        </div>
        <div className="modal__box">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
