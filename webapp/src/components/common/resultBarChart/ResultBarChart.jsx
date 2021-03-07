import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@reactchartjs/react-chart.js';

const ResultBarChart = ({ data, beginsAtZero, id, height, width, redraw, maintainAspectRatio, yLabel }) => {
  if (!data) {
    return null;
  }

  const options = {
    maintainAspectRatio,
    scales: {
      yAxes: [
        {
          ticks: {
            beginsAtZero
          },
          scaleLabel: {
            display: !!yLabel,
            labelString: yLabel
          }
        }
      ]
    }
  };

  return (
    <Bar data={data} options={options} id={id} height={height} width={width} redraw={redraw} />
  );
};

ResultBarChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      backgroundColor: PropTypes.string.isRequired
    })).isRequired
  }),
  beginsAtZero: PropTypes.bool,
  id: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  redraw: PropTypes.bool,
  maintainAspectRatio: PropTypes.bool,
  yLabel: PropTypes.string
};

ResultBarChart.defaultProps = {
  data: null,
  beginsAtZero: true,
  id: null,
  height: 150,
  width: 300,
  redraw: false,
  maintainAspectRatio: true,
  yLabel: null
};

export default ResultBarChart;
