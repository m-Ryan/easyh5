import React from 'react';
import _ from 'lodash';
import { IBitmap } from '../../bitmap';
import { Picture } from '@/components/Picture';
type IProps = {
	element: IBitmap;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function Preview(props: IProps) {
  const { element, onClick } = props;
  return (
    <Picture style={element.style} src={element.data.value} onClick={onClick}  />
  );
}
