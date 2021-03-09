
import { ITemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { Formik } from 'formik';
import { isFunction } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';
import { EditorFrame } from '../EditorFrame';

export interface VisualEditorProviderProps<T extends ITemplate = any> {
  data: T;
  onSubmit: (data: VisualEditorProps) => void;
  children: ((params: { handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void; }) => ReactNode) | ReactNode;
  uploadHandler: VisualEditorProps['props']['uploadHandler'];
}

export interface VisualEditorProps {
  pages: IPage[];
  pageIndex: number;
  focusIdx: string;
  dialogUid: string;
  variableMap: { [key: string]: any; };
  actionMap: { [key: string]: any; };
  props: {
    uploadHandler: (file: File) => Promise<string>;
  };
}

export const VisualEditorProvider = (props: VisualEditorProviderProps) => {

  const { data, onSubmit, uploadHandler } = props;

  const initialValues = useMemo(() => {
    return {
      pages: data,
      pageIndex: 0,
      focusIdx: getPageIdx(0),
      dialogUid: '',
      variableMap: {},
      actionMap: {},
      props: {
        uploadHandler
      }
    };
  }, [data, uploadHandler]);

  return (
    <Formik<VisualEditorProps> initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <EditorFrame>
          {
            isFunction(props.children) ? props.children({ handleSubmit }) : props.children
          }
        </EditorFrame>

      )}
    </Formik>

  );
};