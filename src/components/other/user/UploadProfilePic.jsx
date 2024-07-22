import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import 'react-quill/dist/quill.snow.css'; 
import { setImageData } from '../../../redux/profileslice';
import Notification from '../../Notification';
import Input from '../../Input';
import { useTheme } from '../../../ThemeContext';
function UploadProfilePic() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [notificationClass, setNotificationClass] = useState("");
    const className = `form-data-${theme}`;
    const userdetails = useSelector((state) => state.login.user);
    const {username} = userdetails || {};
    const link = process.env.REACT_APP_ACCESSLINK;
      const handleImage = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        if (!file.type.startsWith('image/')) {
            setMessage("Unsupported file type. Please upload an image.");
            setNotificationClass("notificationerror");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
    
        fetch(`${link}/upload?user=${username}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dispatch(setImageData(data));
            setMessage(data.message);
            setNotificationClass("notificationsuccess");
        })
        .catch((error) => {
            setMessage("Upload failed!");
            setNotificationClass("notificationerror");
        });
    };
        
     const resetNotification = () => {
        setMessage("");
        setNotificationClass("");
    };

    return (
        <div className="uploadpic">
            {message && <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />}
            <h3>Upload Picture</h3>         
            <form method="post" className={className}>
                <Input type="file" name="image" onChange={handleImage} accept="image/*" />
            </form>  
        </div>
    )
}

export default UploadProfilePic;