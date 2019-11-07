// import React from 'react';
// import styles from './index.module.scss';
// import { Input, Popover, Select, Radio, Icon } from 'antd';
// import { modal } from '@/store';
// import { observer } from 'mobx-react';
// import { IElementItem } from '@/store/app';
// import { ElementType } from '@/typings/ISketckItem';
// import { SketchPicker, ColorResult } from 'react-color';
// import './animate.scss';
// import { Text } from './components/text';
// import { Bitmap } from './components/bitmap';
// const Option = Select.Option;

// const onInputChange = <T extends keyof React.CSSProperties>(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 	const target = event.target;
// 	const property = target.getAttribute('datatype') as T;
// 	const value = target.value;
// 	modal.app.setTargetStyle(property, value);
// }

// const onChangeValue = (value: string) => {
// 	modal.app.seValue(value);
// }

// const onChangeLink = (link: string) => {
// 	modal.app.setLink(link);
// }

// const onChangeStyle = <T extends keyof React.CSSProperties>(property: T, value: string) => {
// 	modal.app.setTargetStyle(property, value);
// }

// export const AppPropertyMenu = observer(function ({ app }: { app: typeof modal['app'] }) {
// 	console.log('appappapp')
// 	const target = app.target;
// 	if (!target) {
// 		return null;
// 	}
// 	const style = target.style;
// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.property}>
// 				<h3 className={styles.title}>基础属性</h3>
// 				<div className={styles.list}>
// 					<div className={styles.listItem}>
// 						<div className={styles.key}>位置：</div>
// 						<Input datatype="left" className={styles.value} value={style.left} onChange={onInputChange} />
// 						<Input datatype="top" className={styles.value} value={style.top} onChange={onInputChange} />
// 					</div>
// 					<div className={styles.listItem}>
// 						<div className={styles.key}>大小：</div>
// 						<Input datatype="width" className={styles.value} value={style.width} onChange={onInputChange} />
// 						<Input datatype="height" className={styles.value} value={style.height} onChange={onInputChange} />
// 					</div>
// 					<div className={styles.listItem}>
// 						<div className={styles.key}>链接：</div>

// 						<Popover
// 							content={
// 								<Input className={styles.value} value={target.link} onChange={(e) => onChangeLink(e.target.value)} />
// 							}
// 							title="链接"
// 							trigger="click"
// 						>
// 							<Icon className={styles.link} type="link" />
// 						</Popover>
// 						<div className={styles.key}>动画：</div>
// 						<Select value={style.animation ? style.animation.toString() : ''} style={{ width: 120 }} onChange={(value: string) => onChangeStyle('animation', value)} >
// 							<Option value="">无动画</Option>
// 							<Option value="app-animate-skip 1s both infinite">跳跃</Option>
// 							<Option value="app-animate-breathe 1s linear both infinite">呼吸</Option>
// 							<Option value="app-animate-flash 1s linear both infinite">闪动</Option>
// 							<Option value="app-animate-rotate 1s linear both infinite">旋转</Option>
// 						</Select>
// 					</div>

// 					{/* 专有属性 */}
// 					{renderSpecialProperty(target)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// )

// const renderSpecialProperty = (target: IElementItem) => {
// 	switch (target.type) {
// 		case ElementType.TEXT:
// 			return <Text target={target} onChangeStyle={onChangeStyle} onChangeValue={onChangeValue} onChangeLink={onChangeLink} />;
// 		case ElementType.BITMAP:
// 			return <Bitmap target={target} onChangeStyle={onChangeStyle} onChangeValue={onChangeValue} onChangeLink={onChangeLink} />;
// 	}
// 	return null;
// }