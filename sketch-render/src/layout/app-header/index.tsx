import React from 'react';
import styles from './index.module.scss';

export function AppHeader() {

	return (
		<div className={styles.container}>
			<div className={styles.leftSide}></div>
			<div className={styles.rightSide}>

				<div className={styles.userpannel}>
					<div className={styles.avatar}>
						<img src={'http://assets.maocanhua.cn/FrIHg7SNAUqOU1WAlLGz6uCmHBiD'} alt="" />
					</div>
				</div>

			</div>
		</div>
	);
}
