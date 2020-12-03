import React, { useState } from "react";
import './styles.scss';

const Alert = ({ alertClass, message }) => {
  const [exit, setExit] = useState(false);
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
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
  };

  React.useEffect(() => {
    if (width === 100) {
      
      handleCloseNotification()
    }
    
  }, [width])

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer} 
      className={`${alertClass} ${exit ? "exit" : ""}`}
    >
      <p>{message}</p>
      <div className={"bar error"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Alert;