import React from 'react';
import _ from 'lodash';
import { DragNodeConnect } from '../drag-node-connect';
import { INodeItem } from '@/typings/ISketckItem';
type IProps = {
	element: INodeItem
};

export function Text(props: IProps) {
	const { element } = props;
	const style = element.style;

	return (

		<DragNodeConnect {...props}>
			<span>{element.value}</span>
		</DragNodeConnect>

	);
}
