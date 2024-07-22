import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
  name: 'timetable',
  initialState: {
      data: [],
      currentDay: null
  },
  reducers: {
    setTimeTableData: (state, action) => {
      state.data = [];
      state.data = action.payload;
      },
      setCurrentDay: (state, action) => {
          state.currentDay = action.payload ?? null;
      }
  }
});

export const { setTimeTableData,setCurrentDay } = timeSlice.actions;

export default timeSlice.reducer;