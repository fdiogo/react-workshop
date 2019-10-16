import React from 'react';

const Star = props => (
    <svg
        fill="currentColor"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        {...props}
    >
        <path d="M43.754 17.609a1 1 0 00-.92-.609H30.636l-5.73-12.257a1 1 0 00-1.812 0L17.364 17H5.166a1 1 0 00-.72 1.694l9.033 9.368L9.847 42.59a1 1 0 001.466 1.11L24 36.452l12.687 7.25a.996.996 0 001.1-.07 1 1 0 00.366-1.04l-3.632-14.53 9.032-9.367a1 1 0 00.2-1.085z" />
    </svg>
);

export default Star;
