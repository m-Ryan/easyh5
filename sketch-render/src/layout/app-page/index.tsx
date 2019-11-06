import React from 'react';
import { AppHeader } from '@/layout/app-header';
import styles from './index.module.scss';
import { AppMenu } from '@/layout/app-menu';
interface IProps {
	children: React.ReactNode;
}

export class AppPage extends React.Component<IProps> {

	render() {
		return (
			<div className={styles.container}>
				<AppHeader />
				<div className={styles.wrap}>
					<div className={styles.menu}>
						<AppMenu />
					</div>
					<div className={styles.contentWrap}>
            <div className={styles.content}>{this.props.children}</div>
          </div>
				</div>
			</div>
		);
	}
}
