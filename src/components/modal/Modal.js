import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Modal.css';

import Close from '../icons/Close';

function Modal(props) {
    const { children, onClose } = props;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-overlay" />
            <div className="modal-content">
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
