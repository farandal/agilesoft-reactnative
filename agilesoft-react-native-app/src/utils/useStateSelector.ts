import {createSelectorHook} from 'react-redux';
import {RootAction} from '../actions/actionTypes';
import {DefaultRootState} from '../store';

const useStateSelector = createSelectorHook<DefaultRootState, RootAction>();
export default useStateSelector;
