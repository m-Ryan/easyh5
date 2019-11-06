import React from 'react';
import { AppHeader } from '@/layout/app-header';
import styles from './index.module.scss';
import { AppMenu } from '@/layout/app-menu';
import { AppPreview } from '@/components/app-preview';

export class Home extends React.Component {

	render() {
		return (
			<div className={styles.container}>
				<AppHeader />
				<div className={styles.wrap}>
					<div className={styles.leftMenu}>
						<AppMenu />
					</div>
					<div className={styles.contentWrap}>
            <div className={styles.content}>
							<AppPreview />
						</div>
          </div>
					<div className={styles.rightMenu}>
						<AppMenu />
					</div>
				</div>
			</div>
		);
	}
}
