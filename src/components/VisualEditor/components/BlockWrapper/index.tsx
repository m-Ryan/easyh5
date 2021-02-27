import React from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';

interface BlockWrapperProps {
  children: React.ReactElement;
  idx: string;
}
export function BlockWrapper(props: BlockWrapperProps) {
  const { idx, children } = props;
  const {
    focusIdx,
    getValueByIdx,
  } = useEditorContext();

  const block = getValueByIdx(idx)!;
  const isFocus = focusIdx === idx;

  return React.createElement(children.type, {
    ...children.props,
    ['data-node-type']: block.type,
    ['data-node-idx']: idx,
    style: {
      ...(children.props.style || {}),
      ...block.style,
      cursor: 'grab'
    },
    className: isFocus ? 'block-selected' : undefined,
  });
}
