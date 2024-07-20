import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/SideBar.css';

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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handle date validation to ensure endDate is after startDate
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      if (new Date(value) <= new Date(endDate)) {
        setStartDate(value);
      } else {
        setModalMessage('Start date must be before end date');
        setShowModal(true);
      }
    } else if (name === 'endDate') {
      if (new Date(value) >= new Date(startDate)) {
        setEndDate(value);
      } else {
        setModalMessage('End date must be after start date');
        setShowModal(true);
      }
    }
  };

  const handleStartBackTesting = () => {
    if (!tickerName) {
      setModalMessage('Please enter a Ticker name');
      setShowModal(true);
      return;
    }
    onToggleRightSideBar({ tickerName, startDate, endDate });
  };

  return (
    <div className='container'>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
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
        <button onClick={handleStartBackTesting}>Start BackTesting</button>
      </div>
    </div>
  );
};

export default SideBar;
