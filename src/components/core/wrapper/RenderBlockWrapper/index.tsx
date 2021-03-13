
import React, { DOMAttributes } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { getValueByIdx } from '@/utils/block';

interface RenderBlockWrapperProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactElement;
  idx: string;
}
export function RenderBlockWrapper(props: RenderBlockWrapperProps) {
  const { idx, children } = props;
  const {
    values,
  } = useBlock();

  const node = getValueByIdx(values, idx)!;

  const content = React.createElement(children.type, {
    ...children.props,
    style: {
      ...node.style,
      cursor: node.data.action ? 'pointer' : node.style.cursor
    },
    ['data-node-type']: node.type,
    ['data-node-idx']: idx,
  });

  return content;

}
