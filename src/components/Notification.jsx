import React,{useState,useEffect} from "react";
import './notification.css';
function Notification({message,notificationclass,onDismiss})
{
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true); 
        }
    }, [message, notificationclass]); 

    const cancel = () => {
        setIsVisible(false);
        onDismiss();
    }
    const className = `notification ${notificationclass}`;
    if (!isVisible) return null;
    return (
        <div className={className}>
            <div className="notificationmessage">{message}</div>
            <button onClick={cancel} className="cancel">X</button>
        </div>
    )
}

export default Notification;