/* eslint-disable max-statements */
import { BENCHMARK } from './benchmark';
import { arrayCompare } from './array';

export const parseResultsForBarChart = (results, colors) => {
  const resultTypes = Object.keys(results.times);

  if (Object.keys(colors).length !== resultTypes.length) {
    throw new Error('Colors and result types must be of same length!');
  }

  for (const key in colors) {
    if (!resultTypes.includes(key)) {
      throw new Error(`Invalid color key ${key}, it does not exist in result types!`);
    }
  }

  return {
    labels: results.matrixSizes,
    datasets: resultTypes.map((key) => ({
      label: key.toUpperCase(),
      data: results.times[key],
      backgroundColor: colors[key]
    }))
  };
};

export const parseResultsForLineChart = (results) => {
  const values = [];

  for (let i = 0; i < results.times.cpu.length; i++) {
    const cpu = results.times.cpu[i];
    const gpu = results.times.gpu[i];

    values.push(Math.sign(cpu - gpu) * (gpu / cpu));
  }

  return {
    labels: results.matrixSizes,
    datasets: [{
      label: 'Factor de rendimiento GPU sobre CPU',
      data: values,
      fill: false,
      backgroundColor: 'rgb(0,250,154)',
      borderColor: 'rgb(0,250,154)'
    }]
  };
};

export const parseAllResultsForLineChart = (allResults) => {
  const values = BENCHMARK.DEFAULT_MATRIX_SIZES.reduce((obj, cur) => {
    obj[cur] = 0;
    return obj;
  }, {});
  let numberOfEntries = 0;

  for (const { results } of allResults) {
    if (!arrayCompare(results.matrixSizes, BENCHMARK.DEFAULT_MATRIX_SIZES)) {
      continue;
    }
    numberOfEntries++;

    for (let i = 0; i < results.matrixSizes.length; i++) {
      const size = results.matrixSizes[i];

      const cpu = results.times.cpu[i];
      const gpu = results.times.gpu[i];

      values[size] += Math.sign(cpu - gpu) * (gpu / cpu);
    }
  }

  for (const key in values) {
    if (values[key] !== 0) {
      break;
    }
    
    return null;
  }

  return {
    labels: Object.keys(values),
    datasets: [{
      label: 'Factor de rendimiento GPU sobre CPU',
      data: Object.values(values).map((val) => val / numberOfEntries),
      fill: false,
      backgroundColor: 'rgb(186,85,211)',
      borderColor: 'rgb(186,85,211)'
    }]
  };
};
