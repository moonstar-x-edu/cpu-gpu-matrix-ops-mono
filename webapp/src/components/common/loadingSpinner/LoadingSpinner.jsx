import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { BS_COLOR_VARIANTS } from '../../../constants';

const LoadingSpinner = ({ loading, small, animation, srText, color, ...props }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className={`loading-spinner ${color === 'custom' ? 'custom-color' : ''}`.trim()} {...props}>
      <Spinner animation={animation} role="status" size={small ? 'sm' : null} variant={BS_COLOR_VARIANTS[color]}>
        <span className="sr-only">
          {srText}
        </span>
      </Spinner>
    </div>
  );
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  small: PropTypes.bool,
  animation: PropTypes.oneOf(['border', 'grow']),
  srText: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(BS_COLOR_VARIANTS))
};

LoadingSpinner.defaultProps = {
  small: false,
  animation: 'border',
  srText: 'Loading...',
  color: 'blue'
};

export default LoadingSpinner;
