import React from 'react';
import './index.css';  // Import the CSS file

const Input = ({ label, type, name, value, onChange, placeholder, min, max }) => {
  const numberProps = type === 'number' ? { min, max } : {};
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        {...numberProps}
      />
    </div>
  );
};

export default Input;