import { BlockType } from '@VisualEditor/constants';
import { IBox } from '.';


export function createInstance(): IBox {
  return {
    type: BlockType.BOX,
    data: {
      value: ''
    },
    style: {
      width: 375,
      height: 100,
      backgroundColor: '#fafafa',
    },
    children: []
  };

}