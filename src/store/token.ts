import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { RootState, RootThunk } from './index';
import { myCustomFetch, useCustomFetch } from '../client/myCustomFetch'
import { Profile, SignInBody, SignUpBody, Token } from '../server.types'
import { storage } from 'src/client/storahe';

export const TOKEN_KEY = 'token';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    set: (_, action) => action.payload,
    logout: () => null,
    error: (_, action) => action.payload
  },
});

export const tokenActions = tokenSlice.actions;
export const { reducer: token } = tokenSlice;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => state.token ,
  
};






