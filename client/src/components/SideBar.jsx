import React, { useState } from 'react';
import '../styles/SideBar.css';
import RightSideBar from './RightSideBar';

const SideBar = ({ onToggleRightSideBar }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getTenYearsBeforeDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 10);
    return formatDate(today);
  };

  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  const [tickerName, setTickerName] = useState('');
  const [startDate, setStartDate] = useState(getTenYearsBeforeDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  // Handle date validation to ensure endDate is after startDate
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      if (new Date(value) <= new Date(endDate)) {
        setStartDate(value);
      } else {
        alert('Start date must be before end date');
      }
    } else if (name === 'endDate') {
      if (new Date(value) >= new Date(startDate)) {
        setEndDate(value);
      } else {
        alert('End date must be after start date');
      }
    }
  };

  return (
    <div className='container'>
      <div className='valueContainer'>
        <h1>Input Parameters</h1>
        <p>Enter Ticker Name</p>
        <input
          type="text"
          placeholder='AAPL'
          value={tickerName}
          onChange={(e) => setTickerName(e.target.value)}
        />
        <p>Start Date</p>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
        />
        <p>End Date</p>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
        />
        <button onClick={onToggleRightSideBar}>Toggle Right Sidebar</button>
      </div>
    </div>
  );
};

export default SideBar;
