import React, { useEffect } from 'react';
import './index.css'; // Import your CSS for styling

const ModalComponent = ({ title, theme, isOpen, onClose, children, showFooter, onCancel, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
     
      document.body.style.overflow = 'hidden';
    } else {
      
      document.body.style.overflow = 'auto';
    }
   
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null; 
  }

  const classNameheader = `modal-header ${theme}`;
  const classNamesubheader = `modal-subheader ${theme}`;
  const classNamefooter = `modal-footer ${theme}`;
  const className = `button button-${theme}`;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className={classNameheader}>
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className={classNamesubheader}>
          {children}
        </div>
        {showFooter && (
          <div className={classNamefooter}>
            <div className='button-container'>
              <button id={theme} className={className} onClick={onCancel}>Cancel</button>
              <button id={theme} className={className} onClick={onConfirm}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
