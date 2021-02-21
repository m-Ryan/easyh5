import React, { useCallback, useMemo, useEffect, ReactElement } from 'react';
import { onDrag } from '@/util/onDrag';
import { useEditorContext } from '../../hooks/useEditorContext';
import { useBlockFocus } from '@VisualEditor/hooks/useBlockFocus';
import { useQuery } from '@/hooks/useQuery';

interface MoveableProps {
  children: React.ReactElement;
  idx: string;
  disabled?: boolean;
}
export default function Moveable(props: MoveableProps) {
  const { idx, children, disabled = false } = props;
  const {
    focusIdx,
    getValueByIdx,
    setValueByIdx,
  } = useEditorContext();

  const { scale = 1 } = useQuery();
  const block = getValueByIdx(idx)!;
  const isFocus = focusIdx === idx;

  const onMouseDown = (event: MouseEvent) => {
    if (disabled) return;
    event.stopPropagation();
    const newStyle = { ...block.style };
    onDrag({
      event,
      onMove(diffX, diffY) {
        block.style.left = (parseFloat(newStyle.left) || 0) + diffX * Number(1 / scale) + 'px';
        block.style.top = (parseFloat(newStyle.top) || 0) + diffY * Number(1 / scale) + 'px';
        setValueByIdx(idx, { ...block });
      },
    });
  };

  return React.createElement(children.type, {
    ...children.props,
    onMouseDown,
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
