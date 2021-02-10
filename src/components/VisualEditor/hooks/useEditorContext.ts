import { useFormikContext } from 'formik';
import { BlockType } from '../constants';
import { cloneDeep, get, set } from 'lodash';
import { INodeItem } from '../typings';
import { BlocksMap } from '../components/blocks';
import { useCallback } from 'react';
import { ITemplate } from '@/store/template';

function createItem<T extends INodeItem>(
  type: BlockType,
  payload?: T
): INodeItem {
  const component = Object.values(BlocksMap).find((item) => {
    return item.type === type;
  });
  if (component) {
    return component.createInstance(payload);
  }
  throw new Error('没有匹配的组件');
}

export function useEditorContext() {
  const { values, setValues, getFieldHelpers } = useFormikContext<ITemplate>();

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const getIndexByIdx = (idx: string) => {
    return Number(idx.match(/\.\[(\d+)\]$/)?.[1]);
  };

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

  const copyBlock = (idx: string) => {
    const parentIdx = getParentIdx(idx);
    const parent = getParentByIdx(idx);
    if (!parent) {
      throw new Error('未找到插入的父节点');
    }
    const copyBlock = cloneDeep(get(values, idx));

    parent.children.push(copyBlock);
    values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;
    setValues(values);
  };

  const removeBlock = (idx: string) => {
    const parentIdx = getParentIdx(idx);
    const parent = getParentByIdx(idx);
    const blockIndex = getIndexByIdx(idx);
    if (!parentIdx || !parent) {
      throw new Error('未找到父节点');
    }

    parent.children.splice(blockIndex, 1);
    values.focusIdx = parentIdx;
    setValues(values);
  };

  const getValueByIdx = <T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, idx);
  };

  const setValueByIdx = <T extends any>(idx: string, newVal: INodeItem<T>) => {
    getFieldHelpers(idx).setValue(newVal);
  };

  const getParentIdx = (idx: string) => {
    return idx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
  };

  const getParentByIdx = <T extends any>(idx: string): INodeItem<T> | null => {
    const parentIdx = getParentIdx(idx);
    if (!parentIdx) return null;
    return get(values, parentIdx);
  };

  const getSiblingIdx = (sourceIndex: string, num: number) => {
    return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => `[${Number(index) + num}]`);
  };

  const moveByIdx = (sourceIdx: string, destinationIdx: string) => {
    const sourceIndex = getIndexByIdx(sourceIdx);
    const destinationIndex = getIndexByIdx(destinationIdx);

    const sourceParentIdx = sourceIdx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
    const destinationParentIdx = destinationIdx.match(
      /(.*)\.children\.\[\d+\]$/
    )?.[1];

    if (!sourceParentIdx || !destinationParentIdx) {
      throw new Error('未找到父级');
    }

    const sourceParent = get(values, sourceParentIdx) as INodeItem;
    const destinationParent = get(values, sourceParentIdx) as INodeItem;

    const [removed] = sourceParent.children.splice(Number(sourceIndex), 1);
    destinationParent.children.splice(Number(destinationIndex), 0, removed);

    set(values, sourceParentIdx, sourceParent);
    set(values, destinationParentIdx, destinationParent);
    set(values, 'focusIdx', destinationIdx);
    setValues(values);
  };

  const isExistBlock = (idx: string) => {
    return Boolean(get(values, idx));
  };

  const setFocusIdx = useCallback(
    (idx: string) => {
      getFieldHelpers('focusIdx').setValue(idx);
    },
    [getFieldHelpers]
  );

  return {
    getValueByIdx,
    setValueByIdx,
    addBlock,
    copyBlock,
    removeBlock,
    focusIdx,
    focusBlock,
    setFocusIdx,
    moveByIdx,
    getParentIdx,
    getParentByIdx,
    getSiblingIdx,
    isExistBlock
  };
}
