import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';
import Input from "../../Input";
import Button from '../../Button';
import { useTheme } from '../../../ThemeContext';
import './index.css';
import moment from 'moment';
import axios from 'axios';
import { setTodayEvents } from '../../../redux/eventslice';

function CreateEventForm({ username, onCloseModal }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState({ hour: 0, minute: 0 });
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const link = process.env.REACT_APP_ACCESSLINK;
  const handleDateChange = (date) => {
    const updatedDate = new Date(date.setHours(time.hour, time.minute));
    setStartDate(updatedDate);
  };

  const handleTimeChange = event => {
    const { name, value } = event.target;
    const newValue = Number(value);

    if ((name === 'hour' && (newValue < 0 || newValue > 23)) || (name === 'minute' && (newValue < 0 || newValue > 59))) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `Invalid ${name}, must be within valid range`
      }));
    } else {
      setErrors(prevErrors => {
        const { [name]: _, ...rest } = prevErrors; // Remove error for the field
        return rest;
      });
      const newTime = { ...time, [name]: newValue };
      setTime(newTime);
      const updatedDate = new Date(startDate.setHours(newTime.hour, newTime.minute));
      setStartDate(updatedDate);
    }
  };

  const handleEventChange = event => {
    const eventname = event.target.value;
    setEventName(eventname);
  }

  const handleDescChange = event => {
    const description = event.target.value;
    setDescription(description);
  }

  const validateForm = () => {
    const newErrors = {};
    if (!eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Event description is required';
    }
    if (time.hour < 0 || time.hour > 23) {
      newErrors.hour = 'Hour must be between 0 and 23';
    }
    if (time.minute < 0 || time.minute > 59) {
      newErrors.minute = 'Minute must be between 0 and 59';
    }
    return newErrors;
  }

  const sendDataToAPI = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    var formattedDate = moment(startDate).format('YYYY-MM-DD');
    var formattedTime = moment(startDate).format('HH:mm');
    const createdBy = username;
    var scheduledDateTime = formattedDate + "T" + formattedTime;
    
    try { 
      const response = await axios.post(`${link}/api/events/submit`, {
        username: createdBy,
        eventName,
        desc: description,
        scheduledDateTime: scheduledDateTime
      });

      if (response.status === 201) {
        onCloseModal(response.data);
        fetchTodayEventData();
      }
    } catch (error) {
      if (error.response) {
        onCloseModal(error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const fetchTodayEventData = async () => {
    try {
      const url = `${link}/api/events/today?user=${username}`;
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

  return (
    <div className="event-container">
      <Input 
        label="Event Name" 
        name="eventname" 
        type="text" 
        value={eventName} 
        onChange={handleEventChange} 
        placeholder="Enter Event Name" 
      />
      {errors.eventName && <p className="error">{errors.eventName}</p>}
      
      <Input 
        label="Enter Description" 
        name="desc" 
        type="text" 
        value={description} 
        onChange={handleDescChange} 
        placeholder="Enter Description" 
      />
      {errors.description && <p className="error">{errors.description}</p>}
      
      <div className="input-container">
        <label className="input-label">Enter Schedule Time</label>
        <div className="datetime-container">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
          />
          <div className='sub-time'>
            <Input 
              type="number" 
              name="hour" 
              value={time.hour} 
              onChange={handleTimeChange} 
              min="0" 
              max="23" 
            />
            {errors.hour && <p className="error">{errors.hour}</p>}
            <span>:</span>
            <Input 
              type="number" 
              name="minute" 
              value={time.minute} 
              onChange={handleTimeChange} 
              min="0" 
              max="59" 
            />
            {errors.minute && <p className="error">{errors.minute}</p>}
          </div>
        </div>
      </div>
      
      <Button theme={theme} type="button" onClick={sendDataToAPI}>Submit</Button>
    </div>
  );
}

export default CreateEventForm;
