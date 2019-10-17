import React, { Fragment, useEffect, useState } from 'react';

import Rating from '../../Rating';

import TvDetails from './components/tv-details/TvDetails';
import useConfiguration from '../../../hooks/useConfiguration';

function Generic(props) {
    const { data } = props;
    const {
        images: { base_url }
    } = useConfiguration();

    const { id, name, poster_path, vote_average, first_air_date } = data;

    const [details, setDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        let canceled = false;

        if (isOpen && !details) {
            fetch(`https://reactworkshop-api.herokuapp.com/3/tv/${id}`)
                .then(response => response.json())
                .then(details => !canceled && setDetails(details));
        }

        return () => (canceled = true);
    }, [details, isOpen, id]);

    const premierYear =
        first_air_date && new Date(first_air_date).getFullYear();

    return (
        <Fragment>
            <div className="media tv" onClick={handleClick}>
                <div className="media-poster">
                    <img
                        className="media-poster-image"
                        src={`${base_url}/w500${poster_path}`}
                        alt={name}
                    />
                </div>
                <div className="media-summary">
                    <span className="media-votes">
                        <span className="media-votes-average">
                            <Rating value={vote_average} />
                        </span>
                    </span>
                    <span className="media-title">
                        {name}
                        {premierYear && (
                            <span className="media-year">{`(${premierYear})`}</span>
                        )}
                    </span>
                </div>
            </div>
            {isOpen && (
                <TvDetails
                    partialData={data}
                    data={details}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </Fragment>
    );
}

export default Generic;
