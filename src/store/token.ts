import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { RootState, RootThunk } from './index';
import { myCustomFetch, useCustomFetch } from '../client/myCustomFetch'
import { Profile, SignInBody, SignUpBody, Token } from '../server.types'
import { storage } from 'src/client/storahe';
import { TokenType } from 'parse5/dist/common/token';

export const TOKEN_KEY = 'token';


type TokenState = {token:string,error:any,loading:string};

const initValue:TokenState = {token:storage.get(TOKEN_KEY),error:null,loading:null};

export const tokenSlice = createSlice({
  name: 'token',
  initialState:  initValue,
  reducers: {
    set: (state, action) =>  state = {token:action.payload,error: null,loading:null},
    logout: (state) => state = {token:null,error: null,loading:null},
    error: (state, action) => state = {token:null,error:action.payload,loading:null},
    loading: (state) => state = {token:null,error:null,loading:"loading"}    
    
  },
});


export const genWithSavingThunk = (credential:SignInBody):RootThunk => (dispatch, getState ) => {
  dispatch(tokenActions.loading());
  myCustomFetch<Token>('signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credential)
        })
        .then(x => {
          dispatch(tokenActions.set(x.token));
          storage.set(TOKEN_KEY, x.token);
        })
        
        .catch(e => dispatch(tokenActions.error(e)))
  
};


export const tokenActions = tokenSlice.actions;
export const { reducer: token } = tokenSlice;

export const tokenSelectors = {
  get: (state: RootState): TokenState => state.token ,
};






