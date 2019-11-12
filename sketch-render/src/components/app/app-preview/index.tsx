import React from 'react';
import styles from './index.module.scss';

import { NodeType, INodeItem } from '@/typings/ISketckItem';
import { AppState } from '@/store/reducers';
import { useSelector } from 'react-redux';
import { Bitmap } from './components/bitmap';
import { Text } from './components/text';


export const AppPreview = ()=> {
  const article = useSelector((state: AppState) => state.article);
  const { list } =  article;
  const renderItem = (parents: INodeItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case NodeType.BITMAP:
          return <Bitmap key={index} element={item} />;
        case NodeType.TEXT:
          return <Text key={index} element={item} />;
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
