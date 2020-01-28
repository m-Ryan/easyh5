import React from 'react';
import { ICountdown } from '../../countdown';
import { RenderPreviewItem } from '../../../../render-preview-item';

export interface ICountdownProps {
	element: ICountdown;
}

export function Preview(props: ICountdownProps) {
  const element = props.element;

  return (
    <div style={element.style}>
      {element.children.length > 0 ? <RenderPreviewItem list={element.children} /> : null}
    </div>
  );
}
