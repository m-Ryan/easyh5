import { ISketchItem } from "@/typings/ISketckItem";
export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[];
  link?: string;
}

export function article(
  state = null,
  action: { type: ArticleType, payload: IElementItem[] }
): any {
  switch (action.type) {
    case 'ARTICLE_SET_STATE' : 
    console.log(action.payload)
    return action.payload;
    default:
      return state
  }
}

export type ArticleType = 'ARTICLE_SET_STATE';

export type ArticleTypeMap = {
  ARTICLE_SET_STATE: IElementItem[] 
}

export type ArticleAction<T extends ArticleType> = {
  type: T,
  action: ArticleTypeMap[T]
}
