import React, { useContext, useState, useCallback, useMemo, useRef } from 'react';
import produce from "immer";
import { usePrevious } from '@/components/react-use/usePrevious';

interface StoreType {
  [key: string]: any,
}

const storeContext = React.createContext<any>({});

export interface StoreParams {
  debug?: boolean;
}

export function createReactionStore<T extends Partial<StoreType>, K extends keyof T>(store: T, params: StoreParams = {}) {
  const { debug = false } = params;
  return {
    Provider({ children }: { children: React.ReactNode }) {
      const mapStore: StoreType = {};

      Object.keys(store).forEach((key) => {
        const instance = store[key]();
        mapStore[key] = instance;
      });

      return (
        <storeContext.Provider
          value={mapStore}
        >
          {children}
        </storeContext.Provider>
      );
    },
    useImmerState<T>(initState: T): [T, (dispatch: (newState: T) => T) => void] {
      const [state, setState] = useState<T>(initState);
      // const prevState = usePrevious(state);

      const debuggerLog = useCallback((nextState: T) => {
        // console.log('%c prevState         ', 'color:#9E9E9E', prevState);
        // console.log('%c nextState         ', 'color:#4CAF50', nextState);
        // console.log('\n');
        // prevState.current = nextState;
        return nextState;
      }, [])

      const setEnhanceState = useCallback((setData: (newState: T) => T) => {

        setState((newState) => {
          return debug ? debuggerLog(produce<T>(newState, setData as any)) : produce<T>(newState, setData as any);
        });
      }, [debuggerLog])

      return [state, setEnhanceState]
    },
    useStore() {
      return useContext(storeContext);
    },
    useSelector(selector: K) {
      return useContext(storeContext)[selector] as ReturnType<T[K]>;
    }
  }
}


function logActionProxy(modalName: string, obj: { [key: string]: any }) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      const fn = obj[key];
      obj[key] = (...args: any) => {
        console.log('%c action         ', 'color:#03A9F4', `${modalName}.${key}`);
        return fn(args);
      }
    }
  })
  return obj;
}
