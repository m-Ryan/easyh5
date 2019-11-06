import React from 'react';
import styles from './index.module.scss';
import 'antd/dist/antd.css';
import sketchJson from '../output.json';
import { ISketchItem, SketchClassType } from '@/typings/ISketckItem';
import { unitConver } from '@/util/utils';
import { IElement } from '@/typings/IElement';
import { DragElement } from '@/components/drag-element';

const sketchElements = sketchJson as IElement[];

const tranformStyle = (child: IElement) => {
  const style = child.style;
  for (let key in style) {
    style[key] = unitConver(style[key], { times: 0.5 })
  }
  child.children.forEach(item => {
    tranformStyle(item);
  })
}

sketchElements.forEach(item => {
  tranformStyle(item); 
});



const onFocus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const target = event.target as HTMLDivElement;
  const renderStyleArr = target.style.cssText.split('; ').map(item=> {
    const css = item.split(': ');
    return {
      [css[0]]: css[1]
    }
  });
  const renderStyleObject: React.CSSProperties = {}
  renderStyleArr.forEach(item=> {
    Object.assign(renderStyleObject, item);
  })

  console.log(renderStyleArr, renderStyleObject)
  new DragElement({ element: target, initX: event.pageX, initY: event.pageY });
}

const App: React.FC = () => {

  const renderItem = (parents: ISketchItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case SketchClassType.BITMAP:
          return <img onMouseDown={onFocus} key={index} src={item.value} style={item.style} alt="" />;
        case SketchClassType.TEXT:
          return <span onMouseDown={onFocus} key={index} style={item.style}>{item.value}</span>;
        default:
          return (
            <div onMouseDown={onFocus} key={index} style={item.style}>
              {
                item.children.length > 0
                  ? (
                    renderItem(item.children)
                  )
                  : null
              }
              {
                item.value ? <span style={{}} onMouseDown={onFocus}>{item.value}</span> : null
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
            renderItem(sketchElements)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
