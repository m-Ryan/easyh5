import { BlockType } from '@VisualEditor/constants';

export function createInstance() {
  return {
    type: BlockType.SECTION,
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