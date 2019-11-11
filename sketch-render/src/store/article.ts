import { ISketchItem, IElementItem, NodeType } from "@/typings/ISketckItem";
import { CrateAction, AppDispatch, AppState } from './reducers';
import { unitConver, getDefaultStyle } from '@/util/utils';
import { DragElement } from "@/components/drag-element";

export type ArticleState = {
  list: IElementItem[];
  targetId: number;
  dragElement: DragElement | null;
}

// 作为查找的唯一id
let elementId = 0;

export enum ArticleType {
  ARTICLE_SET_STATE = 'ARTICLE_SET_STATE',
  ARTICLE_SET_TARGET = 'ARTICLE_SET_TARGET',
  ARTICLE_ADD_ITEM = 'ARTICLE_ADD_ITEM',
  ARTICLE_SET_VALUE = 'ARTICLE_SET_VALUE',
  ARTICLE_SET_STYLE = 'ARTICLE_SET_STYLE',
  ARTICLE_SET_LINK = 'ARTICLE_SET_LINK',
  ARTICLE_DELETE_ITEM = 'ARTICLE_DELETE_ITEM',
  ARTICLE_ADD_TEXT = 'ARTICLE_ADD_TEXT',
  ARTICLE_ADD_BITMAP = 'ARTICLE_ADD_BITMAP',
  ARTICLE_ADD_SHAPE = 'ARTICLE_ADD_SHAPE',
}

export type ArticleAction =
  CrateAction<ArticleType.ARTICLE_SET_STATE, ISketchItem[] | IElementItem[]> |
  CrateAction<ArticleType.ARTICLE_SET_TARGET, { targetId: number, dragElement: DragElement }> |
  CrateAction<ArticleType.ARTICLE_SET_VALUE, string> |
  CrateAction<ArticleType.ARTICLE_SET_STYLE, [keyof React.CSSProperties, any]> |
  CrateAction<ArticleType.ARTICLE_SET_LINK, string> |
  CrateAction<ArticleType.ARTICLE_DELETE_ITEM, null> |
  CrateAction<ArticleType.ARTICLE_ADD_ITEM, { child: IElementItem }>;


export const getTarget = (state: ArticleState) => {
  if (!state.targetId) return null;
  const target = getElementById(state.list, state.targetId);
  return target;
}

export function article(
  state: ArticleState = {
    list: [],
    targetId: 0,
    dragElement: null
  },
  action: ArticleAction,
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
    case ArticleType.ARTICLE_DELETE_ITEM:
      return deleteItem(state);
    case ArticleType.ARTICLE_SET_STYLE:
      return setTargetStyle(state, action.payload[0], action.payload[1]);
    case ArticleType.ARTICLE_ADD_ITEM:
      return addItem(state, action.payload);
    default:
      return state
  }
}


/**
 * 设置state
 * @param data 
 */
function setElements(state: ArticleState, data: ISketchItem[] | IElementItem[]): ArticleState {

  const tranformStyle = (child: ISketchItem) => {
    child['id'] = ++elementId;
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
  return {
    ...state,
    list: data as IElementItem[]
  };
}

/**
 * 添加一项
 * @param state 
 * @param param1 
 */
export function addItem(state: ArticleState, { child }: { child: IElementItem }) {
  const element = getElementById(state.list, state.targetId);
  if (element) {
    element.children.push(child);
  }
  state.dragElement = null;
  state.targetId = child.id;
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
function setTarget(state: ArticleState, { targetId, dragElement }: { targetId: number, dragElement: DragElement }) {
  const newState = { ...state };
  if (newState.dragElement) {
    newState.dragElement.destory();
  }
  newState.targetId = targetId;
  newState.dragElement = dragElement;
  return newState;
}

function setLink(state: ArticleState, value: string) {
  const element = getElementById(state.list, state.targetId);
  if (element) {
    element.link = value;
  }
  return { ...state }
}

function deleteItem(state: ArticleState) {
  const id = state.targetId;
  const deleteById = (element: IElementItem) => {
    element.children = element.children.filter(item => deleteById(item));
    if (element.id === id) {
      return false;
    }
    return true;
  }
  state.list = state.list.filter(item => deleteById(item))
  return { ...state };
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

/**
 * 设置当前选中的元素
 * @param param0 
 */
export function asyncSetTarget({ targetId, event }: { targetId: number, event: React.MouseEvent<any, MouseEvent> }) {
  return function (dispatch: AppDispatch, getStore: () => AppState) {
    const store = getStore();
    const dragElement = new DragElement({
      element: event.target as HTMLElement,
      onMove: (x, y) => {
        dispatch({
          type: ArticleType.ARTICLE_SET_STYLE,
          payload: ['left', x]
        })
        dispatch({
          type: ArticleType.ARTICLE_SET_STYLE,
          payload: ['top', y]
        })
      }
    });
    if (store.article.dragElement && (store.article.dragElement.element === event.target)) {
      return;
    }
    return dispatch({
      type: ArticleType.ARTICLE_SET_TARGET,
      payload: {
        targetId,
        dragElement
      }
    })
  }
}

export function asyncAddItem(action: CreateElementAction) {
  return function (dispatch: AppDispatch, getStore: () => AppState) {
    const store = getStore();
    const parent = store.article.dragElement ? store.article.dragElement.element : null;
    if (parent) {
      const { element, nodeItem } = createItem(action);
      const { zIndex, position, backgroundSize, left, top } = getDefaultStyle();
      element.style.zIndex = zIndex!.toString();
      element.style.position = position!;
      element.style.top = top!.toString();
      element.style.left = left!.toString();
      element.style.backgroundSize = backgroundSize!.toString();
      parent.appendChild(element);

      dispatch({
        type: ArticleType.ARTICLE_ADD_ITEM,
        payload: {
          child: nodeItem
        }
      })
    }
  }
}

function createItem(action: CreateElementAction) {
  switch (action.type) {
    case NodeType.TEXT:
      return crateText();
    case NodeType.BITMAP:
      return crateBitmap(action.payload);
    case NodeType.GROUP:
      return crateGroup();

  }
}

function crateText(): CreateElement {
  return {
    element: document.createElement('span'),
    nodeItem: {
      id: ++elementId,
      type: NodeType.TEXT,
      value: '新增文本',
      style: getDefaultStyle(NodeType.TEXT),
      children: []
    }
  }
}

function crateBitmap(url: string): CreateElement {
  return {
    element: document.createElement('img'),
    nodeItem: {
      id: ++elementId,
      type: NodeType.BITMAP,
      value: url,
      style: getDefaultStyle(NodeType.BITMAP),
      children: []
    }
  }
}

function crateGroup(): CreateElement {
  return {
    element: document.createElement('div'),
    nodeItem: {
      id: ++elementId,
      type: NodeType.GROUP,
      value: '',
      style: getDefaultStyle(NodeType.GROUP),
      children: [ crateText().nodeItem ]
    }
  }
}


type CreateElement = {
  element: HTMLElement,
  nodeItem: IElementItem
}


type CrateNodeAction<T extends NodeType, P extends any> = { type: T, payload: P };

type CreateElementAction = 
  CrateNodeAction<NodeType.TEXT, null > |
  CrateNodeAction<NodeType.GROUP, null > |
  CrateNodeAction<NodeType.BITMAP, string>;
