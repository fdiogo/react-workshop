import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Modal.css';

import Close from '../icons/Close';

function Modal(props) {
    const { children, onClose } = props;

    const modalContentRef = useRef();

    useEffect(() => {
        const handleKeyUp = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleMouseDown = event => {
            if (!modalContentRef.current.contains(event.target)) {
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
            <div className="modal-content" ref={modalContentRef}>
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
