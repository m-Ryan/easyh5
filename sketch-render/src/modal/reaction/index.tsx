import React, { useContext, useState, useCallback } from 'react';
import produce from "immer";

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
        mapStore[key] = store[key]();
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

      const debuggerLog = useCallback((nextState: T) => {
        // debugger
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
      return useContext<T>(storeContext);
    },
    useSelector(selector: K) {
      return useContext(storeContext)[selector] as ReturnType<T[K]>;
    }
  }
}
