import React, { useEffect, useState } from 'react';
import { onDrag } from '@/utils/onDrag';
import { useQuery } from '@/hooks/useQuery';
import { getValueByIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { EditBlockWrapper } from '../EditBlockWrapper';

interface MoveableProps {
  children: React.ReactElement;
  idx: string;
}

export default function Moveable(props: MoveableProps) {
  const { idx, children } = props;
  const [isParallel, setIsParallel] = useState(false);
  const {
    setValueByIdx,
    values,
    focusIdx
  } = useBlock();

  const { scale = 1 } = useQuery();
  const block = getValueByIdx(values, idx)!;

  useEffect(() => {

    const handler = (ev: KeyboardEvent) => {
      if (ev.shiftKey) {
        setIsParallel(p => !p);
      }
    };

    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', handler);
    return () => {
      window.removeEventListener('keyup', handler);
      window.removeEventListener('keyup', handler);
    };
  }, []);

  const onMouseDown = (event: any) => {
    if (focusIdx !== props.idx) return;

    event.stopPropagation();
    onDrag({
      event,
      onMove(diffX, diffY) {
        const left = parseFloat(block.style.left?.toString() || '0') + diffX * Number(1 / scale) + 'px';
        const top = parseFloat(block.style.top?.toString() || '0') + diffY * Number(1 / scale) + 'px';

        if (isParallel) {
          if (Math.abs(diffX) > Math.abs(diffY)) {
            setValueByIdx(idx, {
              ...block, style: {
                ...block.style,
                left,
              },
            });
          } else {

            setValueByIdx(idx, {
              ...block, style: {
                ...block.style,
                top,
              },
            });
          }

        } else {
          setValueByIdx(idx, {
            ...block, style: {
              ...block.style,
              left,
              top
            },
          });
        }

      },
    });
  };

  return (
    <EditBlockWrapper idx={idx} onMouseDown={onMouseDown}>
      {children}
    </EditBlockWrapper>
  );
}
