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
          backgroundColor: 'rgba(0,0,0,0)',
          responsive: {
            rules: [{
              condition: {
                maxWidth: 100
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
          },
          gridLineWidth: 0,
        },
        yAxis: {
          title: {
            text: yAxisTitle
          },
          gridLineWidth: 0, 
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

  return <div ref={chartRef} style={{ width: '80%', height: '380px' }} />;
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
