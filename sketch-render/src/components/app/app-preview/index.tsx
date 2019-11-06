import React from 'react';
import styles from './index.module.scss';
import { SketchClassType } from '@/typings/ISketckItem';
import { DragElement } from '@/components/drag-element';
import {observer} from 'mobx-react';
import { modal } from '@/modal';
import { IElementItem } from '@/modal/app';

const onFocus = (event: any, item: IElementItem) => {
  event.stopPropagation();
  const target = event.target as HTMLElement;
  new DragElement({ element: target, initX: event.pageX, initY: event.pageY });
  modal.app.setTargetElement(item);
}

export const AppPreview = observer(()=> {
  const elements = modal.app.elements.slice();
  const renderItem = (parents: IElementItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case SketchClassType.BITMAP:
          return <img onMouseDown={(event)=>onFocus(event, item)} key={index} src={item.value} style={{...item.style}} alt="" />;
        case SketchClassType.TEXT:
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
            renderItem(elements)
          }
        </div>
      </div>
    </div>
  );
})
