import React from 'react';
import styles from './index.module.scss';
import { Popover, Input, InputNumber } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeStyle } from '@/components/templete/templete.type';
import _ from 'lodash';
import { ICountdown } from '../../countdown';

type IProps = {
	target: ICountdown;
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
      <div className={styles.listItem}>
        <div className={styles.key}>透明度：</div>
        <InputNumber
          min={0}
          max={1}
          className={styles.value}
          value={style.opacity}
          onChange={value => onChangeStyle('opacity', value!)}
        />
      </div>

      <div className={styles.listItem}>
        <div className={styles.key}>背景颜色：</div>
        <Popover
          content={
            <SketchPicker
              color={style.backgroundColor}
              onChange={(color: ColorResult) =>
                changeColor(color, onChangeStyle)
              }
            />
          }
          title="颜色"
          trigger="click"
        >
          <div
            className={styles.colorBoard}
            style={{ backgroundColor: style.backgroundColor }}
          />
        </Popover>
      </div>
    </div>
  );
}
