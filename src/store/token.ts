import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { RootState, RootThunk } from './index';
import { myCustomFetch } from '../client/myCustomFetch'
import { Profile, SignInBody, SignUpBody, Token } from '../server.types'

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
  get: (state: RootState): RootState['token'] => state.token && state.token.token,
  error: (state: RootState): RootState['token'] => state.token && state.token.error,
  getPofile: (state: RootState): RootState['token'] => state.token && state.token.profile

};


export const singInTokenThunk =
  (credential: SignInBody): RootThunk =>
    async (dispatch, getState, { url }) => {
      const { token } = getState();

      const resToken = await myCustomFetch<Token>('signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify(credential)
        })
        .then((res) => dispatch(tokenActions.set(res)))
        //.catch((e) => dispatch(tokenActions.error(e.errors[0].message)));
        .catch((e) => dispatch(tokenActions.error({ error: e.errors[0].message })));
    };

    
export const singUpTokenThunk =
  (credential: SignUpBody): RootThunk =>
    async (dispatch, getState, { url }) => {
      const { token } = getState();

      const resToken = await myCustomFetch<Token>('signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify(credential)
        })
        .then((res) => dispatch(tokenActions.set(res)))
        //.catch((e) => dispatch(tokenActions.error(e.errors[0].message)));
        .catch((e) => dispatch(tokenActions.error({ error: e.errors[0].message })));
    };

export const tokenThunks = {
  getByCount: singInTokenThunk,
};


