import React from 'react';
import './index.css'; // Import the CSS for styling

const Checkbox = ({ theme, label, checked, onChange }) => {
    const className = `checkmark checkmark-${theme}`;
  return (
    <label className="checkbox-container">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={className}></span>
    </label>
  );
};

export default Checkbox;