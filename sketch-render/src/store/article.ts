import { INodeItem, NodeType, INodeStyle } from "@/typings/ISketckItem";
import { CrateAction, AppDispatch, AppState } from './reducers';
import { unitConver, getDefaultStyle, addStyle } from '@/util/utils';

export type ArticleState = {
  list: INodeItem[];
  targetId: number;
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
  CrateAction<ArticleType.ARTICLE_SET_STATE, INodeItem[]> |
  CrateAction<ArticleType.ARTICLE_SET_TARGET, { targetId: number }> |
  CrateAction<ArticleType.ARTICLE_SET_VALUE, string> |
  CrateAction<ArticleType.ARTICLE_SET_STYLE, [keyof INodeStyle, any]> |
  CrateAction<ArticleType.ARTICLE_SET_LINK, string> |
  CrateAction<ArticleType.ARTICLE_DELETE_ITEM, null> |
  CrateAction<ArticleType.ARTICLE_ADD_ITEM, { child: INodeItem }>;


export const getTarget = (state: ArticleState) => {
  if (!state.targetId) return null;
  const target = getElementById(state.list, state.targetId);
  return target;
}

export function article(
  state: ArticleState = {
    list: [],
    targetId: 0,
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
function setElements(state: ArticleState, data: INodeItem[] | INodeItem[]): ArticleState {

  const tranformStyle = (child: INodeItem) => {
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
    list: data as INodeItem[]
  };
}

/**
 * 添加一项
 * @param state 
 * @param param1 
 */
export function addItem(state: ArticleState, { child }: { child: INodeItem }) {
  const element = getElementById(state.list, state.targetId);
  if (element) {
    element.children.push(child);
  }
  state.targetId = child.id;
  return { ...state };
}

/**
 * 设置选中元素的样式
 * @param state 
 * @param property 
 * @param value 
 */
function setTargetStyle<T extends keyof INodeStyle>(state: ArticleState, property: T, value: any) {
  const element = getElementById(state.list, state.targetId);
  const formatValue = value.toString().trim();
  if (element) {
    // 如果是数字字符串必须转成数字
    if (/^\d+$/.test(formatValue)) {
      element.style = {
        ...element.style,
        [property]: Number(formatValue) as INodeStyle[T]
      }
    } else {
      element.style = {
        ...element.style,
        [property]: value
      }
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
function setTarget(state: ArticleState, { targetId }: { targetId: number }) {
  state.targetId = targetId;
  return { ...state };
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
  const deleteById = (element: INodeItem) => {
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
function getElementById(elements: INodeItem[], id: number): INodeItem | null {
  let target: INodeItem | null = null
  const findById = (element: INodeItem) => {
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


export function asyncAddItem(action: CreateElementAction) {
  return function (dispatch: AppDispatch, getStore: () => AppState) {
    const { element, nodeItem } = createItem(action);
      const { zIndex, position, backgroundSize, left, top } = getDefaultStyle();
      addStyle(element, {
        'zIndex': zIndex!.toString(),
        position: position!,
        top: top!.toString(),
        left: left!.toString(),
        backgroundSize: backgroundSize!.toString(),
      })

      dispatch({
        type: ArticleType.ARTICLE_ADD_ITEM,
        payload: {
          child: nodeItem
        }
      })
  }
}

function createItem(action: CreateElementAction) {
  switch (action.type) {
    case NodeType.TEXT:
      return crateText();
    case NodeType.BITMAP:
      return crateBitmap(action.payload);
    case NodeType.BOX:
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
      type: NodeType.BOX,
      value: '',
      style: getDefaultStyle(NodeType.BOX),
      children: [ crateText().nodeItem ]
    }
  }
}


type CreateElement = {
  element: HTMLElement,
  nodeItem: INodeItem
}


type CrateNodeAction<T extends NodeType, P extends any> = { type: T, payload: P };

type CreateElementAction = 
  CrateNodeAction<NodeType.TEXT, null > |
  CrateNodeAction<NodeType.BOX, null > |
  CrateNodeAction<NodeType.BITMAP, string>;
