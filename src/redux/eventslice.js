import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    data: null
  },
  reducers: {
    setTodayEvents: (state, action) => {
      state.data = null;
      state.data = action.payload;
      }
  }
});

export const { setTodayEvents } = eventSlice.actions;

export default eventSlice.reducer;