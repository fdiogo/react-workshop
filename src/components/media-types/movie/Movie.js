import React, { Fragment, useState, useEffect } from 'react';
import './Movie.css';

import useConfiguration from '../../../hooks/useConfiguration';
import Rating from '../../Rating';
import MovieDetails from './components/movie-details/MovieDetails';

function Movie(props) {
    const { data } = props;

    const {
        images: { base_url }
    } = useConfiguration();

    const { id, title, poster_path, vote_average, release_date } = data;

    console.log(release_date);

    const [details, setDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        let canceled = false;

        if (isOpen && !details) {
            fetch(`https://reactworkshop-api.herokuapp.com/3/movie/${id}`)
                .then(response => response.json())
                .then(details => !canceled && setDetails(details));
        }

        return () => (canceled = true);
    }, [details, isOpen, id]);

    const premierYear = release_date && new Date(release_date).getFullYear();

    return (
        <Fragment>
            <div className="media movie" onClick={handleClick}>
                <div className="media-poster">
                    <img
                        className="media-poster-image"
                        src={`${base_url}/w500${poster_path}`}
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
                />
            )}
        </Fragment>
    );
}

export default Movie;
