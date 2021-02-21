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
  const { values, setValues, getFieldHelpers, setFormikState } = useFormikContext<ITemplate>();

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const getParentByIdx = useCallback(<T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, getParentIdx(idx) || '');
  }, [values]);

  const addBlock = useCallback((type: BlockType, parentIdx: string) => {
    setFormikState((formState) => {
      let parent = get(formState.values, parentIdx) as INodeItem | null;
      const child = createItem(type);
      if (type === BlockType.DIALOG) {
        parentIdx = 'content.[0]';
        parent = get(formState.values, parentIdx);
        set(formState.values, 'dialogUid', child.data.value.uid);
      }
      if (!parent) {
        throw new Error('无效节点');
      }

      if (parent.type === BlockType.TEXT) return formState;

      parent.children = [...parent.children, child];
      set(formState.values, parentIdx, { ...parent });
      formState.values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1}]`;

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
      const parentIdx = getParentIdx(idx);
      const parent = get(formState.values, getParentIdx(idx) || '') as INodeItem | null;
      const blockIndex = getIndexByIdx(idx);
      if (!parentIdx || !parent) {
        throw new Error('未找到父节点');
      }

      parent.children.splice(blockIndex, 1);
      set(values, parentIdx, { ...parent });
      values.focusIdx = parentIdx;
      return { ...formState };
    });
  }, [setFormikState, values]);

  const getValueByIdx = useCallback(<T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, idx);
  }, [values]);

  const setValueByIdx = useCallback(<T extends any>(idx: string, newVal: INodeItem<T>) => {
    getFieldHelpers(idx).setValue(newVal);
  }, [getFieldHelpers]);

  const moveByIdx = useCallback((sourceIdx: string, destinationIdx: string) => {

    setFormikState((formState) => {
      const sourceIndex = getIndexByIdx(sourceIdx);
      const destinationIndex = getIndexByIdx(destinationIdx);

      const sourceParentIdx = sourceIdx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
      const destinationParentIdx = destinationIdx.match(
        /(.*)\.children\.\[\d+\]$/
      )?.[1];

      if (!sourceParentIdx || !destinationParentIdx) {
        throw new Error('未找到父级');
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
    setFormikState,
    setValues,
    pageValue
  };
}
