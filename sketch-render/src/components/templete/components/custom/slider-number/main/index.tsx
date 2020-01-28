import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { PREVIEW_COMPONENT_DATA_TYPE } from '@/constants';
import { ISliderNumber } from '../../slider-number';
import { DragNode } from '../../../../drag-node';
import { CustomComponentType } from '@/components/templete/constants';
type IProps = {
  element: ISliderNumber;
};

export function Main(props: IProps) {
  const { data, style } = props.element;
  const { value } = data;
  return (
    <DragNode element={props.element}>
      <div
        style={{ ...style, display: 'flex', justifyContent: 'center' }}
        {...{ [PREVIEW_COMPONENT_DATA_TYPE]: CustomComponentType.SliderNumber }}
      >
        {value
            .toString()
            .split('')
            .map((item, index) => (
              <SliderNumberItem key={index} currentNumber={Number(item)} />
            ))}
      </div>
    </DragNode>
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
