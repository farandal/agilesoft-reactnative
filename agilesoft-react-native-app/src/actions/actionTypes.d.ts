import {ActionType} from 'typesafe-actions';
import * as themeActions from './themeActions';
export type ThemeAction = ActionType<typeof themeActions>;
export type RootAction = ThemeAction;
