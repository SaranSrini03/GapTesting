import React, { useEffect, useState } from 'react';
import PieChart from './PieChart'; // Import the PieChart component
import '../styles/RightSideBar.css';
import HighchartsGraph from './HighCharts';
import PropTypes from 'prop-types';

const RightSideBar = ({ pieChartData, show }) => {
  const [showRects, setShowRects] = useState([false, false, false, false]); // State to manage the visibility of .rect elements

  useEffect(() => {
    if (show) {
      const timeouts = showRects.map((_, index) =>
        setTimeout(() => {
          setShowRects(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }, (index + 1) * 100) // Stagger each animation by 100ms
      );

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    } else {
      setShowRects([false, false, false, false]); // Hide rects when not visible
    }
  }, [show]);

  return (
    <div className={`container2 ${show ? 'show' : 'hide'}`}>
      <p className='rightP'>Intraday Trading Strategy Backtest</p>
      <p className='p2'>Key Metrics</p>
      <div className='rectContainer'>
        {showRects.map((isShown, index) => (
          <div key={index} className={`rect ${isShown ? 'show' : ''}`}></div>
        ))}
      </div>
      <div className='bottomdiv'>
        <div className='graphContainer'>
          <HighchartsGraph 
            title="Performance Over Time" 
            xAxisTitle="Time" 
            yAxisTitle="Metrics" 
            data={[1, 2, 3, 4, 5]} // Example data, replace as needed
          />
        </div>
        <div className='piechartContainer'>
          <PieChart chartData={pieChartData} />
        </div>
      </div>
    </div>
  );
};

RightSideBar.propTypes = {
  pieChartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  show: PropTypes.bool.isRequired, // Add show prop to control visibility
};

RightSideBar.defaultProps = {
  pieChartData: [
    { name: 'Chrome', y: 61.41 },
    { name: 'Firefox', y: 11.84 },
    { name: 'Edge', y: 10.85 },
    { name: 'Safari', y: 4.67 },
    { name: 'Opera', y: 4.18 },
    { name: 'Others', y: 7.05 },
  ],
  show: false,
};

export default RightSideBar;
