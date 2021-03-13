
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

  const content = React.cloneElement(children, {
    style: node.style,
    ...children.props,
    ...props,
    ['data-node-type']: node.type,
    ['data-node-idx']: idx,
  });

  return content;

}
