import { ITemplate } from '@/store/template';
import { INodeItem } from '@/typings';
import { get } from 'lodash';
import { BlocksMap } from '../components/core/blocks';
import { BlockType } from '../constants';

export function findBlockByType(type: BlockType) {
  return Object.values(BlocksMap).find(child => {
    return child?.type === type;
  });
}

export const getIndexByIdx = (idx: string) => {
  return Number(idx.match(/\.\[(\d+)\]$/)?.[1]);
};

export const getParentIdx = (idx: string) => {
  return idx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
};

export const getValueByIdx = <T extends any>(values: ITemplate, idx: string): INodeItem<T> | null => {
  return get(values, idx);
};

export const getParentByIdx = <T extends any>(values: ITemplate, idx: string): INodeItem<T> | null => {
  return get(values, getParentIdx(idx) || '');
};

export const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => `[${Number(index) + num}]`);
};