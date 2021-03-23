
import { IPage } from '@/components/core/blocks/basic/Page';
import { IBlockData } from '@/typings';
import { get } from 'lodash';
import { BlocksMap } from '../components/core/blocks';
import { BlockType } from '../constants';

export function getPageIdx(index: number) {
  return `pages.[${index}]`;
}

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

export const getValueByIdx = <T extends any>(values: { pages: IPage[]; }, idx: string): IBlockData<T> | null => {
  return get(values, idx);
};

export const getParentByIdx = <T extends any>(values: { pages: IPage[]; }, idx: string): IBlockData<T> | null => {
  return get(values, getParentIdx(idx) || '');
};

export const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => {
    if (Number(index) + num < 0) return '[0]';
    return `[${Number(index) + num}]`;
  });
};
