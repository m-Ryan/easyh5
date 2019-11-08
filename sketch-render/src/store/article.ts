import { ISketchItem, IElementItem } from "@/typings/ISketckItem";
import { CrateAction } from "./reducers";
import { unitConver } from "@/util/utils";
import { DragElement } from "@/components/drag-element";
import { CSSProperties } from "react";


export enum ArticleType {
  ARTICLE_SET_STATE = 'ARTICLE_SET_STATE',
  ARTICLE_SET_TARGET = 'ARTICLE_SET_TARGET',
  ARTICLE_ADD_ITEM = 'ARTICLE_ADD_ITEM',
  ARTICLE_SET_VALUE = 'ARTICLE_SET_VALUE',
  ARTICLE_SET_STYLE = 'ARTICLE_SET_STYLE',
  ARTICLE_SET_LINK = 'ARTICLE_SET_LINK',
}

// @observable elements: IElementItem[] = [];
// @observable targetId: number = 0;
// @observable dragElement: DragElement|null = null;

export type ArticleState = {
  list: IElementItem[];
  targetId: number;
  dragElement: DragElement | null;
}

export type ArticleAction =
  CrateAction<ArticleType.ARTICLE_SET_STATE, ISketchItem[]|IElementItem[]> |
  CrateAction<ArticleType.ARTICLE_SET_TARGET, { targetId: number, event: React.MouseEvent<any, MouseEvent> }> |
  CrateAction<ArticleType.ARTICLE_SET_VALUE, string> |
  CrateAction<ArticleType.ARTICLE_SET_STYLE, [ keyof React.CSSProperties, any]> |
  CrateAction<ArticleType.ARTICLE_SET_LINK, string> |
  CrateAction<ArticleType.ARTICLE_ADD_ITEM, IElementItem>;

export function article(
  state: ArticleState = {
    list: [],
    targetId: 0,
    dragElement: null
  },
  action: ArticleAction
): ArticleState {
  if (!state) return state;

  switch (action.type) {
    case ArticleType.ARTICLE_SET_STATE:
      return setElements(state, action.payload);
    case ArticleType.ARTICLE_SET_TARGET:
      return setTarget(state, action.payload);
    case ArticleType.ARTICLE_SET_VALUE:
      return seValue(state, action.payload);
    case ArticleType.ARTICLE_SET_LINK:
      return setLink(state, action.payload);
    case ArticleType.ARTICLE_SET_STYLE:
      return setTargetStyle(state, action.payload[0], action.payload[1]);
    default:
      return state
  }
}


/**
 * 设置state
 * @param data 
 */
function setElements(state: ArticleState, data: ISketchItem[] | IElementItem[]): ArticleState {
  let id = 0;
  const tranformStyle = (child: ISketchItem) => {
    child['id'] = ++id;
    const style = child.style;
    for (let key in style) {
      style[key] = unitConver(style[key], { times: 0.5 })
    }
    child.children.forEach(item => {
      tranformStyle(item);
    })
  }

  if (!Array.isArray(data)) {
    data = [data];
  }
  data.forEach(item => {
    tranformStyle(item)
  })
  state.list = data as IElementItem[]
  return { ...state };
}

/**
 * 设置选中元素的样式
 * @param state 
 * @param property 
 * @param value 
 */
function setTargetStyle<T extends keyof React.CSSProperties>(state: ArticleState, property: T, value: any) {
  const element = getElementById(state.list, state.targetId);
  const formatValue = value.toString().trim();
  if (element) {

    // 如果是数字字符串必须转成数字
    if (/^\d+$/.test(formatValue)) {
      element.style[property] = Number(formatValue) as React.CSSProperties[T];
    } else {
      element.style[property] = value;
    }
  }
  return { ...state };
}

/**
 * 设置选中元素的value
 * @param state 
 * @param value 
 */
function seValue(state: ArticleState, value: string) {
  const element = getElementById(state.list, state.targetId);
  if (element) {
    element.value = value;
  }
  return { ...state }
}

/**
 * 设置选中元素
 * @param state 
 * @param param1 
 */
function setTarget<T extends HTMLElement>(state: ArticleState, { targetId, event }: { targetId: number, event: React.MouseEvent<T, MouseEvent> }) {
  if (state.dragElement) {
    state.dragElement.destory();
  }
  state.targetId = targetId;
  state.dragElement = new DragElement({
    element: event.target as HTMLElement,
    initX: event.pageX,
    initY: event.pageY,
    onMove: (x, y) => {
      setTargetStyle(state, 'left', x);
      setTargetStyle(state, 'top', y);
    }
  });
  return { ...state }
}

function setLink(state: ArticleState, value: string) {
  const element = getElementById(state.list, state.targetId);
  if (element) {
    element.link = value;
  }
  return { ...state }
}

/**
 * 获取选中元素
 * @param elements 
 * @param id 
 */
function getElementById(elements: IElementItem[], id: number): IElementItem | null {
  let target: IElementItem | null = null
  const findById = (element: IElementItem) => {
    if (element.id === id) {
      target = element;
      return;
    }
    element.children.forEach(item => {
      findById(item);
    });
  }
  elements.forEach(item => findById(item));
  return target;
}
