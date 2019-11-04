import React from 'react';
import styles from './index.module.scss';
import 'antd/dist/antd.css';
import sketchJson from './output.json';
import { ISketchItem } from './types';
const App: React.FC = () => {

  const renderItem = (parents: ISketchItem[]) => {
   return parents.map((item, index)=> (
      <div key={index} style={item.style}>
        {
          item.children.length > 0 
          ? (
            renderItem(item.children)
          )
          :  null
        }
      </div>
    ))
  }
  
  return (
    <div className={styles.sketch}>
      {
        renderItem(sketchJson)
      }
    </div>
  );
}

export default App;
