import { configureStore } from '@reduxjs/toolkit';
import timeSlice from './timeslice';
import loginSlice  from './loginslice';
import mocktestSlice from './mocktestslice';
import profileslice from './profileslice';
import eventSlice from './eventslice';
export const store = configureStore({
    reducer: {
        timetable: timeSlice,
        login: loginSlice,
        mocktest: mocktestSlice,
        profile: profileslice,
        event : eventSlice
    }
})