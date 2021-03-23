
import { ITemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { Loading } from '@example/components/loading';
import { Formik } from 'formik';
import React, { ReactNode, useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';

export interface VisualEditorProviderProps<T extends ITemplate = any> {
  data: T;
  onSubmit: (data: VisualEditorProps) => void;
  children: ((params: { handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void; }) => ReactNode) | ReactNode;
  uploadHandler: VisualEditorProps['props']['uploadHandler'];
}

export interface VisualEditorProps {
  title: string;
  picture: string;
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

export const VisualEditorProvider = (props: VisualEditorProviderProps<ITemplate>) => {

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
        uploadHandler
      }
    };
  }, [data, uploadHandler]);

  return (
    <Loading loading={!initialValues.pages[0]}>
      <Formik<VisualEditorProps> initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
        {props.children}
      </Formik>
    </Loading>

  );
};