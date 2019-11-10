import React from 'react';
import styles from './index.module.scss';
import { Popover, Radio, Input } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { IElementItem } from '@/typings/ISketckItem';
import { ImageUploader } from '@/components/image-uploader';
import _ from 'lodash';

type IProps = {
	target: IElementItem;
	onChangeStyle: <T extends keyof React.CSSProperties>(property: T, value: string) => void;
	onChangeValue: (text: string) => void;
	onChangeLink: (value: string) => void;
};

const changeColor = _.debounce((color: ColorResult, onChangeStyle: IProps['onChangeStyle']) => onChangeStyle('backgroundColor', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`))

export function Shape(props: IProps) {
	const { target, onChangeStyle, onChangeValue } = props;
	const style = target.style;
	const value = target.value;
	return (
		<div className={styles.property}>
			<div className={styles.listItem}>
				<div className={styles.key}>圆角：</div>
				<Input
					className={styles.value}
					value={style.borderRadius}
					onChange={(e) => onChangeStyle('borderRadius', e.target.value)}
				/>
			</div>
			<div className={styles.listItem}>
				<div className={styles.key}>透明度：</div>
				<Input className={styles.value} value={style.opacity} onChange={(e)=>onChangeStyle('opacity', e.target.value)}  />
			</div>

			<div className={styles.listItem}>
				<div className={styles.key}>背景颜色：</div>
				<Popover
					content={
						<SketchPicker color={style.backgroundColor} onChange={(color: ColorResult)=>changeColor(color, onChangeStyle)} />
					}
					title="颜色"
					trigger="click"
				>
					<div className={styles.colorBoard} style={{ backgroundColor: style.backgroundColor }} />
				</Popover>
			</div>
		</div>
	);
}
