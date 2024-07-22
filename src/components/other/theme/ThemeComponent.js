import React, { useState, useEffect } from "react";
import './index.css';
import { useUpdateTheme } from '../../../ThemeContext';
import { useSelector } from 'react-redux';
import Select from "../../Select";
import axios from 'axios';


function ThemeComponent() {
  const changeTheme = useUpdateTheme();
  const userdetails = useSelector((state) => state.login.user);
  const { username, theme } = userdetails || {};
  const [themeValue, setThemeValue] = useState(''); 
  const link = process.env.REACT_APP_ACCESSLINK;
 
  useEffect(() => {
    if (theme) {
      setThemeValue(theme); 
    } else {
      setThemeValue('light'); 
    }
  }, [theme]);

  const handleSelectChange = async (event) => {
    const newTheme = event.target.value;
    setThemeValue(newTheme);
    changeTheme(newTheme);
    await saveThemeToBackEnd(newTheme); 
  };

  const options = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'greenary', label: 'Nature Theme' },
    { value: 'blue', label: 'Ocean Theme' }
  ];

  const saveThemeToBackEnd = async (theme) => {
    const createdBy = username;
    try {
      await axios.post(`${link}/api/theme/save`, {
        username: createdBy,
        themeName: theme
      });
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <>
      <Select
        options={options}
        value={themeValue}
        onChange={handleSelectChange}
      />
    </>
  );
}

export default ThemeComponent;

