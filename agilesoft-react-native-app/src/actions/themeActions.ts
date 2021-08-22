import {createAction} from 'typesafe-actions';
import {ThemeState} from '../reducers/themeReducer';

export default createAction(
  'APP_CHANGE_THEME_STATE',
  (state: Partial<ThemeState>) => state,
)();
