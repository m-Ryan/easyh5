import { BlockType, BasicType, PAGE_IDX } from '../constants';
import { cloneDeep, get, set } from 'lodash';
import { INodeItem } from '../typings';
import { getBlockByType } from '../components/core/blocks';
import { useCallback } from 'react';
import { message } from 'antd';
import { getIndexByIdx, getPageIdx, getParentIdx, getValueByIdx } from '@/utils/block';
import { createBlockItem } from '@/utils/createBlockItem';
import { useEditorContext } from './useEditorContext';
import { IPage } from '@/components/core/blocks/basic/Page';

export function useBlock() {

  const { values, setValues, getFieldHelpers, setFormikState, handleChange } = useEditorContext();

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const addBlock = useCallback((params: { type: BlockType, parentIdx: string; positionIndex?: number; }) => {
    let { type, parentIdx, positionIndex } = params;

    setFormikState((formState) => {
      let parent = get(formState.values, parentIdx) as INodeItem | null;
      const child = createBlockItem(type);
      if (type === BasicType.DIALOG) {
        parentIdx = getPageIdx(formState.values.pageIndex);
        parent = get(formState.values, parentIdx);
        set(formState.values, 'dialogUid', child.data.value.uid);
      }
      if (!parent) {
        throw new Error('无效节点');
      }

      const block = getBlockByType(type);
      const parentBlock = getBlockByType(parent.type);

      if (!parentBlock.validChildrenType.includes(type)) {
        message.warning(`${block.name} 不能嵌套在 ${parentBlock.name} 下面`);
        return formState;
      }
      if (typeof positionIndex === 'undefined') {
        positionIndex = parent.children.length;
      }

      parent.children.splice(positionIndex!, 0, child);
      set(formState.values, parentIdx, { ...parent });
      formState.values.focusIdx = `${parentIdx}.children.[${positionIndex}]`;

      return { ...formState };
    });

  }, [setFormikState]);

  const copyBlock = useCallback((idx: string) => {

    setFormikState((formState) => {
      const parentIdx = getParentIdx(idx);
      const parent = get(formState.values, getParentIdx(idx) || '');
      if (!parent) {
        throw new Error('未找到插入的父节点');
      }
      const copyBlock = cloneDeep(get(formState.values, idx));

      parent.children.push(copyBlock);
      formState.values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;
      return { ...formState };
    });

  }, [setFormikState]);

  const removeBlock = useCallback((idx: string) => {
    setFormikState((formState) => {
      const block = getValueByIdx(values, idx);
      if (!block) {
        throw new Error('无效节点');
      }
      const parentIdx = getParentIdx(idx);
      const parent = get(formState.values, getParentIdx(idx) || '') as INodeItem | null;
      const blockIndex = getIndexByIdx(idx);
      if (!parentIdx || !parent) {
        if (block.type !== BasicType.PAGE) {
          message.warning('页面节点不能删除');
          return formState;
        }
        throw new Error('未找到父节点');
      }

      parent.children.splice(blockIndex, 1);
      set(values, parentIdx, { ...parent });
      values.focusIdx = parentIdx;
      return { ...formState };
    });
  }, [setFormikState, values]);

  const setValueByIdx = useCallback(<T extends any>(idx: string, newVal: INodeItem<T>) => {
    getFieldHelpers(idx).setValue(newVal);
  }, [getFieldHelpers]);

  const moveByIdx = useCallback((sourceIdx: string, destinationIdx: string) => {

    setFormikState((formState) => {
      const sourceIndex = getIndexByIdx(sourceIdx);
      const destinationIndex = getIndexByIdx(destinationIdx);

      const sourceParentIdx = getParentIdx(sourceIdx);
      const destinationParentIdx = getParentIdx(destinationIdx);

      if (!sourceParentIdx || !destinationParentIdx) {
        console.log(sourceIdx, destinationIdx);
        message.warning('未找到父级');
        return formState;
      }

      const sourceParent = get(formState.values, sourceParentIdx) as INodeItem;
      const destinationParent = get(formState.values, sourceParentIdx) as INodeItem;

      const [removed] = sourceParent.children.splice(Number(sourceIndex), 1);
      destinationParent.children.splice(Number(destinationIndex), 0, removed);

      set(formState.values, sourceParentIdx, sourceParent);
      set(formState.values, destinationParentIdx, destinationParent);
      set(formState.values, 'focusIdx', destinationIdx);
      return { ...formState };
    });
  }, [setFormikState]);

  const isExistBlock = useCallback((idx: string) => {
    return Boolean(get(values, idx));
  }, [values]);

  const setFocusIdx = useCallback(
    (idx: string) => {
      setFormikState((formState => {
        if (formState.values.focusIdx === idx) {
          return formState;
        }
        formState.values.focusIdx = idx;
        return { ...formState };
      }));
    },
    [setFormikState]
  );

  return {

    values,
    pageValue: get(values, PAGE_IDX) as IPage,
    focusIdx,
    focusBlock,
    setValueByIdx,
    addBlock,
    copyBlock,
    removeBlock,
    setFocusIdx,
    moveByIdx,
    isExistBlock,
    setFormikState,
    setValues,
    handleChange,
  };
}
