import React from 'react';
import Router from '../router';
import { AppContextProvider } from '../../context/AppContext';
import { ResultsContextProvider } from '../../context/ResultsContext';
import '../../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AppContextProvider>
      <ResultsContextProvider>
        <Router />
      </ResultsContextProvider>
    </AppContextProvider>
  );
};

export default App;
