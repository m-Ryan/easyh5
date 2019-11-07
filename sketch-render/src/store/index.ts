import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers';
const loggerMiddleware = createLogger();

export type AppState = ReturnType<typeof rootReducer>

export function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, thunkMiddleware, ...getDefaultMiddleware()],
    enhancers: []
  })

  if (process.env.NODE_ENV !== 'production' && module['hot']) {
    module['hot'].accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}