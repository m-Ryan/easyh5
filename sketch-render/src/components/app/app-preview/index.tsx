import React from 'react';
import styles from './index.module.scss';

import { NodeType, IElementItem } from '@/typings/ISketckItem';
import { useAppDispatch, AppState } from '@/store/reducers';
import { asyncSetTarget } from '@/store/article';
import { useSelector } from 'react-redux';


export const AppPreview = ()=> {
  const article = useSelector((state: AppState) => state.article);
  const list = article.list;
  const dispatch = useAppDispatch()

  const onFocus = (event: React.MouseEvent<any, MouseEvent>, item: IElementItem) => {
    event.stopPropagation();
    dispatch(asyncSetTarget({ targetId: item.id, event }))
  }
  const renderItem = (parents: IElementItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case NodeType.BITMAP:
          return <img onMouseDown={(event)=>onFocus(event, item)} key={index} src={item.value} style={{...item.style}} alt="" />;
        case NodeType.TEXT:
          return <span onMouseDown={(event)=>onFocus(event, item)} key={index} style={{...item.style}}>{item.value}</span>;
        default:
          return (
            <div onMouseDown={(event)=>onFocus(event, item)} key={index} style={{...item.style}}>
              {
                item.children.length > 0
                  ? (
                    renderItem(item.children)
                  )
                  : null
              }
              {
                item.value ? item.value : null
              }
            </div>
          )
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.appWrap}>
        <div className={styles.app}>
          {
            renderItem(list)
          }
        </div>
      </div>
    </div>
  );
}
