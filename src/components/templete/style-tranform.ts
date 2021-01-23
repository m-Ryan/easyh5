import { INodeItem } from '@/components/templete/templete.type';
import styleMap from './style-map.json';
import _ from 'lodash';
/**
 *
 * @param list
 */
export function toZipStyle(list: INodeItem[]) {
  const data = _.cloneDeep(list);

  const tranformStyle = (arr: INodeItem[]) => {
    arr.forEach(item => {
      delete item.parent;
      Object.keys(item.style).forEach(property => {
        for (const key in styleMap) {
          if (styleMap[key] === property) {
            item.style[key] = item.style[property];
            delete item.style[property];
            continue;
          }
        }
      });
      tranformStyle(item.children);
    });
  };

  tranformStyle(data);
  return JSON.stringify(data);
}
/**
 *
 * @param list
 */
export function unZipStyle(list: INodeItem[]) {
  const data = _.cloneDeep(list);

  const tranformStyle = (arr: INodeItem[]) => {
    arr.forEach(item => {
      Object.keys(item.style).forEach(property => {
        if (styleMap[property]) {
          item.style[styleMap[property]] = item.style[property];
          delete item.style[property];
        }
      });
      tranformStyle(item.children);
    });
  };

  tranformStyle(data);
  return data;
}
