import { BlockType } from '@VisualEditor/constants';

export function createInstance() {
  return {
    type: BlockType.PAGE,
    data: {
      value: ''
    },
    style: {
      width: 375,
      height: 100,
      backgroundColor: '#fff',
      position: 'relative'
    },
    children: []
  };

}