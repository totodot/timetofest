import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Map from './Map';

const modalRoot = document.getElementById('modal-root');

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
      this.props.open ? <ModalComponent onToggle={this.props.onToggle}>{this.props.children}</ModalComponent> : null,
      this.el,
    );
  }
}

const ModalComponent = ({children, onToggle}) => {
    const modalEl = useRef(null);
    useEffect(() => {
        disableBodyScroll(modalEl);
        return () => {
            enableBodyScroll(modalEl);
        };
    },[])
    return(
    <div className="modal" ref={modalEl}>
        <div className="modal__content">
            <div className="modal__button button button_light" onClick={onToggle}>close</div>
            {children}
        </div>
    </div>
)}


export default Modal;