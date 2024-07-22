import React, { useState, useEffect } from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import Notification from '../../Notification';
import { useTheme } from '../../../ThemeContext';

function ExpandableTimetable() {
    const userdetails = useSelector((state) => state.login.user);
    const { username } = userdetails || {};
    const [days, setDays] = useState([]);
    const [message, setMessage] = useState("");
    const [notificationClass, setNotificationClass] = useState("");
    const theme = useTheme();
    const className = `main-${theme}`;
    const classNameEvents = `events-${theme}`;
    const classNameDayTitle = `day-title-${theme}`;
    const classNameDelete = `smallbutton button-${theme}`;
    const link = process.env.REACT_APP_ACCESSLINK;

    useEffect(() => {
        const fetchData = async () => {
            try {
            const url = `${link}/api/timetable/getByUser?user=${username}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDays(data);
          } catch (err) {
            setMessage("Failed to fetch timetable data");
            setNotificationClass("notificationerror");
          }
        };
        fetchData();
      }, [username,link]);

    const toggleDay = (index) => {
        const newDays = days.map((day, i) => {
            if (i === index) {
                return { ...day, isOpen: !day.isOpen };
            }
            return day;
        });
        setDays(newDays);
    };

    const deleteEvent = async (dayIndex, eventId) => {
        await deleteTimetable(eventId);
        fetchTimetable();
    };

    const fetchTimetable = async () => {
        try {
            const url = `${link}/api/timetable/getByUser?user=${username}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDays(data);
          } catch (err) {
            console.error("Failed to fetch data:", err);
          }
    };

    const deleteTimetable = async (eventId) => {
        try {
            const url = `${link}/api/timetable/delete/${eventId}`;
            const response = await fetch(url, { method: 'PUT' });
      
            if (!response.ok) {
                const errorMessage = await response.text(); 
                setNotificationClass("notificationerror");
                setMessage(`Error in deleting the timetable: ${errorMessage}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            setNotificationClass("notificationsuccess");
            setMessage(data.message);
        } catch (err) {
            setNotificationClass("notificationerror");
            setMessage("Error in deleting the timetable");
        }
    };
    

    const resetNotification = () => {
        setNotificationClass("");
        setMessage("");
    };

    return (
        <div className={className}>
            <h2>My TimeTable</h2>
            <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />
            {days.length > 0 ? (
                days.map((day, index) => (
                    <div key={day.day} className="day">
                        <button onClick={() => toggleDay(index)} className={classNameDayTitle}>
                            {day.day}
                        </button>
                        {day.isOpen && (
                            <div className={classNameEvents}>
                                {day.events.map(event => (
                                    <div key={event.id} className="event">
                                        <div>{ event.subject} - {event.convertTime} - {event.description}</div>
                                        <button onClick={() => deleteEvent(index, event.id)} className={classNameDelete}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="nodata">No timetable data found.</p>
            )}
        </div>
    );
}

export default ExpandableTimetable;
