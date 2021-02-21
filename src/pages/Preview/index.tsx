import { Renderer } from '@VisualEditor/Renderer';
import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import { ITemplate } from '@/store/template';
import { Bridge } from '@VisualEditor/utils/Bridge';
import { BridgeEvent } from '@VisualEditor/constants';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export const Preview = withFormik({
  handleSubmit: () => { },
  mapPropsToValues: () => ({}),
})(() => {

  const { setValues, values } = useEditorContext();

  useEffect(() => {
    Bridge.emitToEditor(BridgeEvent.PREVIEW_INITED, true);
  }, []);

  useEffect(() => {

    const onMessage = (ev: { type: BridgeEvent, data: ITemplate; }) => {
      setValues(ev.data);

    };
    Bridge.on(BridgeEvent.EDITOR_VALUE_CHANGE, onMessage);

    return () => {
      Bridge.off(BridgeEvent.EDITOR_VALUE_CHANGE, onMessage);
    };
  }, [setValues]);

  if (!values || Object.keys(values).length === 0) return null;

  return <Renderer />;
});

