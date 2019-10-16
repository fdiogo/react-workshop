import React from 'react';
import PropTypes from 'prop-types';

import './Pager.css';

function Pager(props) {
    const { current, total, onChange } = props;

    const indicators = Array.from({ length: total }, (_, index) => {
        const page = index + 1;
        return (
            <label className="page-indicator" key={page}>
                {page}
                <input name="page" type="radio" value={page} />
            </label>
        );
    });

    return (
        <div className="pager" onChange={event => onChange(event.target.value)}>
            {current > 1 && (
                <button
                    className="pager-previous"
                    onClick={() =>
                        onChange && onChange(Math.max(current - 1, 1))
                    }
                >
                    Previous
                </button>
            )}
            {current < indicators.length && (
                <button
                    className="pager-next"
                    onClick={() =>
                        onChange &&
                        onChange(Math.min(current + 1, indicators.length))
                    }
                >
                    Next
                </button>
            )}
        </div>
    );
}

Pager.propTypes = {
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
};

export default Pager;
