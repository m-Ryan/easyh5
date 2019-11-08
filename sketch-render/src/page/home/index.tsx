import React, { useEffect } from 'react';
import styles from './index.module.scss';
import sketchJson from './output.json';
import { useSelector } from 'react-redux'
import { useAppDispatch, AppState } from '@/store/reducers';
import { ArticleType } from '@/store/article';
import { UserType } from '@/store/user';
import { ISketchItem } from '@/typings/ISketckItem';

export function Home() {
	const article = useSelector((state: AppState) => state.article);
	const dispatch = useAppDispatch()

	useEffect(()=> {
		const data = dispatch({
			type: ArticleType.ARTICLE_SET_STATE,
			payload: sketchJson as ISketchItem[]
		});
	dispatch({
			type: UserType.USER_SET_STATE,
			payload: { name: 'aa'}
		});
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
