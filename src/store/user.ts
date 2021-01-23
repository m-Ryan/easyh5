import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'user',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})