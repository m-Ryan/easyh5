import { useRendererContext } from '@/hooks/useRendererContext';
import { getPageIdx, getValueByIdx } from '@/utils/block';
import React, { useEffect } from 'react';
import { RenderItem } from './components/RenderItem';

export interface EditorProps {
  idx: string;
}

export function Renderer() {
  const { onAction, values, pageIndex } = useRendererContext();

  useEffect(() => {
    const action = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;
      const idx = target.getAttribute('data-node-idx');
      if (idx) {
        const block = getValueByIdx(values, idx);
        if (block?.data.action) {
          onAction(block.data.action);
        }

      }
    };

    document.addEventListener('click', action, true);

    return () => {
      document.removeEventListener('click', action, true);
    };

  }, [onAction, values]);

  return (
    <div id='VisualEditorRenderMode' style={{ width: '100%', height: '100%' }}>
      <RenderItem idx={getPageIdx(pageIndex)} />
    </div>
  );
}
