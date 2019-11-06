import React from 'react';
import styles from './index.module.scss';
import { SketchClassType } from '@/typings/ISketckItem';
import { onDrag } from '@/components/drag-element';
import {observer} from 'mobx-react';
import { modal } from '@/modal';
import { IElementItem } from '@/modal/app';

const onFocus = (event: any, item: IElementItem) => {
  event.stopPropagation();
  const target = event.target as HTMLElement;
  onDrag({ 
    element: target, 
    initX: event.pageX, 
    initY: event.pageY,
    onMove: (x, y)=> {
      modal.app.setTargetStyle('left', x);
      modal.app.setTargetStyle('top', y);
    }
  });
  modal.app.setTargetId(item.id);
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
