import React from 'react';
import styles from './index.module.scss';
import { Input, Popover, Radio } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeItem, INodeStyle } from '@/typings/ISketckItem';
import _ from 'lodash';

type IProps = {
  target: INodeItem;
  onChangeStyle: <T extends keyof INodeStyle>(property: T, value: string)=>void;
  onChangeValue: (value: string)=>void;
  onChangeLink: (value: string)=>void;
}

const changeColor = _.debounce((color: ColorResult, onChangeStyle: IProps['onChangeStyle']) => onChangeStyle('color', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`))

export function Text(props: IProps) {
  const { target, onChangeValue, onChangeStyle } = props;
  const style = target.style;
  return (
    <div className={styles.property}>
      <div className={styles.title}>
        文本属性：
					</div>
      <div className={styles.textArea}>
        <Input.TextArea className={styles.value} value={target.value} onChange={(e)=>onChangeValue(e.target.value)} />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>对齐：</div>
        <Radio.Group value={style.textAlign} onChange={(e) => onChangeStyle('textAlign', e.target.value)} size="small">
          <Radio.Button value={'left'}>left</Radio.Button>
          <Radio.Button value={'center'}>center</Radio.Button>
          <Radio.Button value={'right'}>right</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>粗体：</div>
        <Radio.Group value={style.textAlign} onChange={(e) => onChangeStyle('fontWeight', e.target.value)} size="small">
          <Radio.Button value={'normal'}>normal</Radio.Button>
          <Radio.Button value={'bold'}>bold</Radio.Button>
          <Radio.Button value={'bolder'}>bolder</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>斜体：</div>
        <Radio.Group value={style.textAlign} onChange={(e) => onChangeStyle('fontStyle', e.target.value)} size="small">
          <Radio.Button value={'normal'}>normal</Radio.Button>
          <Radio.Button value={'italic'}>italic</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>颜色：</div>
        <Popover
          content={<SketchPicker color={style.color} onChange={(color: ColorResult)=>changeColor(color, onChangeStyle)}  />}
          title="文本颜色"
          trigger="click"
        >
          <div className={styles.colorBoard} style={{ backgroundColor: style.color }}></div>
        </Popover>
      </div>

    </div>
  )
}
