/* eslint-disable no-extra-parens */
import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ResultBarChart from '../common/resultBarChart';
import LoadingSpinner from '../common/loadingSpinner';
import AlertBox from '../common/alertBox';
import ResultsDropdown from '../common/resultsDropdown';
import SectionHeader from '../common/sectionHeader';
import AppContext from '../../context/AppContext';
import ResultsContext from '../../context/ResultsContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';
import { parseResultsForBarChart, parseResultsForLineChart, parseAllResultsForLineChart } from '../../utils/charting';
import { getAllResultsFromEveryone } from '../../networking';
import ResultLineChart from '../common/resultLineChart/ResultLineChart';

const colors = {
  gpu: 'rgb(255, 99, 132)',
  cpu: 'rgb(54, 162, 235)'
};

const Results = () => {
  const { setActive } = useContext(AppContext);
  const {
    allResults,
    setAllResults,
    fetchError,
    setFetchError,
    loading,
    setLoading,
    currentResult,
    setCurrentResult,
    shouldFetch,
    setShouldFetch
  } = useContext(ResultsContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.results);
    updatePageTitle('Resultados');

    if (shouldFetch) {
      setLoading(true);
      setShouldFetch(false);
      getAllResultsFromEveryone()
        .then((results) => {
          setAllResults(results);
          setLoading(false);
          setShouldFetch(false);
        })
        .catch((error) => {
          setFetchError(error);
          setLoading(false);
          setShouldFetch(false);
        });
    }
  }, [
    allResults,
    setActive,
    setAllResults,
    fetchError,
    setFetchError,
    loading,
    setLoading,
    shouldFetch,
    setShouldFetch
  ]);

  function handleDropdownSelect(id) {
    setCurrentResult(allResults.find((res) => res.id === id));
  }

  if (fetchError) {
    return (
      <Container className="results-content">
        <AlertBox color="red" title="😢 Algo sucedió al comunicarse con el API de resultados..." text={[fetchError.message]} />
      </Container>
    );
  }

  if (!allResults || loading) {
    return (
      <Container className="results-content">
        <LoadingSpinner color="custom" loading={loading} />
      </Container>
    );
  }

  if (allResults.length < 1) {
    return (
      <Container className="results-content">
        <AlertBox color="yellow" title="😢 No hay resultados para mostrar." text={['Los datos todavía no han sido subidos a la base de datos. ¡Vuelve más pronto!']} />
      </Container>
    );
  }

  return (
    <Container className="results-content">
      <SectionHeader first text="Resultados Individuales" />
      <ResultsDropdown results={allResults} onSelect={handleDropdownSelect} />
      {
        currentResult &&
          <Fragment>
            <ResultBarChart
              data={parseResultsForBarChart(currentResult.results, colors)}
              redraw
              yLabel="ms (menor es mejor)"
              xLabel={currentResult.ua}
              title={`${currentResult.gpuInfo.renderer} (x${currentResult.results.iterations})`}
              id={currentResult.id}
            />
            <ResultLineChart
              data={parseResultsForLineChart(currentResult.results)}
              redraw
              yLabel="xFactor (Mejor significa qué tan mejor es el GPU)"
              xLabel={currentResult.ua}
              title="Factor de Rendimiento del GPU vs CPU"
              id={currentResult.id}
            />
          </Fragment>
      }
      <ResultLineChart
        data={parseAllResultsForLineChart(allResults)}
        redraw
        yLabel="xFactor (Mejor significa qué tan mejor es el GPU)"
        xLabel="Tamaño de Matrices"
        title="Factor de Rendimiento Promedio Total del GPU vs CPU"
        id="average-line-chart"
      />
    </Container>
  );
};

export default Results;
