import React from 'react';
import { AppHeader } from '@/components/app/app-header';
import styles from './index.module.scss';
import { AppMenu } from '@/components/app/app-menu';
import { AppPreview } from '@/components/app/app-preview';
import { AppPropertyMenu } from '@/components/app/app-property-menu';
import sketchJson from './output.json';
import { observer } from 'mobx-react';
import { modal } from '@/modal';
import { ISketchItem } from '@/typings/ISketckItem';

@observer
export class Home extends React.Component {

	componentDidMount() {
		modal.app.setElements(sketchJson as ISketchItem[]);
	}
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
						<AppPropertyMenu />
					</div>
				</div>
			</div>
		);
	}
}
