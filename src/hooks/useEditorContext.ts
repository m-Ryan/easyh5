import { useField, useFormikContext } from 'formik';
import { BlockType, BasicType } from '../constants';
import { cloneDeep, get, set } from 'lodash';
import { INodeItem, RecursivePartial } from '../typings';
import { BlocksMap, getBlockByType } from '../components/core/blocks';
import { useCallback } from 'react';
import { ITemplate } from '@/store/template';
import { IPage } from '@/components/core/blocks/basic/Page';
import { message } from 'antd';
import { getIndexByIdx, getParentIdx, getValueByIdx } from '@/utils/block';

function createItem<T extends INodeItem>(
  type: BlockType,
  payload?: RecursivePartial<T>
): INodeItem {
  const component = Object.values(BlocksMap).find((item) => {
    return item.type === type;
  });
  if (component) {
    return component.createInstance(payload as any);
  }
  throw new Error('没有匹配的组件');
}

export function useEditorContext() {
  const pageIdx = 'content.[0]';
  const [{ value: pageValue }] = useField<IPage>(pageIdx);
  const formikContext = useFormikContext<ITemplate>();
  const { values, setValues, getFieldHelpers, setFormikState, handleChange } = formikContext;

  const focusIdx = values.focusIdx;
  const focusBlock = get(values, focusIdx) as INodeItem | null;

  const addBlock = useCallback((params: { type: BlockType, parentIdx: string; positionIndex?: number; }) => {
    let { type, parentIdx, positionIndex } = params;

    setFormikState((formState) => {
      let parent = get(formState.values, parentIdx) as INodeItem | null;
      const child = createItem(type);
      if (type === BasicType.DIALOG) {
        parentIdx = 'content.[0]';
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
      } else {
        console.log('相切', params);
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
    setValueByIdx,
    addBlock,
    copyBlock,
    removeBlock,
    focusIdx,
    focusBlock,
    setFocusIdx,
    moveByIdx,
    isExistBlock,
    values,
    setFormikState,
    setValues,
    pageValue,
    handleChange,
  };
}
