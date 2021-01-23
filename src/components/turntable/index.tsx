import React, { useRef, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { previewLoadImage, easeInOutCubic, previewLoadImageList } from '@/util/utils';

type Iaward = {
  id: number;
  text: string; // 奖品名称
  bgColor: string; // 奖品区块对应背景颜色
  color: string; // 奖品区块对应字体颜色
  bitmap: string;
};

export type ITurntable = {
  awards: Iaward[];
  outsideRadius?: number; // 大转盘外圆的半径
  insideRadius?: number; // 大转盘内圆的半径
  bitmapSize?: number; // 图片大小
  fontSize?: number; // 字体大小
  speed?: number; // 字体大小
  selectId: number; // 中奖的奖品id
  drawCallback: ()=> any;
}

let timer: NodeJS.Timeout | null = null;
const CANVAS_SIZE = 750;
const PER_FRAME_TIME =  1000 / 60;

export function Turntable(props: ITurntable) {
  const { awards, outsideRadius = 375, insideRadius = 100, bitmapSize = 80, fontSize = 40, speed = 2, selectId, drawCallback } = props;
  const [isRotating, setIsRotating] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);
  const drawTurntable = useCallback(
      async (deg: number = 0) => {
        try {
          const pointer = await previewLoadImage(
              'https://static-1253442168.image.myqcloud.com/picture/13573106_8d70e965cb8e0a4383eba12da9ec7cf2.jpg-picmsg420'
          );
          const pointerBg = await previewLoadImage(
              'https://static-1253442168.image.myqcloud.com/picture/13573106_adb3e5b7d38f5ee4e640b7aa92307c2a.jpg-picmsg420'
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
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#FFBE04';

          awards.forEach((item, index) => {
            ctx.save();
            const angle = index * arc;
            const correctAngle = 0.5 * Math.PI + 0.5 * arc; // 弧度转到上面，方便计算

            ctx.translate(0.5 * CANVAS_SIZE, 0.5 * CANVAS_SIZE);
            ctx.rotate(angle + deg);

            ctx.fillStyle = item.bgColor;
            ctx.beginPath();
            ctx.arc(
                0,
                0,
                outsideRadius,
                -correctAngle,
                arc - correctAngle,
                false
            );
            ctx.arc(
                0,
                0,
                insideRadius,
                arc - correctAngle,
                -correctAngle,
                true
            );
            ctx.stroke();
            ctx.fill();

            // 画图
            const pading = 50;
            const bitmapOffsetX = -0.5 * bitmapSize;
            const bitmapOffsetY = insideRadius + bitmapSize + pading;
            ctx.drawImage(
                imgArr[index],
                bitmapOffsetX,
                -bitmapOffsetY,
                bitmapSize,
                bitmapSize
            );

            // 画文字
            const text = item.text;
            ctx.font = `${fontSize}px Microsoft YaHei`;
            ctx.textAlign = 'center';
            ctx.fillStyle = item.color || '#AC6900';
            const textOffset = bitmapOffsetY + pading;
            ctx.fillText(text, 0, -textOffset, CANVAS_SIZE);
            ctx.restore();
          });

          // 画指针
          const pointerBgSize = insideRadius * 2;
          const pointerSize = pointerBgSize * 0.8;
          const pointerbgHeight =
          (pointer.height / pointer.width) * pointerBgSize;
          ctx.drawImage(
              pointer,
              CANVAS_SIZE / 2 - insideRadius,
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
          ctx.save();
        } catch (error) {
          console.log(error);
        }
      },
      [
        awards,
        bitmapSize,
        fontSize,
        insideRadius,
        outsideRadius
      ]
  );

  useEffect(() => {
    drawTurntable();
    return () => {
      timer && clearInterval(timer);
    };
  }, [drawTurntable]);

  const startRotate = useCallback(() => {
    if (isRotating) {
      return;
    }
    setIsRotating(true);

    const index = awards.findIndex(item => item.id === selectId);
    const totalDeg = 5 * 360 * speed + (360 / awards.length * (index + (Math.random() - 0.5))); // randomRange(-0.5, 0.5, false)
    const totalTime = 4000;
    let currentTime = 0;
    timer = setInterval(() => {
      currentTime = Number(currentTime + PER_FRAME_TIME);
      const deg = easeInOutCubic(currentTime / totalTime) * totalDeg;
      if (deg >= totalDeg) {
        setIsRotating(false);
        drawCallback()
        return timer && clearInterval(timer);
      }
      drawTurntable((Math.PI / 180) * deg);
    }, PER_FRAME_TIME);
  }, [awards, drawCallback, drawTurntable, isRotating, selectId, speed])

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${'https://static-1253442168.image.myqcloud.com/picture/13573106_3c82417a13e186684b1a3d94232129f2.jpg-picmsg420'})` }}>
      <canvas ref={ref} />
      <div onClick={startRotate} className={styles.maskPoint} style={{ width: insideRadius, height: insideRadius }} />
    </div>
  );
}
