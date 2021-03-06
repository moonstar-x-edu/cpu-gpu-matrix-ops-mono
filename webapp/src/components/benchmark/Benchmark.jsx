import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';

const Benchmark = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.benchmark);
  }, [setActive]);

  return (
    <div>
      BENCHMARK
    </div>
  );
};

export default Benchmark;
