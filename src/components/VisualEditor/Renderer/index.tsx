import React from 'react';
import { RenderItem } from './components/RenderItem';

export interface EditorProps {
  idx: string;
}

export function Renderer() {
  return (
    <div id='VisualEditorRenderMode '>
      <RenderItem idx={'content.[0]'} />
    </div>
  );
}
