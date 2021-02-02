import { BlockType } from '@VisualEditor/constants';

export function createInstance() {
  return {
    type: BlockType.TEXT,
    data: {
      value: '纯文本'
    },
    style: {
      width: '100%',
      zIndex: 1,
      position: 'relative',
      fontSize: 14,
      left: 0,
      top: 0,
    },
    children: []
  };

}