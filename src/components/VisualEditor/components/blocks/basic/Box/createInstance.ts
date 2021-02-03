import { BlockType } from '@VisualEditor/constants';
import { IBox } from '.';

export function createInstance(): IBox {
  return {
    type: BlockType.BOX,
    data: {
      value: '',
    },
    style: {
      width: 'auto',
      height: '100px',
      backgroundColor: '#fafafa',
    },
    children: [],
  };
}
