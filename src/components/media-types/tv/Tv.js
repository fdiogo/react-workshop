import React, { Fragment, useEffect, useState } from 'react';

import Rating from '../../Rating';

import TvDetails from './components/tv-details/TvDetails';

function Tv(props) {
    const { data, configuration } = props;
    const {
        images: { base_url, poster_sizes }
    } = configuration;

    const { id, name, poster_path, vote_average, first_air_date } = data;

    const [details, setDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (isOpen && !details) {
            fetch(`https://reactworkshop-api.herokuapp.com/3/tv/${id}`)
                .then(response => response.json())
                .then(setDetails);
        }
    }, [details, isOpen, id]);

    const premierYear =
        first_air_date && new Date(first_air_date).getFullYear();

    const srcset = poster_sizes
        .filter(size => size !== 'original')
        .map(
            size => `${base_url}${size}${poster_path} ${size.replace('w', '')}w`
        )
        .join(',');

    return (
        <Fragment>
            <div className="media tv" onClick={handleClick}>
                <div className="media-poster">
                    <img
                        className="media-poster-image"
                        srcSet={srcset}
                        src={`${base_url}original${poster_path}`}
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
                    configuration={configuration}
                />
            )}
        </Fragment>
    );
}

export default Tv;
