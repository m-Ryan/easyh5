import React from 'react';
import { onDrag } from '@/util/onDrag';
import { useEditorContext } from '../../hooks/useEditorContext';
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
    onDrag({
      event,
      onMove(diffX, diffY) {
        const left = (parseFloat(block.style.left) || 0) + diffX * Number(1 / scale) + 'px';
        const top = (parseFloat(block.style.top) || 0) + diffY * Number(1 / scale) + 'px';

        setValueByIdx(idx, {
          ...block, style: {
            ...block.style,
            left,
            top
          },
        });
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
