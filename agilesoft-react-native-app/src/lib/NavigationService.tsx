import {
  NavigationAction,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> =
  React.createRef();

export default class NavigationService {
  public static isReady: boolean;

  public static navigate(name: string, params?: Record<string, unknown>) {
    if (this.isReady && navigationRef.current) {
      console.log("NAVIGATING TO ",name)
      navigationRef.current.navigate(name, params);
    } else {

    }
  }

  public static dispatch(action: NavigationAction) {
    if (this.isReady && navigationRef.current) {
      console.log("DISPATCHING ",action)
      navigationRef.current.dispatch(action);
    }
  }

  // otras...
}
