import React, { useEffect } from "react";
import './index.css';
import { setTimeTableData } from "../../../redux/timeslice";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from "../../../ThemeContext";

function TimeTableComponent() {
  const timetableData = useSelector((state) => state.timetable.data);
  const userdetails = useSelector((state) => state.login.user);
  const { username } = userdetails || {}; 
  const theme = useTheme();
  const dispatch = useDispatch();
  const weeklySchedule = `weeklySchedule-${ theme }`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = process.env.REACT_APP_ACCESSLINK;
        const url = `${link}/api/timetable/get/all?user=${username}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setTimeTableData(data));
        highlightTodayColumn();
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [username, dispatch]); 

  const highlightTodayColumn = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()]; 
    const weeklyHeader = `#weeklySchedule-${theme} th`; 
    const weeklyTrow = `#weeklySchedule-${theme} tr`;
    const cols = document.querySelectorAll(weeklyHeader);
    let targetColIndex = -1;

    
    cols.forEach((col, index) => {
      if (col.textContent === dayName) {
        targetColIndex = index;
      }
    });

    if (targetColIndex !== -1) {
      const rows = document.querySelectorAll(weeklyTrow);
      rows.forEach(row => {
        const cell = row.cells[targetColIndex];
        if (cell) {
          cell.classList.add('today');
        }
      });
    }
  };
    

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const uniqueSubjects = [...new Set(timetableData.map(item => item.subject))];
    return (
        <div id="header-timer">
        <h3>Weekly Timetable</h3>
        <hr></hr>
        {timetableData && timetableData.length > 0 ? (
            <table id={weeklySchedule}>
                <thead>
                    <tr>
                        <th>Day/Subject</th>
                        {daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {uniqueSubjects.sort().map((subject) => (
                        <tr key={subject}>
                        <td>{subject}</td>
                            {daysOfWeek.map(day => {
                                const entry = timetableData.find(item => item.day === day && item.subject === subject);
                                return <td key={day}>{entry ? entry.time : ''}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="nodata">No Timetable data</p>
        )}
    </div>
  );
}

export default TimeTableComponent;
