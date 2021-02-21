import { findBlockNode } from '@VisualEditor/utils/findBlockNode';
import { useEffect } from 'react';
import { useEditorContext } from './useEditorContext';

export function useBlockFocus() {

  const { focusIdx, setFocusIdx } = useEditorContext();

  useEffect(() => {
    const blocksEle = [...document.querySelectorAll('[data-node-idx]')] as HTMLDivElement[];
    blocksEle.forEach(ele => {
      ele.classList.remove('block-selected');
      if (ele.getAttribute('data-node-idx') === focusIdx) {
        ele.classList.add('block-selected');
      }
    });
  }, [focusIdx]);

  useEffect(() => {

    const mouseover = (ev: MouseEvent) => {
      ev.stopPropagation();
      findBlockNode(ev.target as Element)?.classList.add('block-hover');
    };

    const mouseout = (ev: MouseEvent) => {
      findBlockNode(ev.target as Element)?.classList.remove('block-hover');
    };

    const click = (ev: MouseEvent) => {

      const idx = findBlockNode(ev.target as Element)?.getAttribute('data-node-idx');
      if (idx) {
        setFocusIdx(idx);
      }
    };

    const container = document.getElementById('VisualEditorEditMode');
    if (!container) return;

    container.addEventListener('click', click);
    container.addEventListener('mouseover', mouseover);
    container.addEventListener('mouseout', mouseout);
    return () => {
      container.removeEventListener('mouseover', mouseover);
      container.removeEventListener('mouseout', mouseout);
      container.removeEventListener('click', click);
    };
  }, [setFocusIdx]);

}