import React from 'react';

import Star from '../icons/Star';

function Generic(props) {
    const { data } = props;
    const {
        name,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        media_type
    } = data;

    return (
        <div className="media">
            <span className="media-votes">
                <Star />
                <span className="media-votes-average">{vote_average}</span>
            </span>
            <img
                className="media-poster"
                src={poster_path || backdrop_path}
                alt={name || title}
            />
            <span className="media-title">{name || title}</span>
            <span className="media-type">{media_type}</span>
        </div>
    );
}

export default Generic;
