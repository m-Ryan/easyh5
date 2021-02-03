import { BlockType } from '@VisualEditor/constants';

export function createInstance() {
  return {
    type: BlockType.PAGE,
    data: {
      value: '',
    },
    style: {
      width: '100%',
      height: 'auto',
      minHeight: '100%',
      backgroundColor: '#fff',
      position: 'relative',
      fontSize: '14px',
    },
    children: [],
  };
}
