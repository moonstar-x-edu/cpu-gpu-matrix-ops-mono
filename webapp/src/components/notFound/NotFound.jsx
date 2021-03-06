import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { updatePageTitle } from '../../utils/page';

const NotFound = () => {
  const { setActive } = useContext(AppContext);

  useEffect(() => {
    setActive(null);
    updatePageTitle('¡Página no encontrada!');
  }, [setActive]);

  return (
    <div>
      404 NOT FOUND
    </div>
  );
};

export default NotFound;
