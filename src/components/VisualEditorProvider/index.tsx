import { ITemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';

import { Formik } from 'formik';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';

export interface VisualEditorProviderProps<T extends ITemplate = any> {
  data: T;
  onSubmit: (data: VisualEditorProps) => void;
  children:
    | ((params: {
        handleSubmit: (
          e?: React.FormEvent<HTMLFormElement> | undefined
        ) => void;
      }) => ReactNode)
    | ReactNode;
  uploadHandler: VisualEditorProps['props']['uploadHandler'];
}

export interface VisualEditorProps {
  title: string;
  picture: string;
  pages: IPage[];
  pageIndex: number;
  focusIdx: string;
  dialogUid: string;
  variableMap: { [key: string]: any };
  actionMap: { [key: string]: any };
  props: {
    uploadHandler: (file: File) => Promise<string>;
  };
}

export const VisualEditorProvider = (
  props: VisualEditorProviderProps<ITemplate>
) => {
  // 设置响应式
  useEffect(() => {
    const pageWidth = 375;
    const pageMaxWidth = 375;

    const standard = (100 * 100) / pageWidth;
    if (window.innerWidth > pageMaxWidth) {
      document.documentElement.style.fontSize =
        (standard * pageMaxWidth) / window.innerWidth + 'vw';
    } else {
      document.documentElement.style.fontSize = standard + 'vw';
    }

    return () => {
      document.documentElement.style.fontSize = 'normal';
    };
  }, []);

  const { data, onSubmit, uploadHandler } = props;

  const initialValues = useMemo(() => {
    return {
      title: data.title,
      picture: data.picture,
      pages: data.content,
      pageIndex: 0,
      focusIdx: getPageIdx(0),
      dialogUid: '',
      variableMap: {},
      actionMap: {},
      props: {
        uploadHandler,
      },
    };
  }, [data, uploadHandler]);

  if (!initialValues.pages[0]) return null;
  return (
    <Formik<VisualEditorProps>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {props.children}
    </Formik>
  );
};
