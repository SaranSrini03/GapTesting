// HighchartsGraph.js

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';

const HighchartsGraph = ({ title, data, xAxisTitle, yAxisTitle }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'line',
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        },
        title: {
          text: title
        },
        xAxis: {
          title: {
            text: xAxisTitle
          }
        },
        yAxis: {
          title: {
            text: yAxisTitle
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: ' units'
        },
        series: [{
          name: 'Sample Data',
          data: data
        }]
      });
    }
  }, [title, data, xAxisTitle, yAxisTitle]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

HighchartsGraph.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string
};

HighchartsGraph.defaultProps = {
  title: 'Sample Chart',
  xAxisTitle: 'X Axis',
  yAxisTitle: 'Y Axis'
};

export default HighchartsGraph;
