import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';
import { modal } from '@/modal';
import { observer } from 'mobx-react';
import { unitConver } from '@/util/utils';

const replacePx = (text?: any) => {
	if (!text) return text;
	return unitConver(text.toString(), { originUnit: 'px', replaceUnit: '' })
}

const onChangeProperty = <T extends keyof React.CSSProperties>(event: React.ChangeEvent<HTMLInputElement>)=> {
	const target = event.target;
	const property = target.getAttribute('datatype') as T;
	const value = target.value;
	modal.app.setTargetStyle(property, value);
}

export const AppPropertyMenu = observer(function () {
	const styls = modal.app.targetStyle;
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>基础属性</h3>
			<div className={styles.list}>
				<div className={styles.listItem}>
					<div className={styles.key}>位置：</div>
					<Input datatype="left" className={styles.value} value={replacePx(styls.left)} onChange={onChangeProperty}	/>
					<Input datatype="top" className={styles.value} value={replacePx(styls.top)}	 onChange={onChangeProperty}/>
				</div>
				<div className={styles.listItem}>
					<div className={styles.key}>大小：</div>
					<Input datatype="width" className={styles.value} value={replacePx(styls.width)}	onChange={onChangeProperty} />
					<Input datatype="height" className={styles.value} value={replacePx(styls.height)} onChange={onChangeProperty}	/>
				</div>
			</div>
		</div>
	);
}
)
