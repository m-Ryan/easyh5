import React, { useState, useRef, RefObject, useEffect } from 'react';
import { INodeItem } from '@/typings/ISketckItem';
import { Rnd } from 'react-rnd';
import _ from 'lodash';
export type IDragNodeItemProps = {
	focusId: number;
	element: INodeItem;
	onResizeStop: (width: number, height: number) => void;
	onDragStop: (left: number, top: number) => void;
	children: React.ReactElement;
};



export function DragNodeItem(props: IDragNodeItemProps) {
	const { element, onResizeStop, onDragStop, focusId, children } = props;
	const style = element.style;


	const onResize = _.debounce((ref: NonNullable<RefObject<HTMLElement>['current']>) => {
		onResizeStop(ref.clientWidth, ref.clientHeight)
	})

	const isFocus = focusId === element.id;
	return (
		<Rnd
			size={{
				width: style.width,
				height: style.height
			}}
			position={{
				x: style.left,
				y: style.top
			}}
			style = {{ zIndex: style.zIndex }}
			onResize={(e, direction, wrapRef, delta, position) => onResize(wrapRef)}
			onDragStop={(e, d) => {
				onDragStop( d.x, d.y);
			}}
			className={ isFocus ? "drag-box-outline" : undefined }
		>
			{ children }
		</Rnd>

	);
}
