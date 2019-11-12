import React from 'react';
import styles from './index.module.scss';

import { NodeType, INodeItem, INodeStyle } from '@/typings/ISketckItem';
import { useAppDispatch, AppState } from '@/store/reducers';
import { ArticleType } from '@/store/article';
import { useSelector } from 'react-redux';
import { Bitmap } from './components/bitmap';


export const AppPreview = ()=> {
  const article = useSelector((state: AppState) => state.article);
  const list = article.list;
  const dispatch = useAppDispatch()

  const onFocus = (item: INodeItem) => {
    dispatch({
      type: ArticleType.ARTICLE_SET_TARGET,
      payload: {
        targetId: item.id
      }
    })
  }

  const onChangeStyle = <T extends keyof INodeStyle>(property: T, value: any) => {
		dispatch({
			type: ArticleType.ARTICLE_SET_STYLE,
			payload: [property, value]
		});
  };
  
  const onResizeStop = (width: number, height: number)=>{ 
    onChangeStyle('width', width);
    onChangeStyle('height', height);
  };

	const onDragStop = (left: number, top: number)=> {
    onChangeStyle('left', left);
    onChangeStyle('top', top);
  };

  const renderItem = (parents: INodeItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case NodeType.BITMAP:
          return <Bitmap onFocus={onFocus} onDragStop={onDragStop} onResizeStop={onResizeStop} key={index} element={item} />;
        case NodeType.TEXT:
          return <span key={index} style={{...item.style}}>{item.value}</span>;
        default:
          return (
            <div key={index} style={{...item.style}}>
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
