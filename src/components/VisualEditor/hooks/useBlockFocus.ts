import { useEffect } from 'react';
import { useEditorContext } from './useEditorContext';

export function useBlockFocus(idx: string) {

  const { focusIdx, setFocusIdx } = useEditorContext();

  useEffect(() => {
    const ele = document.querySelector(
      `[data-node-idx="${idx}"]`
    ) as HTMLDivElement;
    if (!ele) return;
    if (idx !== focusIdx) {
      ele.classList.remove('block-selected');
    } else {
      ele.classList.add('block-selected');
    }

    const mouseover = (ev: MouseEvent) => {
      ev.stopPropagation();
      ele.classList.add('block-hover');
    };

    const mouseout = () => {
      ele.classList.remove('block-hover');
    };
    const click = (ev: MouseEvent) => {
      ev.stopPropagation();
      setFocusIdx(idx);
    };

    ele.addEventListener('click', click);
    ele.addEventListener('mouseover', mouseover);
    ele.addEventListener('mouseout', mouseout);
    return () => {
      ele.removeEventListener('mouseover', mouseover);
      ele.removeEventListener('mouseout', mouseout);
      ele.addEventListener('click', click);
    };
  }, [focusIdx, idx, setFocusIdx]);

}