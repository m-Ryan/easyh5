import React, { useState, useRef, useLayoutEffect } from 'react';
import styles from './index.module.scss';
import { INodeItem } from '@/typings/ISketckItem';
import { Rnd } from 'react-rnd';

type IProps = {
	element: INodeItem;
	onResizeStop: (width: number, height: number)=>void;
	onDragStop: (left: number, top: number)=>void;
	onFocus: (element: INodeItem)=>void;
};

export function Bitmap(props: IProps) {
	const [isFocus, setIsFocus] = useState(false);
	const [state, setState] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	})
	const ref = useRef<HTMLImageElement>(null)
	const { element, onResizeStop, onDragStop, onFocus } = props;
	const style = element.style;
	const onMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		setIsFocus(true);
		onFocus(element);
	}
	
	useLayoutEffect(()=> {
		if (ref.current) {
			const style =	getComputedStyle(ref.current);
			setState({
				x: parseFloat(style.left!.toString()),
				y: parseFloat(style.top!.toString()),
				width: parseFloat(style.width!.toString()),
				height: parseFloat(style.height!.toString())
			})
		}
	}, [ref.current])

	return (

		<Rnd
			size = {{
				width: style.width,
				height: style.height
			}}
			position = {{
				x: 0,
				y: 0
			}}
			onResizeStop={(e, direction, wrapRef, delta, position) => {
				onResizeStop(wrapRef.clientWidth, wrapRef.clientHeight)
			}}
			onDragStop={(e, d) => { 
				onDragStop(d.x, d.y)
			 }}
		>
			<img className="drag-box-outline" ref={ref} draggable={false} onMouseDown={onMouseDown} src={element.value} style={style} />
		</Rnd>

	);
}
