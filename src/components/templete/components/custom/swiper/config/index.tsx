import React from 'react';
import styles from './index.module.scss';
import { Popover, Input, InputNumber, Switch } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeStyle } from '@/components/templete/templete.type';
import _ from 'lodash';
import { ISwiper } from '../../swiper';
import { ImageUploader } from '@/components/image-uploader';

type IProps = {
	target: ISwiper;
	onChangeStyle: <T extends keyof INodeStyle>(
		property: T,
		value: string | number
	) => void;
	onChangeValue: (text: ISwiper['data']['value']) => void;
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
  const { value } = target.data;
  const { list, dots, autoPlay } = value;

  const onChangeList = (urls: string[]) => {
    onChangeValue({
      ...value,
      list: [...list, ...urls]
    });
  };

  const onRemove = (index: number) => {
    list.splice(index, 1);
    onChangeValue({
      ...value,
      list: list
    });
  };

  const onChangeProperty = (property: keyof ISwiper['data']['value'], value: any) => {
    const values = value;
    values[property] = value;
    onChangeValue(values);
  };

  return (
    <div className={styles.property}>
      <div className={styles.title}>图片属性：</div>
      <div className={styles.uploadList}>
        <>
          {list.map((item, index) => {
            return (
              <ImageUploader
                count={9}
                key={index}
                url={item}
                onRemove={() => onRemove(index)}
                onSuccess={onChangeList}
              />
            );
          })}
          {list.length >= 9 ? null : (
						<ImageUploader
						  count={9}
						  key={'index'}
						  url=""
						  onRemove={() => {}}
						  onSuccess={onChangeList}
						/>
					)}
        </>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>自动播放：</div>
        <Switch
          checked={value.autoPlay}
          onChange={value => onChangeProperty('autoPlay', value)}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>dots：</div>
        <Switch
          checked={value.dots}
          onChange={value => onChangeProperty('dots', value)}
        />
      </div>
    </div>
  );
}
