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
    <div style={element.style} onClick={onClick}>
      {element.data.value}
    </div>
  );
}
