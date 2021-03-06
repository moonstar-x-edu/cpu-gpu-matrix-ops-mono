import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';

const NotFound = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(null);
  }, [setActive]);

  return (
    <div>
      404 NOT FOUND
    </div>
  );
};

export default NotFound;
