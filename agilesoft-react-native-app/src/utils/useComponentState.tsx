
import {
  setComponentState,
  unsetComponentState,
} from './standardActions';

import { IComponentsState, IState } from './interfaces';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

export default function useComponentState<S>(
  componentId: string,
  state?: S
)/*:
[
  S,
  (state: S) => void,
  () => void,
  IComponentsState
]
*/
 /*{
  componentState: S;
  setComponentState: (state: S) => void;
  unSetComponentState: () => void;
  componentsState: IComponentsState;
}*/

{
  const componentsState: IComponentsState = useSelector(
    (globalState: IState) => {
      if (!globalState.componentsState) return null;
      return globalState.componentsState;
    }
  );

  const componentState: S = useSelector((globalState: IState) => {
    if (!globalState.componentsState[componentId]) return null;
    return globalState.componentsState[componentId];
  });

  const dispatch = useDispatch();

  const _setComponentState = (_state: any) => {
    if (Object.keys(_state).length) {
      dispatch(setComponentState(componentId, _state));
    }
  };

  const _unSetComponentState = () => {
    dispatch(unsetComponentState(componentId));
  };

  useEffect(() => {
    if (state && Object.keys(state).length && !componentState) {
      console.log(
        `Initializing Persisted Component state ${componentId} : ${JSON.stringify(
          state
        )}`
      );
      dispatch(setComponentState(componentId, { ...state }));

    }
  }, [componentId]);

  /*return {
    componentState: componentState,
    setComponentState: _setComponentState,
    componentsState: componentsState,
    unSetComponentState: _unSetComponentState,

  };*/

  return [
    componentState,
    _setComponentState,
    _unSetComponentState,
    componentsState
  ] as const
}

