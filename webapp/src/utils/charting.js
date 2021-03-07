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
