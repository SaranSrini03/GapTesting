import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

const PieChart = ({ chartData, title }) => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)',

    },
    title: {
      text: title || 'PieChart data',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
      {
        name: 'Browsers',
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  title: PropTypes.string,
};

PieChart.defaultProps = {
  title: 'PieChart data',
};

export default PieChart;
