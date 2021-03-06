import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';

const Results = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.results);
    updatePageTitle('Resultados');
  }, [setActive]);

  return (
    <div>
      RESULTS
    </div>
  );
};

export default Results;
