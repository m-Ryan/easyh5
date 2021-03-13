import React from 'react';
import { onDrag } from '@/utils/onDrag';
import { useQuery } from '@/hooks/useQuery';
import { getValueByIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { EditBlockWrapper } from '../EditBlockWrapper';

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
  } = useBlock();

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
    <EditBlockWrapper idx={idx} onMouseDown={onMouseDown}>
      {children}
    </EditBlockWrapper>
  );
}
