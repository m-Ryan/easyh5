import { useRendererContext } from '@VisualEditor/hooks/useRendererContext';
import React, { useEffect } from 'react';
import { RenderItem } from './components/RenderItem';

export interface EditorProps {
  idx: string;
}

export function Renderer() {
  const { getValueByIdx } = useRendererContext();

  useEffect(() => {
    const action = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;
      const idx = target.getAttribute('data-node-idx');
      if (idx) {
        const block = getValueByIdx(idx);
        console.log(block?.data.action);
      }
    };

    document.addEventListener('click', action, true);

    return () => {
      document.removeEventListener('click', action, true);
    };

  }, [getValueByIdx]);

  return (
    <div id='VisualEditorRenderMode '>
      <RenderItem idx={'content.[0]'} />
    </div>
  );
}
