import React, { useState } from 'react';
import './index.css';
import Input from '../Input';
import Button from '../Button';
import { useTheme } from '../../ThemeContext';

function ForgotPassword({ onCloseModal }) {
    const [errors, setErrors] = useState({});
    const [inputUserValue, setInputUserValue] = useState('');
    const [inputMailIdValue, setInputMailIdValue] = useState('');
    const [inputTokenValue, setInputTokenValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    const [inputConfPassValue, setInputConfPassValue] = useState('');
    const [message, setMessage] = useState('');
    const link = process.env.REACT_APP_ACCESSLINK;
    
    const theme = useTheme();

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};

        if (!inputUserValue || inputUserValue === '') {
            newErrors.username = 'Username cannot be blank!';
            isValid = false;
        }
        
        if (!inputPassValue || inputPassValue === '') {
            newErrors.password = 'Password cannot be blank!';
            isValid = false;
        }

        if (!inputMailIdValue || inputMailIdValue === '') {
            newErrors.mailid = 'Mail Id cannot be blank!';
            isValid = false;
        }

        if (!inputTokenValue || inputTokenValue === '') {
            newErrors.token = 'Token cannot be blank!';
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

    const handleGenerateToken = async () => {
        setMessage('');
        setErrors({});
        if (!inputUserValue || !inputMailIdValue) {
            setErrors({
                username: !inputUserValue ? 'Username cannot be blank!' : '',
                mailid: !inputMailIdValue ? 'Mail Id cannot be blank!' : ''
            });
            return;
        }

        try {
            const response = await fetch(`${link}/generateToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputUserValue,
                    mailId: inputMailIdValue
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setErrors({ general: data.message });
            }
        } catch (error) {
            setErrors({ general: 'Error generating token. Please try again.' });
        }
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
                    username: inputUserValue,
                    newpassword: inputPassValue,
                    token: inputTokenValue
                }),
            });
            const data = await response.json();
            if (response.ok) {
                onCloseModal(data.message); 
            } else {
                setErrors({ general: data.message });
            }
        } catch (error) {
            setErrors({ general: 'Error resetting password. Please try again.' });
        }
    };

    return (
        <div className="changepassword-container">
            <div className="form-container">
                <form className="form-content" onSubmit={handleSubmit}>
                    <Input label="Username" type="text" value={inputUserValue} onChange={e => setInputUserValue(e.target.value)} placeholder="Enter UserName" />
                    <Input label="MailId" type="text" value={inputMailIdValue} onChange={e => setInputMailIdValue(e.target.value)} placeholder="Enter Mail Id" />
                    <Input label="Token" type="text" value={inputTokenValue} onChange={e => setInputTokenValue(e.target.value)} placeholder="Enter Generated Token" />
                    <Input label="Password" type="password" value={inputPassValue} onChange={e => setInputPassValue(e.target.value)} placeholder="Enter New Password" />
                    <Input label="Confirm Password" type="password" value={inputConfPassValue} onChange={e => setInputConfPassValue(e.target.value)} placeholder="Confirm New Password" />
                    {errors.username && <p className="error">{errors.username}</p>}
                    {errors.mailid && <p className="error">{errors.mailid}</p>}
                    {errors.token && <p className="error">{errors.token}</p>}
                    {errors.password && <p className="error">{errors.password}</p>}
                    {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
                    {errors.general && <p className="error">{errors.general}</p>}
                    {message && <p className="success">{message}</p>}
                    <div className="button-container">
                        <Button id="generatetoken" theme={ theme } type="button" onClick={handleGenerateToken}>Generate Token</Button>
                        <Button id="submit" theme={ theme } type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
