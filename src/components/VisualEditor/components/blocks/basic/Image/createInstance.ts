import { BlockType } from '@VisualEditor/constants';
import { IImage } from '.';

export function createInstance(): IImage {
  return {
    type: BlockType.IMAGE,
    data: {
      value: 'http://assets.maocanhua.cn/FkWeSH88STspyZduGtyjYMt4InP4'
    },
    style: {
      width: 375,
      height: 100,
    },
    children: []
  };

}