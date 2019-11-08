import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { article, ArticleAction } from "./article";
import { user, UserAction } from './user';

export const rootReducer = combineReducers({
  article,
  user
})

export type ReducerActions = ArticleAction | UserAction

// 创建action类型
export type CrateAction<T extends string, P extends any> = { type: T, payload: P};
export type AppState = ReturnType<typeof rootReducer>;

export function useAppDispatch() {
  const dispatch = useDispatch();
  return <T extends ReducerActions>(action: ((args: any)=>any)|T)=>dispatch(action);
}

export function useAsyncAppDispatch() {
  const dispatch = useDispatch();
  return <T extends ReducerActions>(action:((args: any)=>T))=>dispatch(action);
}

export function useAppSelector<T extends any>(fn: (state: AppState, equalityFn?: ((left: T, right: T) => boolean) | undefined)=>T): T {
  return useSelector(fn);
}

export type AppDispatch = ReturnType<typeof useAppDispatch>

