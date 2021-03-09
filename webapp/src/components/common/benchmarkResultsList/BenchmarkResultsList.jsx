/* eslint-disable no-extra-parens */
import React from 'react';
import PropTypes from 'prop-types';

const BenchmarkResultsList = ({ cpuTimes, gpuTimes, matrixSizes, iterations }) => {
  if (cpuTimes.length !== gpuTimes.length || cpuTimes.length !== matrixSizes.length) {
    throw new RangeError('cpuTimes, gpuTimes and matrixSize props must have same length!');
  }

  return (
    <ul>
      <li>
        <span className="font-weight-bold">CPU:</span>
        <ul>
          {
            cpuTimes.map((time, idx) => (
              <li key={idx}>{time}ms - {matrixSizes[idx]}-Matrix ({iterations} iteraciones)</li>
            ))
          }
        </ul>
      </li>
      <li>
        <span className="font-weight-bold">GPU:</span>
        <ul>
          {
            gpuTimes.map((time, idx) => (
              <li key={idx}>{time}ms - {matrixSizes[idx]}-Matrix ({iterations} iteraciones)</li>
            ))
          }
        </ul>
      </li>
    </ul>
  );
};

BenchmarkResultsList.propTypes = {
  cpuTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
  gpuTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
  matrixSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  iterations: PropTypes.number.isRequired
};

export default BenchmarkResultsList;
