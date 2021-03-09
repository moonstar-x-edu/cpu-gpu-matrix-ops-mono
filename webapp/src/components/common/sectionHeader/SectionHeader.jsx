import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ text, className, first }) => {
  return (
    <h2 className={`section-header ${first ? 'first-section' : ''} ${className}`.trim()}>
      {text}
    </h2>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  first: PropTypes.bool
};

SectionHeader.defaultProps = {
  className: '',
  first: false
};

export default SectionHeader;
