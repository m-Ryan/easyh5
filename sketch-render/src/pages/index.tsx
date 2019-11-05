import React from 'react';
import styles from './index.module.scss';
import 'antd/dist/antd.css';
import sketchJson from '../output.json';
import { ISketchItem, SketchClassType } from '@/typings/ISketckItem';

const onFocus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const target = event.target as HTMLDivElement;
  target.classList.add(styles.focus);
  console.log(target)
}

const App: React.FC = () => {

  const renderItem = (parents: ISketchItem[]) => {
    return parents.map((item, index) => {

      switch (item.type) {
        case SketchClassType.BITMAP:
          return <img src={item.value} style={item.style} alt="" />;
        case SketchClassType.TEXT:
          return <span style={item.style}>{item.value}</span>;
        default:
          return (
            <div onClick={onFocus} key={index} style={item.style}>
              {
                item.children.length > 0
                  ? (
                    renderItem(item.children)
                  )
                  : null
              }
              {
                item.value ? <span>{item.value}</span> : null
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
            renderItem(sketchJson as any)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
