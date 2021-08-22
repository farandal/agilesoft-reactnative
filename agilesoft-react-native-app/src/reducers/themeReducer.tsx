'use strict';
//import {setStoreState} from '../actions/appActions';
import changeThemeAction from '../actions/themeActions';
import {createReducer} from 'typesafe-actions';
import {ThemeAction} from '../actions/actionTypes';

export interface ThemeState {
  theme: string | null;
  darkMode: boolean | null;
}

const initialState: ThemeState = {
  theme: null,
  darkMode: null,
};

const themeReducer = createReducer<ThemeState, ThemeAction>(
  initialState,
).handleAction(changeThemeAction, (state, action) =>
  Object.assign({}, initialState, state, action.payload),
);

export default themeReducer;
