import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
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
  return <T extends ReducerActions>(action: T)=>dispatch(action);
}
