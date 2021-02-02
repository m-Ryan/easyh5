import React from 'react';
import _ from 'lodash';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
type IProps = {
  element: IPage;
  renderItem: React.FunctionComponent<{ list: INodeItem[]; }>;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function Preview(props: IProps) {
  const { element } = props;
  return (
    <div style={element.style} onClick={props.onClick}>
      {element.children.length > 0 ? <props.renderItem list={element.children} /> : null}
    </div>
  );
}
