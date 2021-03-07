import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ResultBarChart from '../common/resultBarChart';
import AppContext from '../../context/AppContext';
import ResultsContext from '../../context/ResultsContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';
import { getAllResults } from '../../networking';

const Results = () => {
  const { setActive } = useContext(AppContext);
  const { allResults, setAllResults } = useContext(ResultsContext);
  const [fetchError, setFetchError] = useState(null);

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
  }, [allResults, setActive, setAllResults]);

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Red Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)'
      },
      {
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)'
      },
      {
        label: '# of Green Votes',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: 'rgb(75, 192, 192)'
      }
    ]
  };

  return (
    <Container className="results-content">
      RESULTS
      {JSON.stringify(allResults)}
      {JSON.stringify(fetchError)}
      <ResultBarChart data={data} redraw yLabel="ms (lower is better)" />
    </Container>
  );
};

export default Results;
