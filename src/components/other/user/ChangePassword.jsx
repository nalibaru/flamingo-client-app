import React, { useState } from 'react';
import './index.css';
import Notification from '../../Notification';
import Input from '../../Input';
import Button from '../../Button';
import { useTheme } from '../../../ThemeContext';

function ChangePassword({ username, onCloseModal }) {
    const [message, setMessage] = useState('');
    const [notificationClass, setNotificationClass] = useState('');
    const [errors, setErrors] = useState({});
    const [inputPassValue, setInputPassValue] = useState('');
    const [inputConfPassValue, setInputConfPassValue] = useState('');
    const link = process.env.REACT_APP_ACCESSLINK;
    const theme = useTheme();

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};

        if (!inputPassValue || inputPassValue === '') {
            newErrors.password = 'Password cannot be blank!';
            isValid = false;
        }

        if (!inputConfPassValue || inputConfPassValue === '') {
            newErrors.confirmpassword = 'Confirm Password cannot be blank!';
            isValid = false;
        }

        if (inputPassValue !== inputConfPassValue) {
            newErrors.confirmpassword = 'Passwords do not match!';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  

        if (!validateFields()) return; 

        try {
            const response = await fetch(`${link}/resetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    newpassword: inputPassValue
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setNotificationClass('success');
                onCloseModal(data.message); 
            } else {
                setMessage(data.message || 'Failed to change password');
                setNotificationClass('error');
            }
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
            setNotificationClass('error');
        }
    };

    const resetNotification = () => {
        setMessage('');
        setNotificationClass('');
        setErrors({});
    };

    return (
        <div className="changepassword-container">
            {message && <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />}
            <div className="form-container">
                <form className="form-content" onSubmit={handleSubmit}>
                    <Input label="Username" type="text" value={username} disabled />
                    <Input label="Password" type="password" value={inputPassValue} onChange={e => setInputPassValue(e.target.value)} placeholder="Enter New Password" />
                    <Input label="Confirm Password" type="password" value={inputConfPassValue} onChange={e => setInputConfPassValue(e.target.value)} placeholder="Confirm New Password" />
                    {errors.password && <p className="error">{errors.password}</p>}
                    {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
                    <div className="button-container">
                        <Button theme={ theme } type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
