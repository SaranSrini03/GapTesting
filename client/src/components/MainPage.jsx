import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import RightSideBar from './RightSideBar';

import '../styles/MainPage.css';

const MainPage = () => {
  
  
  
  const staticGraphData = [
    [0.1, 1],
    [0.2, 6],
    [0.3, 3],
    [0.4, 9],
    [0.5, 1],
    [0.6, 3],
    [0.7, 7],
    [0.8, 3],
  ];

  const staticPieChartData = [
    { name: 'Rate of Sucess', y: 30 },
    { name: 'Rate of Failure', y: 70 }
  ];

  const [showRightSideBar, setShowRightSideBar] = useState(false);
  const [tickerInfo, setTickerInfo] = useState({ tickerName: '', startDate: '', endDate: '' });
  const [gaugeData, setGaugeData] = useState(30); // Example gauge data

  const toggleRightSideBar = (info) => {
    setTickerInfo(info);
    setShowRightSideBar(prevState => !prevState);
  };

  const rectTexts = ['Number of Trades', 'Profitability Ratio', 'Volatility', 'Overal P&L Returns']; // Define your text content here
  const rectSubtitles = ['108.00', '43.52%', '0.74%', '-12.65%']; // Define your subtitle content here

  return (
    <div className='wholeContainer'>
      <SideBar onToggleRightSideBar={toggleRightSideBar} />
      <main className='mainContent'>
        
      </main>
      <RightSideBar 
        pieChartData={staticPieChartData} 
        show={showRightSideBar}
        graphData={staticGraphData}
        tickerName={tickerInfo.tickerName}
        startDate={tickerInfo.startDate}
        endDate={tickerInfo.endDate}
        rectTexts={rectTexts}
        rectSubtitles={rectSubtitles}
        gaugeData={gaugeData} // Pass gauge data here
      />
    </div>
  );
};

export default MainPage;
