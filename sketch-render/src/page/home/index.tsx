import React, { useEffect } from 'react';
import styles from './index.module.scss';
import sketchJson from './output.json';
import { ISketchItem } from '@/typings/ISketckItem';
import { AppState } from '@/store';
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch } from '@/store/reducers';
import { IElementItem } from '@/store/app';

export function Home() {
	const article = useSelector((state: AppState) => state.article);
	const dispatch = useAppDispatch()

	useEffect(()=> {
		dispatch('ARTICLE_SET_STATE', sketchJson as IElementItem[])
	})

	console.log(article);
	return (
		<div className={styles.container}>
			{/* <AppHeader /> */}
			<div className={styles.wrap}>
				{/* <div className={styles.leftMenu}>
					<AppMenu />
				</div>
				<div className={styles.contentWrap}>
					<div className={styles.content}>
						<AppPreview />
					</div>
				</div>
				<div className={styles.rightMenu}>
					<AppPropertyMenu app={app} />
				</div> */}
			</div>
		</div>
	);
}