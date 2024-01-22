import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { Profile } from '../server.types'
import { RootState } from './index';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<Profile>) => action.payload,
  },
});

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
};

export const profile = profileSlice.reducer;
