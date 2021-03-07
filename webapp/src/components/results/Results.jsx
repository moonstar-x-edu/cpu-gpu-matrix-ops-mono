import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ResultBarChart from '../common/resultBarChart';
import AppContext from '../../context/AppContext';
import ResultsContext from '../../context/ResultsContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';
import { parseResultsForBarChart } from '../../utils/charting';
import { getAllResults } from '../../networking';

const colors = {
  gpu: 'rgb(255, 99, 132)',
  cpu: 'rgb(54, 162, 235)'
};

const Results = () => {
  const { setActive } = useContext(AppContext);
  const { allResults, setAllResults, fetchError, setFetchError } = useContext(ResultsContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.results);
    updatePageTitle('Resultados');

    if (!allResults) {
      getAllResults()
        .then((results) => {
          setAllResults(results);
        })
        .catch((error) => {
          setFetchError(error);
        });
    }
  }, [allResults, setActive, setAllResults, setFetchError]);

  return (
    <Container className="results-content">
      RESULTS
      {JSON.stringify(allResults)}
      {JSON.stringify(fetchError)}
      {
        allResults &&
          <ResultBarChart data={parseResultsForBarChart(allResults[0].results, colors)} redraw yLabel="ms (lower is better)" />
      }
    </Container>
  );
};

export default Results;
