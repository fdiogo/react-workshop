import React from 'react';
import './MovieDetails.css';

import Modal from '../../../../modal';
import Rating from '../../../../Rating';

function MovieDetails(props) {
    const { partialData, onClose, configuration } = props;
    const {
        title,
        vote_average,
        overview,
        poster_path,
        release_date
    } = partialData;

    const {
        images: { base_url, poster_sizes }
    } = configuration;

    const premierYear = release_date && new Date(release_date).getFullYear();

    const srcset = poster_sizes
        .filter(size => size !== 'original')
        .map(
            size => `${base_url}${size}${poster_path} ${size.replace('w', '')}w`
        )
        .join(',');

    return (
        <Modal onClose={onClose}>
            <div className="movie-details">
                <img
                    className="movie-details-poster"
                    srcSet={srcset}
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
