import React, { useState } from 'react';
import SideBar from './SideBar';
import RightSideBar from './RightSideBar';
import '../styles/MainPage.css';

const MainPage = () => {
  const staticGraphData = [
    [Date.now() - 1000000000, 100],
    [Date.now() - 800000000, 110],
    [Date.now() - 600000000, 120],
    [Date.now() - 400000000, 130],
    [Date.now() - 200000000, 140],
    [Date.now(), 150]
  ];

  const staticPieChartData = [
    { name: 'Sample Data 1', y: 30 },
    { name: 'Sample Data 2', y: 70 }
  ];

  const [showRightSideBar, setShowRightSideBar] = useState(false);

  const toggleRightSideBar = () => {
    setShowRightSideBar(prevState => !prevState);
  };

  return (
    <div className='wholeContainer'>
      <SideBar onToggleRightSideBar={toggleRightSideBar} />
      <RightSideBar 
        pieChartData={staticPieChartData} 
        show={showRightSideBar}
      />
    </div>
  );
};

export default MainPage;
