import { useRendererContext } from '@/hooks/useRendererContext';
import { getPageIdx, getValueByIdx } from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import React, { useEffect } from 'react';
import { RenderItem } from './components/RenderItem';

export interface EditorProps {
  idx: string;
}

export function Renderer() {
  const { pageIndex } = useRendererContext();

  return (
    <div id='VisualEditorRenderMode' style={{ width: '100%', height: '100%' }}>
      <RenderItem idx={getPageIdx(pageIndex)} />
    </div>
  );
}
