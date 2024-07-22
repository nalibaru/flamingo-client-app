import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Input from "../../Input";
import Button from '../../Button';
import { useTheme } from '../../../ThemeContext';
import './index.css';
import axios from 'axios';
import Select from '../../Select';
import { useDispatch } from "react-redux";
import { setTimeTableData } from "../../../redux/timeslice";

function CreateTimeTableForm({ username, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [errors, setErrors] = useState({});
  const link = process.env.REACT_APP_ACCESSLINK;
  
  const handleSubjectChange = event => {
    setSubject(event.target.value);
  }

  const handleDescChange = event => {
    setDescription(event.target.value);
  }

  const handleScheduledTimeChange = event => {
    setScheduledTime(event.target.value);
  }

  const handleOpenTimeChange = event => {
    setOpenTime(event.target.value);
  }

  const handleCloseTimeChange = event => {
    setCloseTime(event.target.value);
  }
  
  const handleDayChange = event => {
    setDay(event.target.value);
  }

  const validateForm = () => {
    const newErrors = {};
   
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!day.trim()) {
      newErrors.day = 'Day is required';
    }
    if (!scheduledTime.trim()) {
      newErrors.scheduledTime = 'Scheduled time is required';
    }
    if (!openTime.trim()) {
      newErrors.openTime = 'Open time is required';
    }
    if (!closeTime.trim()) {
      newErrors.closeTime = 'Close time is required';
    }
    return newErrors;
  }

  const sendDataToAPI = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const createdBy = username;
    const dataday = day || "Sunday";
    const subjectdata = subject || "English";
    try { 
      const response = await axios.post(`${link}/api/timetable/submit`, {
        subject: subjectdata,
        createdBy,
        desc: description,
        scheduledTime: scheduledTime,
        openTime: openTime,
        closeTime: closeTime,
        day: dataday
      });

      if (response.status === 201) {
        onCloseModal(response.data);
        fetchCurrentTimeTableData();
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

  const fetchCurrentTimeTableData = async () => {
    try {
      const url = `${link}/api/timetable/get/all?user=${username}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setTimeTableData(data));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  const options = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' }
  ];

  const subjects = [
    { value: 'English', label: 'English' },
    { value: 'Maths', label: 'Maths' },
    { value: 'Science', label: 'Science' },
    { value: 'Social', label: 'Social' },
    { value: 'Football', label: 'Football' },
    { value: 'Skating', label: 'Skating' },
    { value: 'French', label: 'French' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'GK', label: 'General Knowledge' }
  ];

  return (
    <div className="timetable-container">
      <Select label="Select day" options={options} defaultValue="Sunday" onChange={handleDayChange} />
      {errors.day && <p className="error">{errors.day}</p>}
      <Select label="Select Subject" options={subjects} defaultValue="English" onChange={handleSubjectChange} />
      {errors.subject && <p className="error">{errors.subject}</p>}
      <Input label="Description" name="desc" type="text" value={description} onChange={handleDescChange} placeholder="Enter Time with start and End with :" />
      {errors.description && <p className="error">{errors.description}</p>}
      <Input label="Scheduled Time" name="scheduledTime" type="text" value={scheduledTime} onChange={handleScheduledTimeChange} placeholder="Enter Title" />
      {errors.scheduledTime && <p className="error">{errors.scheduledTime}</p>}
      <Input label="Open Time" name="openTime" type="time" value={openTime} onChange={handleOpenTimeChange} placeholder="Enter Title" />
      {errors.openTime && <p className="error">{errors.openTime}</p>}
      <Input label="Close Time" name="closeTime" type="time" value={closeTime} onChange={handleCloseTimeChange} placeholder="Enter Title" />
      {errors.closeTime && <p className="error">{errors.closeTime}</p>}
      <Button theme={theme} type="button" onClick={sendDataToAPI}>Submit</Button>
    </div>
  );
}

export default CreateTimeTableForm;
