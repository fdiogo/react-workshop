import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../Modal';

function TvDetails(props) {
    const {
        name,
        overview,
        status = null,
        createdBy = [],
        seasons = [],
        image
    } = props;

    const [seasonId, setSeasonId] = useState();

    const selectedSeason = seasons.find(season => season.id == seasonId);

    return (
        <Modal>
            <div className="tv-details">
                <img className="tv-details-poster" src={image} alt={name} />
                <div className="tv-details-summary">
                    <h1>{name}</h1>
                    <h2 className="tv-details-status">{status}</h2>
                    <p>{overview}</p>
                    <ul className="tv-details-creators">
                        {createdBy.map(creator => (
                            <li className="tv-details-creator" key={creator}>
                                <b>{creator}</b>
                                <span>Creator</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tv-details-seasons">
                    <h2>Seasons</h2>
                    <div>
                        {seasons.map(season => (
                            <label
                                className="tv-details-season"
                                key={season.id}
                            >
                                {season.name}
                                <input
                                    type="radio"
                                    value={season.id}
                                    onChange={() => setSeasonId(season.id)}
                                />
                            </label>
                        ))}
                    </div>
                    {selectedSeason && (
                        <p>{selectedSeason.overview || 'No description'}</p>
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
    seasons: PropTypes.array
};

export default TvDetails;
