import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
    const { children } = props;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-overlay" />
            <div className="modal-content">{children}</div>;
        </div>,
        document.getElementsByTagName('body')[0]
    );
}

export default Modal;
