import React from "react";
import "./index.css";
import Button from "../../Button";
import { useSelector } from 'react-redux';

function EventDisplay({ dataForDay, theme, deleteEvent }) {
    const userdetails = useSelector((state) => state.login.user);
    const { username } = userdetails || {};
    const deleteHandleEvent = (eventId) => {
        deleteEvent(eventId);
    }

    return (
        <div className="evedisplay-container">
            {dataForDay.map((event, index) => (
                <div key={index} className="event-card">
                    <div className="eve-header">
                        <h3>{event.title}</h3>
                        {!event.flag && (
                            <Button
                                theme={theme}
                                type="button"
                                onClick={() => deleteHandleEvent(event.eventId)}
                                disabled={event.createdBy !== username}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                    <p><strong>Date: </strong> {event.date}</p>
                    <p><strong>Time: </strong> {event.time}</p>
                    <p><strong>Description: </strong> {event.description}</p>
                    <p><strong>Created On: </strong> {event.createdOn.split('T')[0]}</p>
                    <p><strong>{ event.createdBy !== username ? `Assigned By : ` : `Created By : `}</strong>{ event.createdBy}</p>
                </div>
            ))}
        </div>
    );
}

export default EventDisplay;
