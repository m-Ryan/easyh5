import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { ISliderNumber } from '../../slider-number';
type IProps = {
	element: ISliderNumber;
};

export function Preview(props: IProps) {
  const { data, style } = props.element;
  const { value } = data;
  const [num, setNum] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNum(num => num - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div style={{ ...{ display: 'flex', justifyContent: 'center' }, ...style }}>
      {num
          .toString()
          .split('')
          .map((item, index) => (
            <SliderNumberItem key={index} currentNumber={Number(item)} />
          ))}
    </div>
  );
}

type ISliderNumberItem = {
	currentNumber: number;
};
function SliderNumberItem({ currentNumber }: ISliderNumberItem) {
  const numbers = new Array(10).fill(true).map((item, index) => index);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(-${currentNumber}0%)`;
    }
  });

  return (
    <div className={styles.showPoint}>
      <div className={styles.wrap} ref={ref}>
        {numbers.map((item, index) => {
          return (
            <div key={index} className={styles.pointItem}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
