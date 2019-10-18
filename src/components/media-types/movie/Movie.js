import React, { Fragment, useState, useEffect } from 'react';
import './Movie.css';

import Rating from '../../Rating';
import MovieDetails from './components/movie-details/MovieDetails';

function Movie(props) {
    const { data, configuration } = props;

    const {
        images: { base_url, poster_sizes }
    } = configuration;

    const { id, title, poster_path, vote_average, release_date } = data;

    const [details, setDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (isOpen && !details) {
            fetch(`https://reactworkshop-api.herokuapp.com/3/movie/${id}`)
                .then(response => response.json())
                .then(setDetails);
        }
    }, [details, isOpen, id]);

    const premierYear = release_date && new Date(release_date).getFullYear();

    const srcset = poster_sizes
        .filter(size => size !== 'original')
        .map(
            size => `${base_url}${size}${poster_path} ${size.replace('w', '')}w`
        )
        .join(',');

    return (
        <Fragment>
            <div className="media movie" onClick={handleClick}>
                <div className="media-poster">
                    <img
                        className="media-poster-image"
                        srcSet={srcset}
                        src={`${base_url}original${poster_path}`}
                        alt={title}
                    />
                </div>
                <div className="media-summary">
                    <span className="media-votes">
                        <span className="media-votes-average">
                            <Rating value={vote_average} />
                        </span>
                    </span>
                    <span className="media-title">
                        {title}
                        {premierYear && (
                            <span className="media-year">{`(${premierYear})`}</span>
                        )}
                    </span>
                </div>
            </div>
            {isOpen && (
                <MovieDetails
                    partialData={data}
                    data={details}
                    onClose={() => setIsOpen(false)}
                    configuration={configuration}
                />
            )}
        </Fragment>
    );
}

export default Movie;
