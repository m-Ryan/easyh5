import React, { useMemo } from 'react';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';
import { Stack } from '@/components/Stack';
import { ICountdown } from '..';
import { useCountdown } from '@/hooks/useCountdown';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<ICountdown>(props.idx);
  const { endTime, type, gridColor, gridBgColor } = value.data.value;

  const { day, hour, minute, second } = useCountdown(
    (new Date(endTime).getTime() - new Date().getTime()) / 1000,
    {
      autoStart: true,
      needMillisecond: false,
    }
  );

  const content = useMemo(() => {
    if (type === 'date') {
      return (
        <Stack spacing='extraTight'>
          <TimeGrid bgColor={gridBgColor} color={gridColor} text={day} />
          <Delimiter gridBgColor={gridBgColor} />
          <TimeGrid bgColor={gridBgColor} color={gridColor} text={hour} />
          <Delimiter gridBgColor={gridBgColor} />
          <TimeGrid bgColor={gridBgColor} color={gridColor} text={minute} />
          <Delimiter gridBgColor={gridBgColor} />
          <TimeGrid bgColor={gridBgColor} color={gridColor} text={second} />
        </Stack>
      );
    }
    return (
      <Stack spacing='extraTight'>
        <TimeGrid bgColor={gridBgColor} color={gridColor} text={hour} />
        <Delimiter gridBgColor={gridBgColor} />
        <TimeGrid bgColor={gridBgColor} color={gridColor} text={minute} />
        <Delimiter gridBgColor={gridBgColor} />
        <TimeGrid bgColor={gridBgColor} color={gridColor} text={second} />
      </Stack>
    );
  }, [day, gridBgColor, gridColor, hour, minute, second, type]);

  return (
    <Moveable idx={props.idx}>
      <div>{content}</div>
    </Moveable>
  );
}

function TimeGrid(props: {
  text: React.ReactNode;
  bgColor: string;
  color: string;
}) {
  return (
    <div
      style={{
        backgroundColor: props.bgColor,
        color: props.color,
        minWidth: '0.2rem',
        height: '0.2rem',
        borderRadius: '0.02rem',
        textAlign: 'center',
        lineHeight: '0.2rem',
        fontSize: '.14rem',
        padding: '0 0.01rem',
      }}
    >
      {props.text}
    </div>
  );
}

function Delimiter(props: { gridBgColor: string }) {
  return (
    <span
      style={{
        color: props.gridBgColor,
        position: 'relative',
        top: '-0.02rem',
      }}
    >
      :{' '}
    </span>
  );
}
