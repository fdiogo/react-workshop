import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Modal.css';

import Close from '../icons/Close';

function wasClickOutside(event) {
    const modalContent = document.getElementById('modal-content');

    return !modalContent.contains(event.target);
}

function Modal(props) {
    const { children, onClose } = props;

    // TODO: Add a useEffect here to register the event listeners on the window

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-overlay" />
            <div id="modal-content" className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <Close />
                </button>
                {children}
            </div>
        </div>,
        document.getElementsByTagName('body')[0]
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func
};

export default Modal;
