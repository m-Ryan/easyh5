import React from 'react';
import styles from './index.module.scss';
import { Popover, Radio } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { IElementItem } from '@/typings/ISketckItem';
import { ImageUploader } from '@/components/image-uploader';

type IProps = {
	target: IElementItem;
	onChangeStyle: <T extends keyof React.CSSProperties>(property: T, value: string) => void;
	onChangeValue: (text: string) => void;
	onChangeLink: (value: string) => void;
};

export function Bitmap(props: IProps) {
	const { target, onChangeStyle, onChangeValue } = props;
	const style = target.style;
	const value = target.value;
	return (
		<div className={styles.property}>
			<div className={styles.title}>图片属性：</div>
			<div className={styles.textArea}>
				<ImageUploader url={value} onRemove={() => onChangeValue('')} onSuccess={onChangeValue} />
			</div>
			<div className={styles.listItem}>
				<div className={styles.key}>对齐：</div>
				<Radio.Group
					value={style.textAlign}
					onChange={(e) => onChangeStyle('textAlign', e.target.value)}
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
					onChange={(e) => onChangeStyle('fontWeight', e.target.value)}
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
					onChange={(e) => onChangeStyle('fontStyle', e.target.value)}
					size="small"
				>
					<Radio.Button value={'normal'}>normal</Radio.Button>
					<Radio.Button value={'italic'}>italic</Radio.Button>
				</Radio.Group>
			</div>
			<div className={styles.listItem}>
				<div className={styles.key}>背景颜色：</div>
				<Popover
					content={
						<SketchPicker onChange={(color: ColorResult) => onChangeStyle('backgroundColor', color.hex)} />
					}
					title="颜色"
					trigger="click"
				>
					<div className={styles.colorBoard} style={{ backgroundColor: style.color }} />
				</Popover>
			</div>
		</div>
	);
}
