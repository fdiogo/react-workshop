import React from 'react';
import PropTypes from 'prop-types';
import './Season.css';

import useConfiguration from '../../../../../hooks/useConfiguration';

function Season(props) {
    const { season } = props;

    const { air_date, episode_count, name, overview, poster_path } = season;

    const {
        images: { base_url }
    } = useConfiguration();

    const premierYear = air_date && new Date(air_date).getFullYear();

    return (
        <div className="season">
            <img
                className="season-poster"
                src={`${base_url}/original${poster_path}`}
                alt={name}
            />
            <div>
                <h2 className="season-name">{name}</h2>
                <span className="season-shorthand-details">
                    {premierYear && `${premierYear} | `} {episode_count}{' '}
                    Episodes
                </span>
                <p className="season-overview">{overview || null}</p>
            </div>
        </div>
    );
}

Season.propTypes = {
    season: PropTypes.shape({
        air_date: PropTypes.string,
        episode_count: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        season_number: PropTypes.number.isRequired
    })
};

export default Season;
