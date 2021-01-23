import React from 'react';
import _ from 'lodash';
import { IText } from '../../text';
type IProps = {
	element: IText;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function Preview(props: IProps) {
  const { element, onClick } = props;

  return (
    <span style={element.style} onClick={onClick}>
      {element.data.value}
    </span>
  );
}
