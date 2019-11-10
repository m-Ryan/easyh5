import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { article, ArticleAction } from "./article";

export const rootReducer = combineReducers({
  article,
})

export type ReducerActions = ArticleAction;

// 创建action类型
export type CrateAction<T extends string, P extends any> = { type: T, payload: P};
export type AppState = ReturnType<typeof rootReducer>;

export function useAppDispatch() {
  const dispatch = useDispatch();
  return <T extends ReducerActions>(action: ((dispatch: typeof useAppDispatch, getStore: ()=>AppState)=>any)|T)=>dispatch(action);
}

export function useAsyncAppDispatch() {
  const dispatch = useDispatch();
  return <T extends ReducerActions>(action:((args: any)=>T))=>dispatch(action);
}

export function useAppSelector<T extends any>(fn: (state: AppState, equalityFn?: ((left: T, right: T) => boolean) | undefined)=>T): T {
  return useSelector(fn);
}

export type AppDispatch = ReturnType<typeof useAppDispatch>
