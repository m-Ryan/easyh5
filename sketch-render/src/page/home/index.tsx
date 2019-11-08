import React, { useEffect } from 'react';
import styles from './index.module.scss';
import sketchJson from './output.json';
import { useSelector } from 'react-redux'
import { useAppDispatch, AppState } from '@/store/reducers';
import { ArticleType } from '@/store/article';
import { ISketchItem } from '@/typings/ISketckItem';
import { AppHeader } from '@/components/app/app-header';
import { AppMenu } from '@/components/app/app-menu';
import { AppPreview } from '@/components/app/app-preview';
import { AppPropertyMenu } from '@/components/app/app-property-menu';

export function Home() {
	const article = useSelector((state: AppState) => state.article);
	const dispatch = useAppDispatch()

	useEffect(()=> {
		dispatch({
			type: ArticleType.ARTICLE_SET_STATE,
			payload: sketchJson as ISketchItem[]
		});
	}, [])

	console.log(article);
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
