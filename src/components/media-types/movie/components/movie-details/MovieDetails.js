import React from 'react';
import './MovieDetails.css';

import useConfiguration from '../../../../../hooks/useConfiguration';

import Modal from '../../../../modal';
import Rating from '../../../../Rating';

function MovieDetails(props) {
    const { partialData, data = {}, onClose } = props;
    const {
        title,
        vote_average,
        overview,
        poster_path,
        release_date
    } = partialData;

    const {
        images: { base_url }
    } = useConfiguration();

    const premierYear = release_date && new Date(release_date).getFullYear();

    return (
        <Modal onClose={onClose}>
            <div className="movie-details">
                <img
                    className="movie-details-poster"
                    src={`${base_url}/original${poster_path}`}
                    alt={title}
                />
                <div className="movie-details-summary">
                    <h1 className="movie-details-name">
                        {title}
                        {premierYear && (
                            <span className="movie-details-year">{`(${premierYear})`}</span>
                        )}
                    </h1>
                    <div>
                        <span className="movie-details-votes">
                            <Rating value={vote_average} />
                        </span>
                    </div>
                    <h2>Overview</h2>
                    <p className="movie-details-overview">{overview}</p>
                </div>
            </div>
        </Modal>
    );
}

export default MovieDetails;
