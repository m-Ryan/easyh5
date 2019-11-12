import React from 'react';
import _ from 'lodash';
import { DragNodeConnect } from '../drag-node-connect';
import { INodeItem } from '@/typings/ISketckItem';
type IProps = {
	element: INodeItem
};

export function Bitmap(props: IProps) {
	const { element } = props;
	return (

		<DragNodeConnect {...props}>
			<img src={element.value} alt="" />
		</DragNodeConnect>

	);
}
