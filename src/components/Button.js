import React from 'react';
import './index.css';  // Assuming the CSS file is correctly imported

const Button = ({ theme, children, onClick, type, disabled }) => {
  let className = `button button-${theme}`;
  
  if (disabled) {
    className += ' disabled'; 
  }
 
  return (
    <button  className={className} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
