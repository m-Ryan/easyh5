import React from 'react';
import styles from './index.module.scss';
import { Popover, Input, InputNumber } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeStyle } from '@/components/templete/templete.type';
import _ from 'lodash';
import { IScratchcard } from '../../scratchcard';

type IProps = {
	target: IScratchcard;
	onChangeStyle: <T extends keyof INodeStyle>(
		property: T,
		value: string | number
	) => void;
	onChangeValue: (text: string) => void;
	onChangeLink: (value: string) => void;
};

const changeColor = _.debounce(
    (color: ColorResult, onChangeStyle: IProps['onChangeStyle']) =>
      onChangeStyle(
          'backgroundColor',
          `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      )
);

export function Config(props: IProps) {
  const { target, onChangeStyle, onChangeValue } = props;
  const style = target.style;
  return (
    <div className={styles.property}>
      <div className={styles.listItem}>
        <div className={styles.key}>圆角：</div>
        <Input
          className={styles.value}
          value={style.borderRadius || 0}
          onChange={e => onChangeStyle('borderRadius', e.target.value)}
        />
      </div>
    </div>
  );
}
