import React from 'react';
import styles from './index.module.scss';
import { ISwiper } from '../../swiper';
import { Carousel } from 'antd';

export interface ISwiperProps {
	element: ISwiper;
}

export function Preview(props: ISwiperProps) {
  const element = props.element;
  const { list } = element.data.value;
  const style = element.style;
  return (
    <div style={style}>
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
  );
}
