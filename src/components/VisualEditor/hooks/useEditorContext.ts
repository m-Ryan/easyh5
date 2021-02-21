import { useField, useFormikContext } from 'formik';
import { BlockType } from '../constants';
import { cloneDeep, get, set } from 'lodash';
import { INodeItem } from '../typings';
import { BlocksMap } from '../components/blocks';
import { useCallback } from 'react';
import { ITemplate } from '@/store/template';
import { IPage } from '@VisualEditor/components/blocks/basic/Page';

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

const getIndexByIdx = (idx: string) => {
  return Number(idx.match(/\.\[(\d+)\]$/)?.[1]);
};

const getParentIdx = (idx: string) => {
  return idx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
};

const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => `[${Number(index) + num}]`);
};

export function useEditorContext() {
  const pageIdx = 'content.[0]';
  const [{ value: pageValue }] = useField<IPage>(pageIdx);
  const { values, setValues, getFieldHelpers } = useFormikContext<ITemplate>();

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const getParentByIdx = useCallback(<T extends any>(idx: string): INodeItem<T> | null => {
    const parentIdx = getParentIdx(idx);
    if (!parentIdx) return null;
    return get(values, parentIdx);
  }, [values]);

  const addBlock = useCallback((type: BlockType, parentIdx: string) => {
    let parent = get(values, parentIdx) as INodeItem | null;
    const child = createItem(type);
    if (type === BlockType.DIALOG) {
      parentIdx = 'content.[0]';
      parent = get(values, parentIdx);
      set(values, 'dialogUid', child.data.value.uid);
    }
    if (!parent) {
      throw new Error('无效节点');
    }

    if (parent.type === BlockType.TEXT) return;

    parent.children = [...parent.children, child];
    set(values, parentIdx, { ...parent });
    values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;
    setValues({ ...values });
  }, [setValues, values]);

  const copyBlock = useCallback((idx: string) => {
    const parentIdx = getParentIdx(idx);
    const parent = getParentByIdx(idx);
    if (!parent) {
      throw new Error('未找到插入的父节点');
    }
    const copyBlock = cloneDeep(get(values, idx));

    parent.children.push(copyBlock);
    values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;
    setValues(values);
  }, [getParentByIdx, setValues, values]);

  const removeBlock = useCallback((idx: string) => {
    const parentIdx = getParentIdx(idx);
    const parent = getParentByIdx(idx);
    const blockIndex = getIndexByIdx(idx);
    if (!parentIdx || !parent) {
      throw new Error('未找到父节点');
    }

    parent.children.splice(blockIndex, 1);
    set(values, parentIdx, { ...parent });
    values.focusIdx = parentIdx;
    setValues(values);
  }, [getParentByIdx, setValues, values]);

  const getValueByIdx = useCallback(<T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, idx);
  }, [values]);

  const setValueByIdx = useCallback(<T extends any>(idx: string, newVal: INodeItem<T>) => {
    getFieldHelpers(idx).setValue(newVal);
  }, [getFieldHelpers]);

  const moveByIdx = useCallback((sourceIdx: string, destinationIdx: string) => {
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
  }, [setValues, values]);

  const isExistBlock = useCallback((idx: string) => {
    return Boolean(get(values, idx));
  }, [values]);

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
    isExistBlock,
    values,
    setValues,
    pageValue
  };
}
