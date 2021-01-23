import React from 'react';
import styles from './index.module.scss';
import { InputNumber } from 'antd';
import { INodeStyle } from '@/components/templete/templete.type';
import _ from 'lodash';
import { ITurntable } from '../../turntable';

type IProps = {
	target: ITurntable;
	onChangeStyle: <T extends keyof INodeStyle>(
		property: T,
		value: string | number
	) => void;
	onChangeValue: (value: ITurntable['data']['value']) => void;
	onChangeLink: (value: string) => void;
};

export function Config(props: IProps) {
  const { target, onChangeValue } = props;
  const { value } = target.data;

  const setTurnableValue = (property: keyof ITurntable['data']['value'], data: any) => {
    value[property] = data;
    onChangeValue(value);
  };


  return (
    <div className={styles.property}>
      <div className={styles.listItem}>
        <div className={styles.key}>外圆半径：</div>
        <InputNumber
          min={0}
          className={styles.value}
          value={value.outsideRadius}
          onChange={value => setTurnableValue('outsideRadius', value!)}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>內圆半径：</div>
        <InputNumber
          min={0}
          className={styles.value}
          value={value.insideRadius}
          onChange={value => setTurnableValue('insideRadius', value!)}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>图片大小：</div>
        <InputNumber
          min={0}
          className={styles.value}
          value={value.bitmapSize}
          onChange={value => setTurnableValue('bitmapSize', value!)}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>转速：</div>
        <InputNumber
          min={1}
          className={styles.value}
          value={value.speed}
          onChange={value => setTurnableValue('bitmapSize', value!)}
        />
      </div>
    </div>
  );
}
