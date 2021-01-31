import { BlocksMap } from '../components/blocks';
import { BlockType } from '../constants';

export function findBlockByType(type: BlockType) {
  return Object.values(BlocksMap).find(child => {
    return child.config.type === type;
  });
}