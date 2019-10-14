import React, { useEffect, useState } from 'react';

import Star from '../../icons/Star';

import TvDetails from './TvDetails';

function Generic(props) {
    const { data, configuration } = props;
    const {
        images: { base_url }
    } = configuration;
    const { id, name, poster_path, vote_average, media_type, overview } = data;

    const [details, setDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(true);

    useEffect(() => {
        if (isOpen && !details) {
            fetch(`https://reactworkshop-api.herokuapp.com/3/tv/${id}`)
                .then(response => response.json())
                .then(details => setDetails(details));
        }
    }, [details, isOpen, id]);

    console.log(details);

    const premierYear =
        details && new Date(details.first_air_date).getFullYear();

    return (
        <div className="media tv" onClick={handleClick}>
            <span className="media-votes">
                <Star />
                <span className="media-votes-average">{vote_average}</span>
            </span>
            <img
                className="media-poster"
                src={`${base_url}/original${poster_path}`}
                alt={name}
            />
            <span className="media-title">{name}</span>
            <span className="media-type">{media_type}</span>
            {isOpen && (
                <TvDetails
                    name={details ? `${name} (${premierYear})` : name}
                    overview={overview}
                    image={`${base_url}/original${poster_path}`}
                    status={details && details.status}
                    seasons={details && details.seasons}
                    createdBy={
                        details &&
                        details.created_by.map(creator => creator.name)
                    }
                />
            )}
        </div>
    );
}

export default Generic;
