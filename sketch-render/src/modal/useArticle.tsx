import { useState, useCallback, useMemo } from 'react';
import { INodeItem, INodeStyle, IComponentMap } from '@/components/templete/templete.type';
import _ from 'lodash';
import { componentMap, CreateElementAction } from '@/components/templete/components';
import { isNumber, lockContaier } from '@/util/utils';
import { message } from 'antd';
import { CustomComponentType, NodeType, IComponentActionMapKey } from '@/components/templete/constants';
import { IDialog } from '@/components/templete/components/custom/dialog';
import { unlockContaier, isIOS, isAndroid } from '../util/utils';
import { APP_EDITOR_CONTAINER_ID } from '@/constants';

const defaultState = {
  title: '草稿',
  articleId: 0,
  list: [],
  focusId: '',
  picture: '',
  tagId: 0,
  loading: true,
  isEditor: false
};

export function useArticle() {
  const [state, setState] = useState<ArticleState>(defaultState);
  const [dialogId, setDialogId] = useState(0);


  /**
   * computed
   */

  /**
    * 当前选中的元素
    */
  const focusElement = useMemo(() => {
    if (!state.focusId) return null;
    const target = getElementById(state.list, state.focusId);
    return target;
  }, [state.focusId, state.list])

  /**
   * 弹窗列表
   */
  const dialogList = useMemo((): IDialog[] => {
    if (!state.list[0]) return [];

    return state.list[0].children.filter(item=>item.type === CustomComponentType.Dialog);
  }, [state.list])

  /**
   * 当前弹窗
   */
  const dialogElement = useMemo(()=> {
    return dialogList.find(item=>item.data.value.uid === dialogId);
  }, [dialogId, dialogList])



  /**
   * method
   */

  /**
   * 触发元素更新
   */
  const forceUpdate = useCallback((element: INodeItem, newState: ArticleState) => {
    if (element.parent) {
      const parent = element.parent;
      const index = parent.children.findIndex(item => item.id === element.id);
      if (index !== undefined) {
        parent.children[index] = {
          ...element
        }
        parent.children = [...parent.children];
      }
    } else {
      // 没有parent 说明是顶层元素
      element.style = {
        ...element.style
      }
      element.data = {
        ...element.data
      }
    }
    newState.list = [...newState.list];
  }, [])


  /**
   * 初始化数据
   */
  const initData = useCallback((data: Partial<ArticleState> & { list: INodeItem[] }) => {

    setState(newState => {
      let { list, articleId, title, picture, tagId } = data;
      if (!Array.isArray(list)) {
        list = [list];
      }
      if (!list.length) {
        list = [
          componentMap.Box.create({
            width: 375,
            height: 667,
            backgroundColor: '#fff',
            position: 'absolute'
          }).nodeItem
        ];
      }

      const setElementParent = (child: INodeItem, parent: INodeItem | null) => {
        child.parent = parent;
        child.children.forEach(item => {
          setElementParent(item, child);
        });
      };

      list.forEach((item) => {
        setElementId(item, null);
        setElementParent(item, null);
      });

      if (articleId) {
        newState.articleId = articleId;
      }

      if (title) {
        newState.title = title;
      }

      if (picture) {
        newState.picture = picture;
      }

      if (tagId) {
        newState.tagId = tagId;
      }

      newState.list = list;
      newState.loading = false;

      return {
        ...newState
      }
    })
  }, [setState])

  /**
   * 设置选中
   */
  const setTarget = useCallback((focusId: string) => {
    setState((newState) => ({
      ...newState,
      focusId
    }))
  }, [setState])

  /**
   * 添加一项
   */
  const addItem = useCallback((action: CreateElementAction, parentNodeId?: string) => {

    setState((newState) => {
      const { nodeItem } = createItem(action);
      let element: INodeItem|null = null;

      // 弹窗的话
      if (nodeItem.type === CustomComponentType.Dialog) {
        (nodeItem as IDialog).data.value.uid = Math.max(0, ...dialogList.map((item: IDialog)=>item.data.value.uid)) + 1;
        (nodeItem as IDialog).data.value.title = "弹窗-" + (nodeItem as IDialog).data.value.uid;
        element = newState.list[0];
      } else {
        element =  getElementById(newState.list, parentNodeId || newState.focusId);
      }
      if (!element) {
        element = newState.list[0];
      }
      if (!(Object.values(CustomComponentType).includes(element.type as any)) && (element.type !== NodeType.BLOCK)) {
        if (element.parent) {
          element = element.parent!;
        }

      }

      setElementId(nodeItem, element);

      nodeItem.parent = element;
      // nodeItem.style.zIndex = Math.max(...[...newState.list[0].children.map(item => Number(item.style.zIndex) || 0), 0]) + 1;
      newState.focusId = nodeItem.id;
      element.children = [...element.children, nodeItem];
      newState.list = [...newState.list];
      return {
        ...newState
      }
    })
  }, [dialogList])

  /**
   * 同级移动,交换位置
   */
  const switchPosition = useCallback((num: number) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (!element) return newState;
      if (element.parent) {
        const index = element.parent.children.findIndex(item => item === element);
        const siblingNode = element.parent.children[index + num];
        if (siblingNode) {
          element.parent.children[index] = siblingNode;
          element.parent.children[index + num] = element;
          element.parent.children = [...element.parent.children];
        }
      }
      newState.list = [...newState.list];
      return {
        ...newState
      }
    })
  }, [setState])

  /**
   * focus到子节点
   */
  const setFocusSon = useCallback(() => {
    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (!element) return newState;
      if (element.children.length) {
        newState.focusId = element.children[0].id;
      }
      return {
        ...newState
      }
    })
  }, [setState])

  /**
   * focus到父节点
   */
  const setFocusParent = useCallback(() => {
    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (!element) return newState;
      if (element.parent) {
        newState.focusId = element.parent.id;
      }
      return {
        ...newState
      }
    })
  }, [setState])

  /**
   * focus到兄弟节点
   */
  const setFocusNextSibling = useCallback((num: number) => {
    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (!element) return newState;
      if (element.parent) {
        const index = element.parent.children.findIndex(item => item === element);
        const siblingNode = element.parent[index + num];
        if (siblingNode) {
          newState.focusId = siblingNode.id;
        }
      }

      newState.list = [...newState.list];
      return {
        ...newState
      }
    })
  }, [setState])

  /**
   * 复制一项
   */
  const copyItem = useCallback(() => {

    setState((newState) => {

      const element = getElementById(newState.list, newState.focusId)!;
      if (element.parent) {
        const nodeItem = _.cloneDeep(element);
        nodeItem.id = element.parent.id + '_' + _.uniqueId();
        nodeItem.parent = element.parent;
        newState.focusId = nodeItem.id;
        element.parent.children = [...element.parent.children, nodeItem];
        forceUpdate(element.parent, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新一项
   */
  const updateItem = useCallback((newItem: INodeItem<any>) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (element) {
        delete newItem.id;
        Object.assign(element, newItem);
        forceUpdate(element, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新样式
   */
  const updateStyle = useCallback((property: keyof INodeStyle, value: any) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      const formatValue = value ? value.toString().trim() : '';
      if (element) {
        // 如果是数字字符串必须转成数字
        if (isNumber(Number(formatValue))) {
          element.style = {
            ...element.style,
            [property]: Number(Number(formatValue).toFixed(2))
          };
        } else {
          element.style = {
            ...element.style,
            [property]: value
          };
        }
        forceUpdate(element, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新标题
   */
  const updateTitle = useCallback((title: string) => {

    setState((newState) => {
      newState.title = title
      return {
        ...newState
      }
    })

  }, [setState])

  /**
   * 更新缩略图
   */
  const updatePicture = useCallback((picture: string) => {

    setState((newState) => {
      newState.picture = picture
      return {
        ...newState
      }
    })

  }, [setState])

  /**
   * 更新值
   */
  const updateValue = useCallback((value: any) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (element) {
        element.data = {
          value
        }
        forceUpdate(element, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新特定元素的值
   */
  const updateValueById = useCallback((id: string, value: any) => {

    setState((newState) => {
      const element = getElementById(newState.list, id);
      if (element) {
        element.data = {
          ...element.data,
          value
        }
        forceUpdate(element, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新链接
   */
  const updateLink = useCallback((link: any) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (element) {
        element.data = {
          ...element.data,
          link
        }
        forceUpdate(element, newState);
      }
      return {
        ...newState
      }
    })
  }, [forceUpdate])

  /**
   * 更新动作
   */
  const updateAction = useCallback((payload: string | undefined) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (element) {
        element.data = {
          ...element.data,
          action: payload
        }
        forceUpdate(element, newState);
      }
      return { ...newState };
    })
  }, [forceUpdate])

  /**
   * 更新变量
   */
  const updateVariable = useCallback((payload:
    | string
    | undefined) => {

    setState((newState) => {
      const element = getElementById(newState.list, newState.focusId);
      if (element) {
        element.data = {
          ...element.data,
          variable: payload
        }
        forceUpdate(element, newState);
      }
      return { ...newState };
    })
  }, [forceUpdate])

  /**
   * 更新变量值
   */
  const updateVariableValue = useCallback((
      payloads: {
      variable: string;
      value: any;
    }[]) => {

    setState((newState) => {
      payloads.forEach(payload => {
        const list = getElementsByVariable(newState.list, payload.variable);
        list.forEach((item, index) => {
          if (_.isArray(item.data.value) ) {
            item.data.value = payload.value;
          } else if (_.isObject(item.data.value)) {
            // 对象形式就合并值
            item.data.value = {
              ...item.data.value,
              ...payload.value
            }
          } else {
            item.data.value = payload.value;
          }
          
          list[index] = {
            ...item,
            data: {
              ...item.data
            }
          }
        });
      })
      return {
        ...newState,
        list: [
          ...newState.list
        ]
      }
    })
  }, [])

  /**
   * 通过变量获取元素
   */
  const getElementListByVariable = useCallback((variable: string) => {
    return getElementsByVariable(state.list, variable)
  }, [state.list])



  /**
   * 删除元素
   */
  const deleteItem = useCallback(() => {

    setState((newState) => {
      const id = newState.focusId;
      if (id === newState.list[0].id) {
        message.warning('不能删除最外层');
        return newState;
      }
      const deleteById = (element: INodeItem) => {
        element.children = element.children.filter(item => deleteById(item));
        if (element.id === id) {
          return false;
        }
        return true;
      };
      newState.focusId = '0';
      newState.list = newState.list.filter(item => deleteById(item));
      return {
        ...newState
      }
    })
  }, [setState])

  const setData = useCallback((data: Partial<ArticleState>) => {
    setState((newState) => {
      return {
        ...newState,
        ...data
      }
    })
  }, [])

  const setDialogShow = useCallback((id: number)=> {
    setDialogId(id);
    let ele = document.body;
    if (isAndroid()) {
      ele = document.documentElement;
    }
 
    if (state.isEditor) {
      ele = document.getElementById(APP_EDITOR_CONTAINER_ID)!;
      // id && ele.children[0]!.scrollIntoView();
    }
    if (id) {
      lockContaier(ele);
    } else {
      unlockContaier(ele);
    }
  }, [state.isEditor])


  return {
    ...state,
    dialogId,
    // method
    initData,
    addItem,
    updateItem,
    setTarget,
    updateStyle,
    updateValue,
    updateValueById,
    updateLink,
    updateAction,
    updateVariable,
    updatePicture,
    updateTitle,
    updateVariableValue,
    getElementListByVariable,
    deleteItem,
    copyItem,
    setData,
    setFocusNextSibling,
    setFocusSon,
    setFocusParent,
    switchPosition,
    setDialogShow,
    // computed
    focusElement,
    dialogList,
    dialogElement
  }
}



export type ArticleState = {
  title: string;
  picture: string;
  articleId: number;
  list: INodeItem[];
  focusId: string;
  loading: boolean;
  tagId: number;
  isEditor: boolean
};


function createItem(action: CreateElementAction) {
  const component = Object.values(componentMap).find(item => {
    return item.type === action.type;
  });
  if (component) {
    return component.create(action.payload);
  }
  throw new Error('没有匹配的组件');
}

/**
   * 获取选中元素
   * @param elements
   * @param id
   */
function getElementById(elements: INodeItem[], id: string): INodeItem | null {
  const ids = id.split('_');
  let findElement: INodeItem | undefined = elements[0];
  let currentId = ids.shift();
  if (currentId !== getEndIndex(findElement.id)) return null;

  while (ids.length) {
    if (!findElement) break;
    currentId = ids.shift();
    findElement = findElement.children.find(item => getEndIndex(item.id) === currentId);
  }

  if (findElement && findElement.id === id) {
    return findElement;
  }
  return null
}

function getElementsByVariable(
    elements: INodeItem[],
    variable: string
): INodeItem[] {
  const targets: INodeItem[] = [];
  const findByVariable = (element: INodeItem) => {
    if (element.data.variable) {
      const { group, name } = getTextFormat(element.data.variable)
      if (
        group === getTextFormat(variable).group &&
        name === getTextFormat(variable).name
      ) {
        targets.push(element);
        return;
      }
    }

    element.children.forEach(item => {
      findByVariable(item);
    });
  };
  elements.forEach(item => findByVariable(item));
  return targets;
}

export type CreateElement<T extends INodeItem> = {
  nodeItem: T;
};

export type CrateNodeAction<
  T extends NodeType | CustomComponentType,
  P extends any = any
  > = P extends undefined ? { type: T; payload?: P } : { type: T; payload: P };

export function getTextFormat(str: string | undefined) {
  const arr = typeof str === 'string' ? str.split('-') : [];
  return {
    group: arr[0] as IComponentActionMapKey,
    name: arr[1] || ''
  };
}

export function setTextFormat(group?: string, name: string = '') {
  if (!group) return undefined;
  return group + '-' + name;
}

export function getEndIndex(id: string) {
  return id.split('_')[id.split('_').length - 1];
}

export function getPostTemplete(list: ArticleState['list']) {
  const newList = _.cloneDeep(list);

  const deleteByDeep = (listArr: INodeItem[]) => {
    listArr.forEach(item => {
      delete item.parent;
      deleteByDeep(item.children);
    })
  }
  deleteByDeep(newList);
  return newList;

}

const setElementId = (child: INodeItem, parent: INodeItem|null) => {
  child.id = parent ? (parent.id + '_' + _.uniqueId()) : _.uniqueId();
  child.children.forEach((item) => {
    item.parent = child;
    setElementId(item, child);
  });
};
