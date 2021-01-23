import React, { useRef, useLayoutEffect } from 'react';
import styles from './index.module.scss';
import { IScratchcard } from '../../scratchcard';
import { previewLoadImage } from '@/util/utils';
import { DragNode } from '../../../../drag-node';

export interface IScratchcardProps {
	element: IScratchcard;
}

const CANVAS_SIZE = 750;
export function Main(props: IScratchcardProps) {
  const element = props.element;
  const { bitmap } = element.data.value;
  const { height, width } = element.style;
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const drawTurntable = async () => {
      const { height, width } = ref.current!.getBoundingClientRect();
      const canvasHeight = (height / width) * CANVAS_SIZE;
      try {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = CANVAS_SIZE;
        canvas.height = canvasHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 40;
        ctx.save();

        ctx.fillStyle = '#f5f5f58f';
        ctx.fillRect(0, 0, CANVAS_SIZE, canvasHeight);
        ctx.restore();
      } catch (error) {
        console.log(error);
      }
    };

    drawTurntable();
  }, [element]);

  return (
    <DragNode element={element}>
      <canvas
        ref={ref}
        className={styles.container}
        style={{
          backgroundImage: `url(${bitmap})`,
          backgroundSize: '100%'
        }}
      ></canvas>
    </DragNode>
  );
}
