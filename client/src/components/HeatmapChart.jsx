import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/heatmap'; // Import heatmap chart module
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/tooltip'; // Import tooltip component

const HeatmapChart = ({ data, titleText }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      // Initialize ECharts instance
      const myChart = echarts.init(chart);

      // Set chart options
      myChart.setOption({
        title: {
          text: titleText || 'Heatmap Chart Title',
          left: '25%',
          top: '30%',
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000'
          }
        },
        tooltip: {
          position: 'bottom'
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '40%'
        },
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        },
        yAxis: {
          type: 'category',
          data: ['1', '2','3']
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ['grey', 'black']
          }
        },
        series: [{
          name: 'Heatmap Data',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          }
        }]
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
  }, [data, titleText]);

  return (
    <div className='heatmapContainer' style={{ width: '500px', height: '500px' }}> {/* Increased size */}
      <div ref={chartRef} style={{ width: '90%', height: '90%' }} />
    </div>
  );
};

export default HeatmapChart;
