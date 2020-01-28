import React, { useRef, useLayoutEffect } from 'react';
import styles from './index.module.scss';
import { ITurntable } from '../../turntable';
import { previewLoadImageList, previewLoadImage } from '@/util/utils';
import { DragNode } from '../../../../drag-node';

export interface ICountdownProps {
	element: ITurntable;
}

const CANVAS_SIZE = 750;
export function Main(props: ICountdownProps) {
  const element = props.element;
  const value = element.data.value;
  const awards = value.awards;
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const drawTurntable = async () => {
      try {
        const pointer = await previewLoadImage(
            'http://assets.maocanhua.cn/FthW4Cy8WSQmiMR74TKwTRkuVQBd'
        );
        const pointerBg = await previewLoadImage(
            
            'http://assets.maocanhua.cn/Fq2vLQxMjDqvHIRAV503m3BB58V0'
        );
        const imgArr = await previewLoadImageList(
            awards.map(item => item.bitmap)
        );

        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const arc = (Math.PI * 2) / awards.length; // 每一份的弧度
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        ctx.strokeStyle = '#FFBE04';

        awards.forEach((item, index) => {
          ctx.save();
          const angle = index * arc;
          const correctAngle = 0.5 * Math.PI + 0.5 * arc; // 弧度转到上面，方便计算

          ctx.translate(0.5 * CANVAS_SIZE, 0.5 * CANVAS_SIZE);
          ctx.rotate(angle);

          ctx.fillStyle = item.bgColor;
          ctx.beginPath();
          ctx.arc(
              0,
              0,
              value.outsideRadius,
              -correctAngle,
              arc - correctAngle,
              false
          );
          ctx.arc(
              0,
              0,
              value.insideRadius,
              arc - correctAngle,
              -correctAngle,
              true
          );
          ctx.stroke();
          ctx.fill();

          // 画图
          const pading = 50;
          const bitmapOffsetX = -0.5 * value.bitmapSize;
          const bitmapOffsetY = value.insideRadius + value.bitmapSize + pading;
          ctx.drawImage(
              imgArr[index],
              bitmapOffsetX,
              -bitmapOffsetY,
              value.bitmapSize,
              value.bitmapSize
          );

          // 画文字
          const text = item.text;
          ctx.font = `${value.fontSize}px Microsoft YaHei`;
          ctx.textAlign = 'center';
          ctx.fillStyle = item.color || '#AC6900';
          const textOffset = bitmapOffsetY + pading;
          ctx.fillText(text, 0, -textOffset, CANVAS_SIZE);
          ctx.restore();
        });

        const pointerBgSize = value.insideRadius * 2;
        const pointerSize = pointerBgSize * 0.8;
        const pointerbgHeight =
					(pointer.height / pointer.width) * pointerBgSize;
        ctx.drawImage(
            pointer,
            CANVAS_SIZE / 2 - value.insideRadius,
            CANVAS_SIZE / 2 - 0.58 * pointerbgHeight,
            pointerBgSize,
            pointerbgHeight
        );
        ctx.drawImage(
            pointerBg,
            CANVAS_SIZE / 2 - 0.5 * pointerSize,
            CANVAS_SIZE / 2 - 0.5 * pointerSize,
            pointerSize,
            pointerSize
        );
      } catch (error) {
        console.log(error);
      }
    };

    drawTurntable();
  }, [
    awards,
    element,
    value.bitmapSize,
    value.fontSize,
    value.insideRadius,
    value.outsideRadius
  ]);

  return (
    <DragNode element={element}>
      <canvas
        ref={ref}
        className={styles.container}
        style={element.style}
      ></canvas>
    </DragNode>
  );
}
