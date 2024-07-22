import React from 'react';
import "./index.css";

const Select = ({label, options, defaultValue, onChange }) => {
    return (
    <div className="select-container">
    {label && <label className="select-label">{label} </label>} 
    <select  className="select" defaultValue={defaultValue} onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
            </select>
            </div>
  );
};

export default Select;