import { Renderer } from '@VisualEditor/Renderer';
import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import { EDITOR_VALUE_CHANGE } from '@VisualEditor/constants';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export const Preview = withFormik({
  handleSubmit: () => { },
  mapPropsToValues: () => ({}),
})(() => {

  const { setFormikState, values } = useEditorContext();

  const visualEditorData = window.parent.__SHARE_DATA__?.VisualEditor.value;

  useEffect(() => {

    const onMessage = (params: { data: { type: string; }; }) => {
      if (params.data.type === EDITOR_VALUE_CHANGE) {
        setFormikState((formikState) => {
          formikState.values = visualEditorData;
          return { ...formikState };
        });
      }

    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [setFormikState, visualEditorData]);

  if (!values || Object.keys(values).length === 0) return null;

  return <Renderer />;
});

