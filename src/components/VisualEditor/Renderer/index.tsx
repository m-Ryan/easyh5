import { useRendererContext } from '@VisualEditor/hooks/useRendererContext';
import React, { useEffect } from 'react';
import { RenderItem } from './components/RenderItem';

export interface EditorProps {
  idx: string;
}

export function Renderer() {
  const { getValueByIdx, onAction, pageValue } = useRendererContext();
  const { pageWidth, pageMaxWidth, enabled: h5Enabled } = pageValue.data.value.h5;

  useEffect(() => {
    const action = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;
      const idx = target.getAttribute('data-node-idx');
      if (idx) {
        const block = getValueByIdx(idx);
        if (block?.data.action) {
          onAction(block.data.action);
        }

      }
    };

    document.addEventListener('click', action, true);

    return () => {
      document.removeEventListener('click', action, true);
    };

  }, [getValueByIdx, onAction]);

  useEffect(() => {
    if (!h5Enabled) return;

    const standard = 100 * 100 / pageWidth;

    if (window.innerWidth > pageMaxWidth) {
      document.documentElement.style.fontSize = standard * pageMaxWidth / window.innerWidth + 'vw';
    } else {
      document.documentElement.style.fontSize = standard + 'vw';
    }

    return () => {
      document.documentElement.style.fontSize = 'normal';
    };
  }, [h5Enabled, pageMaxWidth, pageWidth]);

  return (
    <div id='VisualEditorRenderMode' data-h5={h5Enabled} style={{ width: '100%', height: '100%', maxWidth: pageMaxWidth, margin: '0 auto' }}>
      <RenderItem idx={'content.[0]'} />
    </div>
  );
}
