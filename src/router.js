import React from 'react';
import { lightTheme, darkTheme, natureTheme, oceanTheme} from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimeTableFull from './components/other/timetable/TimetableFull';
import App from './App';
import LoginComponent from './components/login/LoginComponent';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Layout from './Layout';
import  MyCalendarComponent  from './components/other/calendar/MyCalendarComponent';
import MainPage from './components/other/mt/MainPage';
import Profile from './components/other/user/profile';
import MockTestDashboard from './components/other/mt/MockTestDashboard';
import ProtectedRoute from './components/ProtectedRoute';


const StyledApp = styled.div`
  width : 100%;
  height : 100%;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.body};
  border-color: ${props => props.theme.toggleBorder};
`;

const ThemeApp = () => {
  const theme = useTheme();
 
  const currentTheme = theme === 'light' ? lightTheme : theme === 'dark' ? darkTheme : theme === 'greenary' ? natureTheme : oceanTheme; 

  return (
  <StyledThemeProvider theme={currentTheme}>
  <StyledApp>
    <Router>
          <Routes>
          <Route element={<ProtectedRoute />} >
            <Route element={<Layout />}>
            <Route path="/dashboard" element={<App />} />
              <Route path="/timetable" element={<TimeTableFull />} />
              <Route path="/calendar" element={<MyCalendarComponent />} />
              <Route path="/mocktest" element={<MockTestDashboard />} />
                <Route path="/user" element={<Profile />} />
              </Route>
              <Route path="/starttest" element={<MainPage />} />  
           </Route>  
            <Route path="/login" element={<LoginComponent />} />  
            <Route path="/" element={<LoginComponent />} />  
      </Routes>
    </Router>
    </StyledApp>
    </StyledThemeProvider>
  );
};

const AppRouter = () => {
  return (
    <ThemeProvider>
    <ThemeApp />
    </ThemeProvider>
    );
};
  
export default AppRouter;