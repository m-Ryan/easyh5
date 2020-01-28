import React, { useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { Input, Popover, Radio, InputNumber, Select } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { INodeStyle } from '@/components/templete/templete.type';
import _ from 'lodash';
import { IText } from '../../text';

type IProps = {
  target: IText;
  onChangeStyle: <T extends keyof INodeStyle>(
    property: T,
    value: any
  ) => void;
  onChangeValue: (value: string) => void;
  onChangeLink: (value: string) => void;
};

const changeColor = _.debounce(
    (color: ColorResult, onChangeStyle: IProps['onChangeStyle']) =>
      onChangeStyle(
          'color',
          `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      )
);

const whiteSpaceList = [
  "inherit" , "initial" , "revert" , "unset" , "-moz-pre-wrap" , "break-spaces" , "normal" , "nowrap" , "pre" , "pre-line" , "pre-wrap"
]

export function Config(props: IProps) {
  const { target, onChangeStyle, onChangeValue } = props;
  const style = target.style;
  const value = target.data.value;
  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue(event.target.value);
  }, [onChangeValue])

  return (
    <div className={styles.property}>
      <div className={styles.title}>文本属性：</div>
      <div className={styles.textArea}>
        <Input.TextArea
          className={styles.value}
          value={value}
          onChange={onChangeText}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>大小：</div>
        <InputNumber
          min={0}
          className={styles.value}
          value={style.fontSize}
          onChange={value => onChangeStyle('fontSize', value!.toString())}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>行高：</div>
        <Input
          className={styles.value}
          value={style.lineHeight}
          onChange={e => onChangeStyle('lineHeight', e.target.value)}
        />
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>对齐：</div>
        <Radio.Group
          value={style.textAlign}
          onChange={e => onChangeStyle('textAlign', e.target.value)}
          size="small"
        >
          <Radio.Button value={'left'}>left</Radio.Button>
          <Radio.Button value={'center'}>center</Radio.Button>
          <Radio.Button value={'right'}>right</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>粗体：</div>
        <Radio.Group
          value={style.textAlign}
          onChange={e => onChangeStyle('fontWeight', e.target.value)}
          size="small"
        >
          <Radio.Button value={'normal'}>normal</Radio.Button>
          <Radio.Button value={'bold'}>bold</Radio.Button>
          <Radio.Button value={'bolder'}>bolder</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>斜体：</div>
        <Radio.Group
          value={style.textAlign}
          onChange={e => onChangeStyle('fontStyle', e.target.value)}
          size="small"
        >
          <Radio.Button value={'normal'}>normal</Radio.Button>
          <Radio.Button value={'italic'}>italic</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>颜色：</div>
        <Popover
          content={
            <SketchPicker
              color={style.color}
              onChange={(color: ColorResult) =>
                changeColor(color, onChangeStyle)
              }
            />
          }
          title="文本颜色"
          trigger="click"
        >
          <div
            className={styles.colorBoard}
            style={{ backgroundColor: style.color }}
          ></div>
        </Popover>
      </div>
      <div className={styles.listItem}>
        <div className={styles.key}>换行方式：</div>
        <Select
          value={style.whiteSpace}
          style={{ width: 90 }}
          onChange={(value: React.CSSProperties['whiteSpace']) => onChangeStyle('whiteSpace', value)}
        >
          {whiteSpaceList.map((item, index) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
}
