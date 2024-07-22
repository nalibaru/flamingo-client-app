import React,{useState} from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import Button from './components/Button';
import { useTheme } from './ThemeContext';
import ModalComponent from "./components/ModalComponent";
import CreateEventForm from "./components/other/calendar/CreateEventForm";
import Modal from 'react-modal';
import Notification from './components/Notification';
import CreateTimeTableForm from './components/other/timetable/CreateTimeTableForm';
import TimeTableMultiComponent from './components/other/timetable/TimeTableMultiComponent';
import ViewTodayEvents from './components/other/calendar/ViewTodayEvents';
import GeneralInfoComponent from './components/other/GeneralInfoComponent';

Modal.setAppElement('#root');

function App() {
  const theme = useTheme();
  const userdetails = useSelector((state) => state.login.user);
  const { username,accesslevel } = userdetails || {};
  
  const [responseData, setResponseData] = useState("");
  const [notificationClass, setNotificationClass] = useState("");
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const classNameMain = `main-${theme}`;

  const handleModal = (data) => {
    if(data)
    {
      setNotificationClass("notificationsuccess");
      setResponseData(data);
    }

    handleCloseModal();
  } 

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  
  const createEvent = () => {
    setTitle("Add Event to Calendar");
    setType("event");
    setIsModalOpen(true);
  }

  const createTimeTable = () => {
    setTitle("Add TimeTable");
    setType("timetable");
    setIsModalOpen(true);
  }
  

  const resetNotification = () => {
    setResponseData("");
    setNotificationClass("");
    setType("");
    setTitle("");
  };
  
  return (
    <div className={classNameMain}>
      <h2>Welcome to FlaMinGo App</h2>
      {accesslevel === 1 ? 
      <><Notification message={responseData} notificationclass={notificationClass} onDismiss={resetNotification} />
        <Button theme={theme} onClick={createEvent} type="button">Add Event</Button>
          <Button theme={theme} onClick={createTimeTable} type="button">Add TimeTable</Button>
      <TimeTableMultiComponent />
          <ViewTodayEvents /></> : <>
          <GeneralInfoComponent />
        </>}
        <ModalComponent
            title={title}
            theme={theme}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            showFooter={false}
        >
            {type === "event" && <CreateEventForm username={username} onCloseModal={handleModal} />}
            {type === "timetable" && <CreateTimeTableForm username={username} onCloseModal={handleModal} />}
      </ModalComponent>
      
    </div>
);
}

export default App;