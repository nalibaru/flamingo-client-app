import React,{useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';  // for day grid view
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import '../../index.css';
import { useTheme } from '../../../ThemeContext';
import ModalComponent from '../../ModalComponent';
import { useSelector } from 'react-redux';
import EventDisplay from './EventDisplay';
import Button from '../../Button';

function MyCalendarComponent() {
  const theme = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataForDay, setDataForDay] = useState([]);
  const [title, setTitle] = useState("");
  const userdetails = useSelector((state) => state.login.user);
  const { username } = userdetails || {};
  const [ allEventsData, setAllEventsData ] = useState([]);
  const [message, setMessage] = useState("");
  const link = process.env.REACT_APP_ACCESSLINK;
  const [activeButton, setActiveButton] = useState('Upcoming');
  const buttonactive = `${theme} active`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${link}/api/events/latestEvents?user=${username}`;
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        setAllEventsData(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, [setAllEventsData,username,link]); 


  const closeModal = () => {
    setModalIsOpen(false);
    setMessage('');
  };
    
  const className = `main-${theme} my-calendar-${theme}`;

  const fetchAllDataAfterOperation = async () => {
    try {
        const url = `${link}/api/events/latestEvents?user=${username}`;
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        setAllEventsData(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }
  
  const handleDateClick = (arg) => {
    setModalIsOpen(true);
    const datatodisplay = "Events for " + arg.dateStr;
    setTitle(datatodisplay);
    const filteredData = fetchDataForClick(arg.dateStr);
    setDataForDay(filteredData);
    }

    const fetchDataForClick = (clickedDay) => {
      const filteredEvents = allEventsData.filter((element) => {
          return element.date === clickedDay;
      });
      return filteredEvents;
    }
  
    const onButtonClick = async (type, fetchFunction) => {
      try {
        setActiveButton(type); // Set active button type
        await fetchFunction(); // Fetch data based on button type
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
  
    const onAllEventClickBase = () => {
      onButtonClick('All', onAllEventClick);
    };
  
    const onUpcomingEventClickBase = () => {
      onButtonClick('Upcoming', () => onUpcomingEventClick()); // Replace with appropriate function
    };
  
    const onPastEventClickBase = () => {
      onButtonClick('Past', () => onPastEventClick()); // Replace with appropriate function
    };
  
  const onAllEventClick = async () => {
    try {
      const url = `${link}/api/events/allByUserwithoutDeleted?user=${username}`;
      const response = await fetch(url); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      setAllEventsData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }
  
  const onUpcomingEventClick = async () => {
    try {
      const url = `${link}/api/events/latestEvents?user=${username}`;
      const response = await fetch(url); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      setAllEventsData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }
  
  const onPastEventClick = async () => {
    try {
      const url = `${link}/api/events/pastEventsByUser?user=${username}`;
      const response = await fetch(url); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      setAllEventsData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  const onDeletedEventClick = async () => {
    try {
      const url = `${link}/api/events/alldeletedByUser?user=${username}`;
      const response = await fetch(url); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      setAllEventsData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  

  const onDeletedEventClickBase = () => {
    onButtonClick('Deleted', () => onDeletedEventClick()); // Replace with appropriate function
  };

  const handleDeleteEvent = async (e) => {
    await deleteCalendar(e);
  }


const deleteCalendar = async (eventId) => {
  try {
    //const username1 = username;
    const dataForDayAfterDelete = dataForDay.filter((element) => element.eventId !== eventId);
    setDataForDay(dataForDayAfterDelete);
      const url = `${link}/api/events/delete/${eventId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventId: eventId,
            updatedBy: username
        })
       });
        if (!response.ok) {
            if (response.status === 404) {
                setMessage("Event not found or already deleted");
            } else {
                setMessage("Error in deleting the timetable");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        const message = data.message;    
        setMessage(message);
        fetchAllDataAfterOperation();
    } catch (err) {
        setMessage("Error in deleting the timetable");
      }
};
  
    return (
        <div className={className}>
        <h2>My Calendar</h2>
        <div className="button-container">
          <Button theme={activeButton === 'All' ? buttonactive : theme} onClick={onAllEventClickBase} type="button" >All Events</Button>
          <Button theme={activeButton === 'Upcoming' ? buttonactive : theme} onClick={onUpcomingEventClickBase} type="button">Upcoming Events</Button>
          <Button theme={activeButton === 'Past' ? buttonactive : theme} onClick={onPastEventClickBase} type="button">Past Events</Button>
          <Button theme={activeButton === 'Deleted' ? buttonactive : theme} onClick={onDeletedEventClickBase} type="button">Removed Events</Button>
        </div>
            <FullCalendar
            plugins={[dayGridPlugin,interactionPlugin]}
            initialView="dayGridMonth"
            events={allEventsData}
            dateClick={handleDateClick}
            />
        <ModalComponent
          title={title}
          theme={theme}
          isOpen={modalIsOpen}
          onClose={closeModal}
          showFooter={false}>
          {message && <div className="nodata">{ message }</div>}
         <EventDisplay dataForDay={dataForDay} theme={theme} deleteEvent={handleDeleteEvent} />
        </ModalComponent>
        </div>
    );
}

export default MyCalendarComponent;