import React, { useEffect, useRef } from 'react';
import { IAudio } from '..';
import { useField } from 'formik';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IAudio>(props.idx);
  const ref = useRef<HTMLAudioElement>(null);
  const styles = { ...value.style };

  if (!value.data.value.controls) {
    styles.position = 'fixed';
    styles.left = '-9999px';
  }

  const toggle = () => {
    const audio = ref.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div
        data-node-type={value.type}
        data-node-idx={props.idx}
        style={styles}
        onClick={toggle}
      >
        <audio ref={ref} autoPlay={value.data.value.autoplay} loop={value.data.value.loop} src={value.data.value.src} />

      </div>
    </RenderBlockWrapper>

  );
}
