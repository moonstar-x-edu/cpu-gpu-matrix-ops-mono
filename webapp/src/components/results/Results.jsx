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
  const { allResults, setAllResults, fetchError, setFetchError, loading, setLoading } = useContext(ResultsContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.results);
    updatePageTitle('Resultados');

    if (!allResults && !fetchError && !loading) {
      setLoading(true);
      getAllResults()
        .then((results) => {
          setAllResults(results);
          setLoading(false);
        })
        .catch((error) => {
          setFetchError(error);
          setLoading(false);
        });
    }
  }, [allResults, setActive, setAllResults, fetchError, setFetchError, loading, setLoading]);

  if (loading) {
    return (
      <Container className="results-content">
        LOADING
      </Container>
    );
  }

  if (fetchError) {
    return (
      <Container className="results-content">
        ERROR FETCHING!
      </Container>
    );
  }

  return (
    <Container className="results-content">
      RESULTS
      {JSON.stringify(allResults)}
      {JSON.stringify(fetchError)}
      {
        allResults &&
          <ResultBarChart data={parseResultsForBarChart(allResults[0].results, colors)} redraw yLabel="ms (lower is better)" title="Result" />
      }
    </Container>
  );
};

export default Results;
