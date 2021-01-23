import React, { useState, useCallback } from 'react';
import { INodeItem } from '@/components/templete/templete.type';
import { componentMap } from '../components';
import { NodeType } from '../constants';
import { useSelector } from '@/modal';
import { actionBus } from '../actionBus';
import { getTextFormat } from '@/modal/useArticle';

interface RenderPreviewItemProps { list: INodeItem<any>[] }

export const RenderPreviewItem = ({ list }: RenderPreviewItemProps) => {
  const article = useSelector('article');

  const onAction = useCallback((
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: INodeItem
  ) => {
    const link = item.data.link;
    if (link) {
      window.location.assign(link);
    } else {
      const action = item.data.action;
      if (!action) return;
      const { group, name } = getTextFormat(action);
      event.preventDefault();
      event.stopPropagation();
      actionBus.emit(action, { name, extra: { event, item } });

    }
  }, []);

  return (
    <>
      {
        list.map((item, index) => {
          const component = Object.values(componentMap).find(child => {
            return child.type === item.type;
          });
          if (component) {
            if (component.type === NodeType.BLOCK) {
              return React.createElement(component.Preview as any, {
                element: item,
                renderItem: RenderPreviewItem,
                key: index,
                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  onAction(e, item)
              });
            } else {
              return React.createElement(component.Preview as any, {
                element: item,
                key: index,
                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  onAction(e, item)
              });
            }
          }
          return null;
        })
      }
    </>
  );
};
