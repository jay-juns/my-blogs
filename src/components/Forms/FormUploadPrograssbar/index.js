import React, { useEffect } from 'react';
import useStorage from './../../../customHooks/useStorage';
import './styles.scss';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></div>
  );
} 

export default ProgressBar;