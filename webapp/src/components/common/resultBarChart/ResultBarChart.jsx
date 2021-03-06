import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@reactchartjs/react-chart.js';

const ResultBarChart = ({
  data,
  beginsAtZero,
  id,
  height,
  width,
  redraw,
  maintainAspectRatio,
  yLabel,
  xLabel,
  title
}) => {
  if (!data) {
    return null;
  }

  const options = {
    maintainAspectRatio,
    responsive: true,
    title: {
      display: !!title,
      text: title,
      fontSize: 20
    },
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
      ],
      xAxes: [
        {
          scaleLabel: {
            display: !!xLabel,
            labelString: xLabel
          }
        }
      ]
    }
  };

  return (
    <div className="result-bar-chart">
      <Bar key={id} data={data} options={options} id={id} height={height} width={width} redraw={redraw} />
    </div>
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
  yLabel: PropTypes.string,
  xLabel: PropTypes.string,
  title: PropTypes.string
};

ResultBarChart.defaultProps = {
  data: null,
  beginsAtZero: true,
  id: null,
  height: null,
  width: null,
  redraw: false,
  maintainAspectRatio: false,
  yLabel: null,
  xLabel: null,
  title: null
};

export default ResultBarChart;
