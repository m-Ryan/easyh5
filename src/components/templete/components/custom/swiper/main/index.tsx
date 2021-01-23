import React from 'react';
import styles from './index.module.scss';
import { ISwiper } from '../../swiper';
import { Carousel } from 'antd';
import { DragNode } from '../../../../drag-node';

export interface ISwiperProps {
	element: ISwiper;
}

export function Main(props: ISwiperProps) {
  const element = props.element;
  const { value } = element.data;
  const { list } = value;
  const style = element.style;
  return (
    <DragNode element={element}>
      <div>
        {list.length > 0 ? (
					<Carousel className={styles.container}>
					  {list.map((item, index) => {
					    return (
					      <div key={index} style={style}>
					        <img
					          style={{ width: style.width, height: style.height }}
					          src={item}
					          alt=""
					        />
					      </div>
					    );
					  })}
					</Carousel>
				) : null}
      </div>
    </DragNode>
  );
}
