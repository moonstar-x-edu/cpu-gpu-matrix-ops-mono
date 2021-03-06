import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';

const Benchmark = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.benchmark);
    updatePageTitle('Benchmark');
  }, [setActive]);

  return (
    <div>
      BENCHMARK
    </div>
  );
};

export default Benchmark;
