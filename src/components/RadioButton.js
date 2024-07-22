import React from 'react';
import './index.css'; 

const RadioButton = ({ label, theme, name, value, checked, onChange }) => {
    const className = `radio-checkmark ${theme}`;
  return (
    <label className="radio-container">
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
          <span className={className}></span>
    </label>
  );
};

export default RadioButton;