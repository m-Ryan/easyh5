import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import { article, ArticleTypeMap, ArticleType } from "./article";
import { UserTypeMap, user, UserType } from './user';

export const rootReducer = combineReducers({
  article,
  user
})

export type ReducerType = ArticleType | UserType;
export interface ReducerMap extends ArticleTypeMap , UserTypeMap {

}

export function useAppDispatch() {
  const dispatch = useDispatch();
  return <T extends ReducerType, K extends ReducerMap>(type: T, payload: K[T])=>dispatch({ type, payload });
}
