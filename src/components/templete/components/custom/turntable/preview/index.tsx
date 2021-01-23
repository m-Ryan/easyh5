import React, { useRef, useLayoutEffect, useCallback } from 'react';
import styles from './index.module.scss';
import { ITurntable } from '../../turntable';
import { Turntable } from '@/components/turntable';

export interface ICountdownProps {
  element: ITurntable;
  selectId?: number;
}

export function Preview(props: ICountdownProps) {

  const { selectId = 0, element } = props;
  const { awards } = element.data.value;

  return (
    <div style={element.style}><Turntable drawCallback={()=>{}} selectId={selectId} awards={awards} /></div>
  );
}
