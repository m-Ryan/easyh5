import { useFormik, useFormikContext } from 'formik';
import { BlockType } from '../constants';
import { get, set, values } from 'lodash';
import { IBlock, INodeItem } from '../templete.type';
import { BlocksMap } from '../components/blocks';
import { useCallback, useMemo } from 'react';
import { ITemplate } from '@/store/template';

function createItem<T extends any>(type: BlockType, payload?: T): INodeItem {

  const component = Object.values(BlocksMap).find(item => {
    return item.config.type === type;
  });
  if (component) {
    return component.create(payload);
  }
  throw new Error('没有匹配的组件');
}

export function useTemplate() {

  const { values, setValues, getFieldHelpers, } = useFormikContext<ITemplate>();

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const addBlock = (type: BlockType, parentIdx: string) => {

    const parent = get(values, parentIdx) as INodeItem | null;
    if (!parent) {
      throw new Error('无效节点');
    }

    const child = createItem(type);
    parent.children.push(child);
    values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;
    setValues(values);
  };


  const removeBlock = () => {

  };

  const getValueByIdx = <T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, idx);
  };

  const setValueByIdx = <T extends any>(idx: string, newVal: INodeItem<T>) => {
    getFieldHelpers(idx).setValue(newVal);
  };

  const getParentByIdx = <T extends any>(idx: string): INodeItem<T> | null => {
    const parentIdx = idx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
    if (!parentIdx) return null;
    return get(values, parentIdx);
  };

  const swapByIdx = (sourceIdx: string, destinationIdx: string) => {

    const sourceIndex = Number(sourceIdx.match(/\.\[(\d+)\]$/)?.[1]);
    const destinationIndex = Number(destinationIdx.match(/\.\[(\d+)\]$/)?.[1]);

    const sourceParentIdx = sourceIdx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
    const destinationParentIdx = destinationIdx.match(/(.*)\.children\.\[\d+\]$/)?.[1];

    if (!sourceParentIdx || !destinationParentIdx) {
      throw new Error('未找到父级');
    }

    if (sourceParentIdx !== destinationParentIdx) {
      throw new Error('必须是同一个父级');
    }

    const parent = get(values, sourceParentIdx) as INodeItem;

    const [removed] = parent.children.splice(Number(sourceIndex), 1);
    parent.children.splice(Number(destinationIndex), 0, removed);

    set(values, sourceParentIdx, parent);
    set(values, 'focusIdx', destinationIdx);
    setValues(values);
  };

  const setFocusIdx = useCallback((idx: string) => {
    getFieldHelpers('focusIdx').setValue(idx);
  }, [getFieldHelpers]);


  return {
    getValueByIdx,
    setValueByIdx,
    addBlock,
    removeBlock,
    focusIdx,
    focusBlock,
    setFocusIdx,
    swapByIdx,
    getParentByIdx
  };

}