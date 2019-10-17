import React from 'react';
import './Generic.css';

import Rating from '../../Rating';
import useConfiguration from '../../../hooks/useConfiguration';

function Generic(props) {
    const { data } = props;
    const {
        images: { base_url }
    } = useConfiguration();

    const {
        name,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        first_air_date,
        release_date,
        profile_path
    } = data;

    const premierYear =
        (first_air_date || release_date) &&
        new Date(first_air_date || release_date).getFullYear();

    return (
        <div className="media">
            <img
                className="media-poster"
                src={`${base_url}/original${poster_path ||
                    backdrop_path ||
                    profile_path}`}
                alt={name || title}
            />
            <div className="media-summary">
                <span className="media-votes">
                    <span className="media-votes-average">
                        <Rating value={vote_average} />
                    </span>
                </span>
                <span className="media-title">
                    {name || title}
                    {premierYear && (
                        <span className="media-year">{`(${premierYear})`}</span>
                    )}
                </span>
            </div>
        </div>
    );
}

export default Generic;
