import React, { useEffect } from 'react';
import styles from './index.module.scss';
import sketchJson from './output.json';
import { useAppDispatch } from '@/store/reducers';
import { ArticleType } from '@/store/article';
import { INodeItem } from '@/typings/ISketckItem';
import { AppHeader } from '@/components/app/app-header';
import { AppMenu } from '@/components/app/app-menu';
import { AppPreview } from '@/components/app/app-preview';
import { AppPropertyMenu } from '@/components/app/app-property-menu';


const tranformProperty = [
	'width',
	'height',
	'left',
	'top',
	'fontSize',
	'borderWidth',
	'lineHeight'
]

const tranformScale = (nodeList: INodeItem[], scale: number = 1) => {
	nodeList.forEach(item=> {
		for(let property in item.style) {
			if (tranformProperty.includes(property)) {
				item.style[property] = parseFloat(item.style[property]) * scale;
				if (property === 'lineHeight') {
					item.style[property] += 'px';
				}
			}
		}
		tranformScale(item.children, scale);
	})
}

export function Home() {
	const dispatch = useAppDispatch()
	// tranformScale(sketchJson as any[], 0.5);
	useEffect(()=> {
		dispatch({
			type: ArticleType.ARTICLE_SET_STATE,
			payload: sketchJson as any[]
		});
	}, [])

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
