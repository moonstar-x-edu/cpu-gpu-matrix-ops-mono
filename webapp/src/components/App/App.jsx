import React from 'react';
import Router from '../router';
import { AppContextProvider } from '../../context/AppContext';
import '../../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
};

export default App;
