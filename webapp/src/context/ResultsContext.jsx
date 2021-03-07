import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ResultsContext = React.createContext(null);

export const ResultsContextProvider = ({ children }) => {
  const [allResults, setAllResults] = useState(null);
  const [currentResults, setCurrentResults] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const context = {
    allResults,
    setAllResults,
    currentResults,
    setCurrentResults,
    fetchError,
    setFetchError
  };

  return (
    <ResultsContext.Provider value={context}>
      {children}
    </ResultsContext.Provider>
  );
};

ResultsContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ResultsContextProvider.defaultProps = {
  children: null
};

export default ResultsContext;
