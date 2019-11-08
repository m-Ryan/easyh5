import React from 'react';
import styles from './index.module.scss';

import { ElementType, IElementItem } from '@/typings/ISketckItem';
import { useAppDispatch, useAppSelector } from '@/store/reducers';
import { ArticleType, asyncSetTarget } from '@/store/article';


export const AppPreview = ()=> {
  
  const list = useAppSelector(state => state.article.list);
  const dispatch = useAppDispatch()

  const onFocus = (event: React.MouseEvent<any, MouseEvent>, item: IElementItem) => {
    event.stopPropagation();
    dispatch(asyncSetTarget({ targetId: item.id, event }))
  }
  const renderItem = (parents: IElementItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case ElementType.BITMAP:
          return <img onMouseDown={(event)=>onFocus(event, item)} key={index} src={item.value} style={{...item.style}} alt="" />;
        case ElementType.TEXT:
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
