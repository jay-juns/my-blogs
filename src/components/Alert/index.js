import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import './styles.scss';

const Alert = ({ text, color, hideAlert }) => {

  const [exit, setExit] = useState(!hideAlert);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 10);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(hideAlert);
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return ReactDom.createPortal(
    <>
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer} 
      className={`notification-items ${color} ${exit ? "exit" : ""}`}
    >
      <p>{text}</p>
      <div className={`bar ${color}`} style={{ width: `${width}%` }} />
    </div>
    </>,
    document.getElementById('portal')
  );
};

export default Alert;