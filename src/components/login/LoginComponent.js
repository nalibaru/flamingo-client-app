import React, { useState } from "react";
import { checkAuthentication } from '../../services/authService';
import './index.css';
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../.././ThemeContext';
import Notification from '../Notification';
import { loginSuccess, loginFailure } from "../../redux/loginslice";
import { setProfileData } from "../../redux/profileslice";
import ModalComponent from "../ModalComponent";
import ForgotPassword from "./ForgotPassword";

function LoginComponent()
{
    const [message, setMessage] = useState();
    const [notificationClass, setNotificationClass] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const theme = useTheme();
    const classNameForm = `form-container-${theme}`;    
    const [userNameValue, setUserNameValue] = useState();
    const [inputpassValue, setInputpassValue] = useState();
    const [title, setTitle] = useState();
    
    const handleModal = (data) => {
        if(data)
        {
          setNotificationClass("notificationsuccess");
        }
        handleCloseModal();
    } 
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
      }

    const validateField = (name, value) => {
        let errorMsg = '';
        if (!value || value === '') {
            errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be blank!`;
        }
        return errorMsg;
    };

    const handleuserNameChange = (e) => {
      
        const value = e.target.value;
        setUserNameValue(value);
        setErrors(prevErrors => ({ ...prevErrors, name: validateField('name', value) }));
    } 

    const handlePasswordChange = (e) => {
        
        const value = e.target.value;
        setInputpassValue(value);
        setErrors(prevErrors => ({ ...prevErrors, password: validateField('password', value) }));
    }

    
    const handleForgotPassword = () => {
        setTitle("Forgot Password");
        setIsModalOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        
        if (Object.keys(newErrors).length === 0) {
        try {
            const authResult = await checkAuthentication(userNameValue, inputpassValue);
            if (authResult && authResult.message === "Authentication successful") {
                dispatch(loginSuccess(authResult)); 
                dispatch(setProfileData(authResult.profilepic));
                navigate('/dashboard'); 
          } else {
                setErrors({ ...errors, message: authResult.message });
                
              dispatch(loginFailure(authResult.message)); 
              setMessage(authResult.message);
              setNotificationClass("notificationerror");
          }
        } catch (err) {
            setErrors({ ...errors, message: "Failed to authenticate" });
            setMessage("Failed to authenticate");
            setNotificationClass("notificationerror");
            dispatch(loginFailure("Failed to authenticate")); 
        }
        } else {
        setErrors(newErrors);
        }
    };
    
    const findFormErrors = () => {
        const name = userNameValue;
        const password = inputpassValue;
        const newErrors = {};
        
        if (!name || name === '' || name === undefined) newErrors.name = 'Name cannot be blank!';
        if (!password || password === '' || password === undefined) newErrors.password = 'Password cannot be blank!';
        return newErrors;
        };
            
     const resetNotification = () => {
         setMessage("");
         setNotificationClass("");
        };
        
    
    return (
      <div className="login-container">
            {message && <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />}
            <div id="loginheader-container">
            <img id="logoimg" src="/flamingo.png" alt="Logo" />
                    <h1 id="header-container">FlaMinGo App</h1>
            </div>
            <div className={classNameForm}>
                <form id="form-container-id" className="form-content" onSubmit={handleSubmit}>
                    <h2> Login </h2>
                    <p>Welcome {userNameValue} !!!</p>
                    <hr></hr>
                <Input label="Username"  name="name" type="text" value={userNameValue} onChange={handleuserNameChange} placeholder="Enter UserName" />
                {errors.name && <p className="error">{errors.name}</p>}
                <Input label="Password"  name="password" type="password" value={inputpassValue} onChange={handlePasswordChange} placeholder="Enter Password" />
                {errors.password && <p className="error">{errors.password}</p>}
                <div class="button-container">
                        <Button theme={theme} type="submit">Login</Button> 
                        <Button theme={theme} type="button" onClick={handleForgotPassword}>Forgot Password</Button> </div>
            </form>
            </div>
            <ModalComponent
            title={title}
            theme={theme}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            showFooter={false}>
            <ForgotPassword onCloseModal={handleModal} />
        </ModalComponent>
        </div> 
    )
}

export default LoginComponent;