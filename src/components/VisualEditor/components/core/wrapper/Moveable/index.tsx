import React from 'react';
import { onDrag } from '@/util/onDrag';
import { useQuery } from '@/hooks/useQuery';
import { BlockWrapper } from '../BlockWrapper';
import { getValueByIdx } from '@VisualEditor/utils/block';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

interface MoveableProps {
  children: React.ReactElement;
  idx: string;
  disabled?: boolean;
}
export default function Moveable(props: MoveableProps) {
  const { idx, children, disabled = false } = props;
  const {
    setValueByIdx,
    values,
  } = useEditorContext();

  const { scale = 1 } = useQuery();
  const block = getValueByIdx(values, idx)!;

  const onMouseDown = (event: any) => {
    if (disabled) return;
    event.stopPropagation();
    onDrag({
      event,
      onMove(diffX, diffY) {
        const left = parseFloat(block.style.left?.toString() || '0') + diffX * Number(1 / scale) + 'px';
        const top = parseFloat(block.style.top?.toString() || '0') + diffY * Number(1 / scale) + 'px';
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

  return (
    <BlockWrapper idx={idx} onMouseDown={onMouseDown}>
      {children}
    </BlockWrapper>
  );
}
