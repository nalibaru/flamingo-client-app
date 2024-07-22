import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    image : ""
  },
  reducers: {
    setImageData: (state, action) => {
      state.data = action.payload;
    },
    setProfileData: (state, action) => {
      state.image = action.payload;
    }
  }
});

export const { setImageData,setProfileData } = profileSlice.actions;

export default profileSlice.reducer;