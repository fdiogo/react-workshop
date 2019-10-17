import React from 'react';
import './Loader.css';

import Spinner from '../icons/Spinner';

function Loader(props) {
    const { children } = props;

    return (
        <div className="loader">
            <Spinner className="loader-spinner" />
            {children}
        </div>
    );
}

export default Loader;
