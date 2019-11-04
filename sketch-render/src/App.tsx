import React from 'react';
import styles from './index.module.scss';
import 'antd/dist/antd.css';
import sketchJson from './output.json';
import { ISketchItem } from './types';

const onFocus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
  const target = event.target as HTMLDivElement;
  target.classList.add(styles.focus);
  console.log(target)
}

const App: React.FC = () => {

  const renderItem = (parents: ISketchItem[]) => {
    return parents.map((item, index) => (
      <div onClick={onFocus} key={index} style={item.style}>
        {
          item.children.length > 0
            ? (
              renderItem(item.children)
            )
            : null
        }
      </div>
    ))
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
      5666
    </div>
  );
}

export default App;
