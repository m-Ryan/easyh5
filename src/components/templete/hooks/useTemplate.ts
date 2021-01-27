import { useFormik, useFormikContext } from 'formik';
import { BlockType } from '../constants';
import { get, set } from 'lodash';
import { INodeItem } from '../templete.type';
import { BlocksMap } from '../components/blocks';

function createItem<T extends any>(type: BlockType, payload?: T): INodeItem {
  const component = Object.values(BlocksMap).find(item => {
    return item.config.type === type;
  });
  if (component) {
    return component.create(payload).nodeItem;
  }
  throw new Error('没有匹配的组件');
}

export function useTemplate() {

  const { values, setValues } = useFormikContext<INodeItem[]>();

  const addBlock = (type: BlockType, parentIdx: string) => {
    const parent = get(values, parentIdx) as INodeItem | null;
    if (!parent) {
      throw new Error('无效节点');
    }

    const child = createItem(type);
    parent.children.push(child);
    setValues(values);
  };


  const removeBlock = () => {

  };

  return {
    addBlock,
    removeBlock
  };

}