import React, { useEffect,useState,Fragment } from "react";
import './index.css';
import { useTheme } from './ThemeContext';
import  ThemeComponent  from "./components/other/theme/ThemeComponent";
import { useSelector, useDispatch } from "react-redux";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "./redux/loginslice";
import kalkinImage from './images/kalkin.jpeg';
function Header() {
    const imageLink = process.env.REACT_APP_ACCESSIMAGELINK;
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();   
    const imageData = useSelector((state) => state.profile.data);
    const userdetails = useSelector((state) => state.login.user);
    const { firstName, lastName, profilepic,lastLoggedIn,role } = userdetails;
    const imageUrl = imageData?.url;
    const profilePicLink = `${imageLink}`+profilepic;
    const actImage = profilePicLink;
    const [imageSrc, setImageSrc] = useState(actImage);
    const className = `headermain headermain-${theme}`;
    const isAuthenticate = useSelector((state) => state.login.isAuthenticated);
  
   
    const handleImageError= () => {
        setImageSrc(kalkinImage);
    } 

    useEffect(() =>
    {  
       setImageSrc(imageUrl || actImage);
    }, [imageUrl])

    useEffect(() => {
        //alert(`${imageLink}${profilepic}`);
        if (profilepic) {
            setImageSrc(`${imageLink}${profilepic}`);
        } else if(imageUrl) {
            setImageSrc(imageUrl);
        }
        else {
            setImageSrc(kalkinImage);
        }
    }, [profilepic, imageLink,imageSrc]);

    const loginClick = () => {
        navigate('/login'); 
    }

    const logoutClick = () => {
        dispatch(logout);
        navigate('/login');
    }


    return (
        <Fragment><div className={className}>
            <div className="subheader">
            <div className="imagedetails">
                    <img src={imageSrc} alt="profileimage" onError={handleImageError} />    
                </div>
                <div className="headerdetails">
                    <h2 className="appheader1">{firstName} {lastName}</h2>
                    <h5 className="appheader2">{role}</h5>
                    <h5 className="appheader2">{lastLoggedIn}</h5>
                </div>     
            </div>
            <div className="logo-header">
                <img id="flamingo-header" src="flamingo.png" alt="Logo"></img>
                <div className="headerdetails">
                    <h2 className="appheader1">FlaMinGo</h2>
                    <h3 className="appheader2">Day App</h3>
                </div> 
            </div>
            <div className="theme-login-container">
                <ThemeComponent/>
                <div className="buttondetails">
                {!isAuthenticate ? <Button theme={theme} type="button" onClick={loginClick}>Login</Button> : <Button theme={theme} type="button" onClick={logoutClick}>Log out</Button>}
            </div>
            </div>
        </div>
        </Fragment>
    );
}

export default Header;
