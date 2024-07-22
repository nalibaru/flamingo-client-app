import React from "react";
import './index.css';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useSelector } from 'react-redux';
function SideContent() {
    const theme = useTheme();
  const classNameWithTheme = `sidecontent sidecontent-${theme}` 
  const userdetails = useSelector((state) => state.login.user);
  const {accesslevel} = userdetails || {};
    return (
        <div className={classNameWithTheme} >
           <ul>
        <li>
          <Link to="/dashboard"><i className={`fas fa-home ${theme}`}></i> Dashboard</Link>
        </li>
        <li>
          <Link to="/user"><i className={`fas fa-users ${theme}`}></i> User Module</Link>
        </li>
        <li>
          <Link to="/mocktest"><i className={`fas fa-file-alt ${theme}`}></i> MockTest</Link>
        </li>
          {accesslevel === 1 ?
            <> <li>
              <Link to="/timetable"><i className={`fas fa-calendar-alt ${theme}`}></i> TimeTable</Link>
        </li>
        <li>
          <Link to="/calendar"><i className={`fas fa-calendar-day ${theme}`}></i> Calendar</Link>
         
        </li>
             </>
           : ``}
      </ul>
        </div>
    );
}

export default SideContent;