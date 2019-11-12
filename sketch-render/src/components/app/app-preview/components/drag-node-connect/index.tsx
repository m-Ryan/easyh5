import React from 'react';
import styles from './index.module.scss';

import { NodeType, INodeItem, INodeStyle } from '@/typings/ISketckItem';
import { useAppDispatch, AppState } from '@/store/reducers';
import { ArticleType } from '@/store/article';
import { useSelector } from 'react-redux';
import { IDragNodeItemProps, DragNodeItem } from '../drag-node-item';


export const DragNodeConnect = ({ children, element, }: { children: React.ReactElement, element: INodeItem, }) => {
  const article = useSelector((state: AppState) => state.article);
  const { focusId } = article;
  const dispatch = useAppDispatch()

  const onFocus = (item: INodeItem) => {
    dispatch({
      type: ArticleType.ARTICLE_SET_TARGET,
      payload: {
        focusId: item.id
      }
    })
  }

  const onMouseDown = (event: MouseEvent) => {
		onFocus(element);
	}

  const onChangeStyle = <T extends keyof INodeStyle>(property: T, value: any) => {
    dispatch({
      type: ArticleType.ARTICLE_SET_STYLE,
      payload: [property, value]
    });
  };

  const onResizeStop = (width: number, height: number) => {
    onChangeStyle('width', width);
    onChangeStyle('height', height);
  };

  const onDragStop = (left: number, top: number) => {
    onChangeStyle('left', left);
    onChangeStyle('top', top);
  };


  return (
    <DragNodeItem  onResizeStop={onResizeStop} onDragStop={onDragStop} focusId={focusId} element={element}>
      {
        React.createElement(children.type, {
          ...children.props,
          draggable: false,
          onMouseDown,
          style: {
            ...element.style,
            left: 0,
            top: 0
          }
        })
      }
    </DragNodeItem>
  )
}
