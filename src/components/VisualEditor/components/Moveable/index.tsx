import React from 'react';
import { onDrag } from '@/util/onDrag';
import { useEditorContext } from '../../hooks/useEditorContext';
import { useQuery } from '@/hooks/useQuery';
import { BlockWrapper } from '../BlockWrapper';
import { getValueByIdx } from '@VisualEditor/utils/block';

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
        const left = (+(block.style.left || 0)) + diffX * Number(1 / scale) + 'px';
        const top = (+(block.style.top || 0)) + diffY * Number(1 / scale) + 'px';
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
