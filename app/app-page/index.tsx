import React from 'react';
import { AppHeader } from '@/components/app/app-header';
import styles from './index.module.scss';
import { AppMenu } from '@/components/app/app-menu';
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
