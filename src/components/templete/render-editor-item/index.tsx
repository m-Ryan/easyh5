import React from 'react';
import { INodeItem } from '@/components/templete/templete.type';
import { componentMap } from '../components';
interface RenderEditorItemProps { list: INodeItem<any>[] }
export const RenderEditorItem = ({ list }: RenderEditorItemProps) => {
  return (
    <>
      {
        list.map((item, index) => {
          const component = Object.values(componentMap).find(child => {
            return child.type === item.type;
          });
          if (component) {
            return React.createElement(component.Main as any, {
              element: item,
              key: index,
              renderItem: RenderEditorItem
            })
          }
          return null;
        })
      }
    </>
  );
};
