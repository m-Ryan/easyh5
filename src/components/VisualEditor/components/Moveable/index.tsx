import React, { useCallback, useMemo, useEffect, ReactElement } from 'react';
import { onDrag } from '@/util/onDrag';
import { useEditorContext } from '../../hooks/useEditorContext';

interface MoveableProps {
  children: React.ReactElement;
  idx: string;
}
export default function Moveable(props: MoveableProps) {
  const { idx, children } = props;
  const {
    focusIdx,
    setFocusIdx,
    getValueByIdx,
    setValueByIdx,
  } = useEditorContext();
  const block = getValueByIdx(idx)!;
  const isFocus = focusIdx === idx;

  const onMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
    const newStyle = { ...block.style };
    setFocusIdx(idx);
    onDrag({
      event,
      onMove(diffX, diffY) {
        block.style.left = newStyle.left + diffX;
        block.style.top = newStyle.top + diffY;
        setValueByIdx(idx, block);
      },
    });
  };

  const stopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return React.createElement(children.type, {
    ...children.props,
    onMouseDown,
    onMouseOver: stopPropagation,
    onClick: stopPropagation,
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
