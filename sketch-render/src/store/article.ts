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
    case ArticleType.ARTICLE_SET_STATE : 
    return action.payload;
    default:
      return state
  }
}

export enum ArticleType {
  ARTICLE_SET_STATE = 'ARTICLE_SET_STATE'
}

export type ArticleTypeMap = {
  [ArticleType.ARTICLE_SET_STATE]: IElementItem[] 
}
