import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import styles from './index.module.scss';
import { IScratchcard } from '../../scratchcard';
import {
  isMouseEvent,
  isReactMouseEvent
} from '@/util/utils';
import { useSelector } from '@/modal';
import _ from 'lodash';
import { actionBus } from '@/components/templete/actionBus';

export interface IScratchcardProps {
	element: IScratchcard;
}

const CANVAS_SIZE = 750;

export function Preview(props: IScratchcardProps) {
  const element = props.element;
  const { bitmap, lineWidth } = element.data.value;
  const ref = useRef<HTMLCanvasElement>(null);
  const article  = useSelector('article');
  const [isEnd, setIsEnd] = useState(false);
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
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = '#ddd';
        ctx.rect(0, 0, CANVAS_SIZE, canvasHeight);
        ctx.fill();
        ctx.restore();

        // 合成模式
        ctx.globalCompositeOperation = 'destination-out';
        ctx.save();
      } catch (error) {
        console.log(error);
      }
    };

    drawTurntable();
  }, [element, lineWidth]);

  const setClear = useCallback(()=> {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();

    // 清除
    ctx.rect(0, 0, 10000, 10000);
    ctx.stroke();
    ctx.fill();
    ctx.clip();
    ctx.clearRect(0, 0, 10000, 10000);
  }, [])

  const onTap = (
      event:
			| React.TouchEvent<HTMLCanvasElement>
			| React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (isEnd) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let isSuccess = false;
    const { left, top } = canvas.getBoundingClientRect();
    const scale = CANVAS_SIZE / canvas.getBoundingClientRect().width;
    let initX = 0;
    let initY = 0;
    if (isReactMouseEvent(event)) {
      initX = (event.clientX - left) * scale;
      initY = (event.clientY - top) * scale;
    } else {
      initX = (event.touches[0].clientX - left) * scale;
      initY = (event.touches[0].clientY - top) * scale;
    }

    ctx.moveTo(initX, initY);

    onMovegin({
      event,
      onMove: (x, y) => {
        if (isSuccess) return;
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.save();
        const endX = (x - left) * scale;
        const endY = (y - top) * scale;

        // 清除
        ctx.beginPath();
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.fill();
        ctx.clip();
        ctx.clearRect(0, 0, 10000, 10000);

        // 移动笔触
        ctx.restore();
        ctx.moveTo(endX, endY);
        const rate = getClearRate(canvas);
        if (rate > 0.5) {
          isSuccess = true;
          setIsEnd(true);
          setClear();
          if (element.data.action) {
            actionBus.emit(element.data.action!);
          } else {
            console.error('没有绑定完成动作');
          }
          
        }
      }
    });
  };



  return (
    <canvas
      ref={ref}
      onTouchStart={onTap}
      onMouseDown={onTap}
      className={styles.container}
      style={{
        backgroundImage: `url(${bitmap})`,
        backgroundSize: '100%',
        ...element.style
      }}
    ></canvas>
  );
}

export const onMovegin = ({
  event,
  onMove
}: {
	event:
		| React.TouchEvent<HTMLCanvasElement>
		| React.MouseEvent<HTMLCanvasElement>;
	onMove: (x: number, y: number) => void;
}) => {
  event.preventDefault();
  event.stopPropagation();

  const onDragMove = _.debounce((mEvt: TouchEvent | MouseEvent) => {
    let movX = 0;
    let movY = 0;

    if (isMouseEvent(mEvt)) {
      movX = mEvt.clientX;
      movY = mEvt.clientY;
    } else {
      movX = mEvt.touches[0].clientX;
      movY = mEvt.touches[0].clientY;
    }
    onMove(movX, movY);
  });

  const onDragEnd = () => {
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mousemove', onDragEnd);
  };

  document.addEventListener('touchmove', onDragMove);
  document.addEventListener('touchend', onDragEnd);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
};

/**
 * imgData.data是个数组，存储着指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
 * 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0!!!，
 * 为了提高计算效率，这儿设置当a值小于128，也就是半透明状态时就可以了
 * @param canvas
 */
function getClearRate(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return 1;

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imgData.data;
  const transPixels = [];
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) {
      transPixels.push(pixels[i + 3]);
    }
  }
  return transPixels.length / (pixels.length / 4);
}
