import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/gauge'; // Import gauge chart module
import 'echarts/lib/component/title'; // Import title component

const GaugeChart = ({ gaugeData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      // Initialize ECharts instance
      const myChart = echarts.init(chart);

      // Set chart options with color gradient and dial customization
      myChart.setOption({
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        series: [{
          name: 'Value',
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 10, // Number of splits
          axisLine: {
            lineStyle: {
              width: 20, // Adjust width if needed
              color: [
                [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#FF0000' }, // Start color (Red)
                  { offset: 0.5, color: '#FFA500' }, // Middle color (Orange)
                  { offset: 1, color: '#00FF00' }  // End color (Green)
                ])]
              ]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            length: 0
          },
          title: {
            show: false
          },
          detail: {
            formatter: '{value} %',
            color: '#000'
          },
          pointer: {
            itemStyle: {
              color: '#000' // Set the color of the dial/needle here
            }
          },
          data: [{ value: gaugeData, name: 'Value' }]
        }]
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        myChart.resize();
      });

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', () => {
          myChart.resize();
        });
      };
    }
  }, [gaugeData]);

  return (
    <div className='gaugeContainer' style={{ width: '400px', height: '400px' }}> {/* Increase size here */}
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default GaugeChart;
