import React, { useRef } from 'react';
import { IVideo } from '..';
import { useField } from 'formik';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IVideo>(props.idx);
  const ref = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const video = ref.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <RenderBlockWrapper onClick={toggle} idx={props.idx}>
      <video ref={ref}{...value.data.value} />
    </RenderBlockWrapper>

  );
}
