import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Star from '../../icons/Star';

import Modal from '../../Modal';

import Season from './Season';

function TvDetails(props) {
    const { partialData, data = {}, configuration } = props;

    const { name, vote_average, overview, poster_path } = partialData;
    const { first_air_date, status, seasons = [], created_by = [] } = data;
    const {
        images: { base_url }
    } = configuration;

    const [seasonId, setSeasonId] = useState();
    const selectedSeason = seasons.find(season => season.id == seasonId);

    const premierYear =
        first_air_date && new Date(first_air_date).getFullYear();

    return (
        <Modal>
            <div className="tv-details">
                <img
                    className="tv-details-poster"
                    src={`${base_url}/original${poster_path}`}
                    alt={name}
                />
                <div className="tv-details-summary">
                    <h1 className="tv-details-name">
                        {name}
                        {premierYear && (
                            <span className="tv-details-year">{`(${premierYear})`}</span>
                        )}
                    </h1>
                    <span className="tv-details-votes">
                        <Star />
                        <span className="tv-details-votes-average">
                            {vote_average}
                        </span>
                    </span>
                    {/* <h2 className="tv-details-status">{status}</h2> */}
                    <h2>Overview</h2>
                    <p className="tv-details-overview">{overview}</p>
                    <ul className="tv-details-creators">
                        {created_by.map(creator => (
                            <li
                                className="tv-details-creator"
                                key={creator.name}
                            >
                                <b>{creator.name}</b>
                                <span>Creator</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tv-details-seasons">
                    <h2>Seasons</h2>
                    <div>
                        {seasons.map(season => (
                            <button
                                className="tv-details-season"
                                key={season.id}
                                onClick={() => setSeasonId(season.id)}
                            >
                                {season.name}
                            </button>
                        ))}
                    </div>
                    {selectedSeason && (
                        <Season
                            season={selectedSeason}
                            configuration={configuration}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
}

TvDetails.propTypes = {
    name: PropTypes.string,
    overview: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    createdBy: PropTypes.arrayOf(PropTypes.string),
    seasons: PropTypes.arrayOf(PropTypes.object),
    votes: PropTypes.number
};

export default TvDetails;
