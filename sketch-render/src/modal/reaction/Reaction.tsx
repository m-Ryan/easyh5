import React, { createContext, useContext, useMemo } from 'react';
import { T } from 'antd/lib/upload/utils';
import { FilterType } from '@/util/utils';

type Store = {
	[key: string]: any
}

const storeContext = React.createContext<any>({});

export function crateStore<T extends {[key: string]: any}>() {
  return (createContext({}) as React.Context<any>) as React.Context<{
		[P in keyof T]: T[P];
	}>;
}


type IProviderProps<T> = {
	children: React.ReactNode;
	store: T
}

type ObserveType<T extends any = { [key: string]: any }> = {
  data: T;
  method: { [key: string]: (...args: any) => any };
  computed: { [key: string]: any }
}

export function Provider<T extends Store>(props: IProviderProps<T>) {
  const { store, children } = props
  return (
    <storeContext.Provider
      value={store}
    >
      {children}
    </storeContext.Provider>
  );
}

export function useStore<T>(selector: string): T {
  const context = useContext<T>(storeContext);
  return context[selector];
}
