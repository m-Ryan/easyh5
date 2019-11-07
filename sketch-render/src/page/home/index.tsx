import React, { useEffect } from 'react';
import styles from './index.module.scss';
import sketchJson from './output.json';
import { AppState } from '@/store';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/reducers';
import { IElementItem } from '@/store/article';
import { ArticleType } from '../../store/article';
import { ReducerType } from '../../store/reducers';
import { UserType } from '../../store/user';

export function Home() {
	const article = useSelector((state: AppState) => state.article);
	const dispatch = useAppDispatch()

	useEffect(()=> {
		// dispatch(ArticleType.ARTICLE_SET_STATE, sketchJson as IElementItem[])
		const data = dispatch(UserType.SET_STATE,{ name: 'ryan'});
		console.log(data)
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
