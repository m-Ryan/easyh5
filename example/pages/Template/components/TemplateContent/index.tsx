import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Editor as VisualEditor, Renderer, useRendererContext } from '@/index';

export function TemplateContent() {
  const dispatch = useDispatch();
  const { setVariable } = useRendererContext();

  useEffect(() => {
    setVariable({
      'user-nickname': 'Ryan mao'
    });
  }, [setVariable]);

  return <Renderer />;
}
