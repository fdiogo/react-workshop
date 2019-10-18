import React from 'react';
import PropTypes from 'prop-types';

function Rating(props) {
    const { value } = props;

    let color = 'grey';

    if (value >= 5 && value < 7) {
        color = 'green';
    } else if (value >= 7 && value < 8) {
        color = '#5151d6';
    } else if (value >= 8 && value < 9) {
        color = '#a033a0';
    } else if (value >= 9) {
        color = 'orange';
    }

    return <span style={{ color }}>{value}</span>;
}

Rating.propTypes = {
    value: PropTypes.number
};

export default Rating;
