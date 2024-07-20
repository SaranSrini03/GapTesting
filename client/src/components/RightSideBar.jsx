import React, { useEffect, useState } from 'react';
import PieChart from './PieChart'; // Import the PieChart component
import GaugeChart from './GaugeChart'; // Import the GaugeChart component
import '../styles/RightSideBar.css';
import HighchartsGraph from './HighCharts';
import PropTypes from 'prop-types';

const RightSideBar = ({ pieChartData, show, graphData, tickerName, startDate, endDate, rectTexts, rectSubtitles, gaugeData }) => {
  const [showRects, setShowRects] = useState([false, false, false]); // State to manage the visibility of .rect elements

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
      setShowRects([false, false, false]); // Hide rects when not visible
    }
  }, [show]);

  return (
    <div className={`container2 ${show ? 'show' : 'hide'}`} aria-hidden={!show}>
      <p className='rightP'>Intraday Trading Strategy Backtest</p>
      <p className='p2'>Key Metrics - {tickerName ? tickerName : 'Please enter a ticker name'}{startDate && endDate ? ` (${startDate} - ${endDate})` : ''}</p>
      <div className='rectContainer'>
        {showRects.map((isShown, index) => (
          <div key={index} className={`rect ${isShown ? 'show' : ''}`}>
            <div className='rectText'>{rectTexts[index]}</div>
            <div className='rectSubtitle'>{rectSubtitles[index]}</div>
          </div>
        ))}
      </div>
      <div className='bottomdiv'>
        <div className='graphContainer'>
          <HighchartsGraph 
            title="Performance Over Time" 
            xAxisTitle="Time" 
            yAxisTitle="Metrics" 
            data={graphData} // Use dynamic graph data
          />
        </div>
        <div className='gaugeContainer'>
          <GaugeChart gaugeData={gaugeData} /> {/* Add GaugeChart here */}
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
  show: PropTypes.bool.isRequired,
  graphData: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickerName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  rectTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
  rectSubtitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  gaugeData: PropTypes.number.isRequired, // Add gaugeData prop for GaugeChart
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
  graphData: [1, 2, 3, 4, 5], // Default graph data
  tickerName: '',
  startDate: '',
  endDate: '',
  rectTexts: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'], // Default texts
  rectSubtitles: ['Subtitle 1', 'Subtitle 2', 'Subtitle 3', 'Subtitle 4'], // Default subtitles
  gaugeData: 50, // Default gauge data
};

export default RightSideBar;
