import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ chartData }) => {
  // Configuration options for Highcharts pie chart
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'PieChart data',
    },
    series: [
      {
        name: 'Browsers',
        data: chartData,
      },
    ],
  };

  useEffect(() => {
    // You can also set up any additional configurations or options here
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
