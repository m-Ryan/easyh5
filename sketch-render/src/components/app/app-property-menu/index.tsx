import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Input, Popover, Select, Radio, Icon, Button, message, Popconfirm } from 'antd';
import { NodeType, IElementItem } from '@/typings/ISketckItem';
import './animate.scss';
import { Text } from './components/text';
import { Bitmap } from './components/bitmap';
import { useAppDispatch, useAppSelector } from '@/store/reducers';
import { ArticleType, getTarget, asyncAddItem } from '@/store/article';
import { Shape } from './components/shape/index';
import { Uploader } from '@/util/uploader';
import services from '@/services';
const Option = Select.Option;

export const AppPropertyMenu = function () {
	const dispatch = useAppDispatch();
	const article = useAppSelector((state) => state.article);
	const target = getTarget(article);

	if (!target) return null;

	const onInputChange = <T extends keyof React.CSSProperties>(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = event.target;
		const property = target.getAttribute('datatype') as T;
		const value = target.value;
		dispatch({
			type: ArticleType.ARTICLE_SET_STYLE,
			payload: [property, value]
		});
	};

	const onChangeValue = (value: string) => {
		dispatch({
			type: ArticleType.ARTICLE_SET_VALUE,
			payload: value
		});
	};

	const onChangeLink = (link: string) => {
		dispatch({
			type: ArticleType.ARTICLE_SET_LINK,
			payload: link
		});
	};

	const onChangeStyle = <T extends keyof React.CSSProperties>(property: T, value: string) => {
		dispatch({
			type: ArticleType.ARTICLE_SET_STYLE,
			payload: [property, value]
		});
	};

	const addText = () => {
		dispatch(asyncAddItem({ type: NodeType.TEXT, payload: null }))
	}

	const addBitmap = () => {
		const uploader = new Uploader(
			services.common.uploadByQiniu,
			{
				accept: 'image'
			}
		)

		uploader.on('success', (urls) => {
			dispatch(asyncAddItem({ type: NodeType.BITMAP, payload: urls[0] }))
		})

		uploader.on('error', (errMsg) => {
			message.error(errMsg);
		})

		uploader.chooseFile();
	}

	const addShape = () => {
		dispatch(asyncAddItem({ type: NodeType.GROUP, payload: null }))
	}

	const deleteItem = () => {
		dispatch({
			type: ArticleType.ARTICLE_DELETE_ITEM,
			payload: null
		});
	};


	const renderSpecialProperty = (target: IElementItem) => {
		switch (target.type) {
			case NodeType.TEXT:
				return (
					<Text
						target={target}
						onChangeStyle={onChangeStyle}
						onChangeValue={onChangeValue}
						onChangeLink={onChangeLink}
					/>
				);
			case NodeType.BITMAP:
				return (
					<Bitmap
						target={target}
						onChangeStyle={onChangeStyle}
						onChangeValue={onChangeValue}
						onChangeLink={onChangeLink}
					/>
				);
			case NodeType.GROUP:
				return (
					<Shape
						target={target}
						onChangeStyle={onChangeStyle}
						onChangeValue={onChangeValue}
						onChangeLink={onChangeLink}
					/>
				);
		}
		return null;
	};

	if (!target) {
		return null;
	}
	const style = target.style;
	return (
		<div className={styles.container}>
			<div className={styles.property}>
				<h3 className={styles.title}>基础属性</h3>
				<div className={styles.list}>
					<div className={styles.listItem}>
						<div className={styles.key}>位置：</div>
						<Input datatype="left" className={styles.value} value={style.left} onChange={onInputChange} />
						<Input datatype="top" className={styles.value} value={style.top} onChange={onInputChange} />
					</div>
					<div className={styles.listItem}>
						<div className={styles.key}>大小：</div>
						<Input datatype="width" className={styles.value} value={style.width} onChange={onInputChange} />
						<Input
							datatype="height"
							className={styles.value}
							value={style.height}
							onChange={onInputChange}
						/>
					</div>
					<div className={styles.listItem}>
						<div className={styles.key}>层级：</div>
						<Input
							datatype="zIndex"
							className={styles.value}
							value={style.zIndex}
							onChange={onInputChange}
						/>
					</div>
					<div className={styles.listItem}>
						<div className={styles.key}>链接：</div>

						<Popover
							content={
								<Input
									className={styles.value}
									value={target.link}
									onChange={(e) => onChangeLink(e.target.value)}
								/>
							}
							title="链接"
							trigger="click"
						>
							<Icon className={styles.link} type="link" />
						</Popover>
						<div className={styles.key}>动画：</div>
						<Select
							value={style.animation ? style.animation.toString() : ''}
							style={{ width: 120 }}
							onChange={(value: string) => onChangeStyle('animation', value)}
						>
							<Option value="">无动画</Option>
							<Option value="app-animate-skip 1s both infinite">跳跃</Option>
							<Option value="app-animate-breathe 1s linear both infinite">呼吸</Option>
							<Option value="app-animate-flash 1s linear both infinite">闪动</Option>
							<Option value="app-animate-rotate 1s linear both infinite">旋转</Option>
						</Select>
					</div>
					<h3 className={styles.title}>插入元素</h3>
					<div className={styles.list}>
						<Button className={styles.insertItem} onClick={addText}>
							<Icon type="font-size" /> 文本
						</Button>
						<Button className={styles.insertItem} onClick={addBitmap}>
							<Icon type="picture" /> 图片
						</Button>
						<Button className={styles.insertItem} onClick={addShape}>
							<Icon type="block" /> 形状
						</Button>
						<Popconfirm
							title="你确定要删除吗"
							onConfirm={deleteItem}
							okText="确定"
							cancelText="取消"
						>
							<Button className={styles.insertItem}>
								<Icon type="delete" /> 删除
						</Button>
						</Popconfirm>

					</div>
					{/* 专有属性 */}
					{renderSpecialProperty(target)}
				</div>
			</div>
		</div>
	);
};
