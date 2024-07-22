import React from 'react';
import './index.css';

function ProgressBar({progress}) {
   
    const percentage = (progress);
    let backgroundColor;
    if (percentage < 50) {
      backgroundColor = '#8B0000'; 
      } else {
        backgroundColor = '#00008B';
      }
    const progressBarStyle = {
      backgroundColor, 
      width: `${percentage}%` 
     };

    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={ progressBarStyle } />
      </div>
    );
    }


export default ProgressBar;