import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ lineData, xAxisData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const myChart = echarts.init(chart);

      const option = {
        title: {
          text: 'Line Chart',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: lineData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#000'
          },
          itemStyle: {
            
            opacity:0
          }
        }]
      };

      myChart.setOption(option);

      window.addEventListener('resize', () => {
        myChart.resize();
      });

      return () => {
        window.removeEventListener('resize', () => {
          myChart.resize();
        });
      };
    }
  }, [lineData, xAxisData]);

  return (
    <div className='lineContainer' style={{ width: '100%', height: '400px' }}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LineChart;
