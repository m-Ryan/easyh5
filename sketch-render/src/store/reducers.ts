import { article, ArticleAction, ArticleType, ArticleTypeMap } from "./app";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";

export const rootReducer = combineReducers({
  article,
})


export function useAppDispatch() {
  const dispatch = useDispatch()
  return <T extends ArticleType, K extends ArticleTypeMap>(type: T, payload: K[T])=>dispatch({ type, payload });
}
