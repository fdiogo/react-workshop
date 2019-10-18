import React, { useEffect } from 'react';
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

    useEffect(() => {
        const handleKeyUp = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleMouseDown = event => {
            if (wasClickOutside(event)) {
                onClose();
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onClose]);

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
