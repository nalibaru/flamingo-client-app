import React, { useEffect, useState } from "react";
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { setTodayEvents } from "../../../redux/eventslice";
import { useTheme } from "../../../ThemeContext";

function ViewTodayEvents() {
    const dispatch = useDispatch();
    const userdetails = useSelector((state) => state.login.user);
    const { username } = userdetails || {};
    const theme = useTheme();
    const className = `latest-files latest-files-${theme}`;
    const todayEvents = useSelector((state) => state.event.data);
    const link = process.env.REACT_APP_ACCESSLINK;
    useEffect(() => {
        async function fetchData() {
            try {
                const url = `${link}/api/events/today?user=`+username;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(setTodayEvents(data));
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        }
        fetchData();
    }, [username, dispatch]); 
    
    return (
        <div className={className}>
            <h3>View Today Events</h3>
            <hr />
            <ul>
                {todayEvents && todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                        <li key={event.eventId}>{event.eventName}</li>
                    ))
                ) : (
                    <p className="nodata">No Events for today</p>
                )}
            </ul>
        </div>
    );
}

export default ViewTodayEvents;
