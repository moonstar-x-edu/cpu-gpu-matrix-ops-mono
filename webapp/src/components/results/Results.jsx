import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';

const Results = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.results);
  }, [setActive]);

  return (
    <div>
      RESULTS
    </div>
  );
};

export default Results;
