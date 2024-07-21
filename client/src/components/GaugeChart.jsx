import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GaugeChart = ({ gaugeData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      // Initialize ECharts instance
      const myChart = echarts.init(chart);

      // Set chart options with updated configuration
      myChart.setOption({
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: 'black'
            },
            progress: {
              show: true,
              width: 20 // Reduced width for the progress
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20 // Reduced width for the axis line
              }
            },
            axisTick: {
              distance: -30, // Adjusted distance
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#999'
              }
            },
            splitLine: {
              distance: -35, // Adjusted distance
              length: 10, // Reduced length
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -15, // Adjusted distance
              color: 'black',
              fontSize: 15 // Reduced font size
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '70%', // Reduced width
              lineHeight: 25, // Adjusted line height
              borderRadius: 8,
              offsetCenter: [0, '-10%'], // Adjusted offset
              fontSize: 25, // Reduced font size
              fontWeight: 'bolder',
              formatter: '{value}%',
              color: 'inherit'
            },
            data: [{ value: gaugeData }]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: 'gray'
            },
            progress: {
              show: true,
              width: 6 // Reduced width for the progress
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: gaugeData }]
          }
        ]
      });

      // Handle window resize
      const handleResize = () => {
        myChart.resize();
      };
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [gaugeData]);

  return (
    <div className='gaugeContainer' style={{ width: '450px', height: '450px' }}> {/* Reduced size */}
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default GaugeChart;
