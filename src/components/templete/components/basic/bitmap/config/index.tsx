import React from 'react';
import styles from './index.module.scss';
import { Popover, Input, InputNumber } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeStyle } from '@/components/templete/templete.type';
import { ImageUploader } from '@/components/image-uploader';
import _ from 'lodash';
import { IBitmap } from '../../bitmap';

type IProps = {
	target: IBitmap;
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
  const value = target.data.value;
  return (
    <div className={styles.property}>
      <div className={styles.title}>图片属性：</div>
      <div className={styles.textArea}>
        <ImageUploader
          url={value}
          onRemove={() => onChangeValue('')}
          onSuccess={(urls: string[]) => onChangeValue(urls[0])}
        />
      </div>
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
              color={style.backgroundColor || '#fff'}
              onChange={(color: ColorResult) =>
                changeColor(color, onChangeStyle)
              }
            />
          }
          title="颜色"
          trigger="click"
        >
          <div className={styles.colorBoardWrap}>
            <div
              className={styles.colorBoard}
              style={{ backgroundColor: style.backgroundColor }}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
}
