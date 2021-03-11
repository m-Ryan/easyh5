
import { ITemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { Formik } from 'formik';
import React, { ReactNode, useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';

export interface TemplateRenderProviderProps<T extends ITemplate = any> {
  data: T;
  children: ((params: { handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void; }) => ReactNode) | ReactNode;
}

export interface TemplateRenderProps {
  pages: IPage[];
  pageIndex: number;
  focusIdx: string;
  dialogUid: string;
  variableMap: { [key: string]: any; };
  actionMap: { [key: string]: any; };
  props: {

  };
  temporary: { [key: string]: any; };
}

export const TemplateRenderProvider = (props: TemplateRenderProviderProps) => {

  const { data } = props;

  const initialValues = useMemo(() => {
    return {
      pages: data,
      pageIndex: 0,
      focusIdx: getPageIdx(0),
      dialogUid: '',
      variableMap: {},
      actionMap: {},
      props: {

      },
      temporary: {

      }
    };
  }, [data]);

  return (
    <Formik<TemplateRenderProps> initialValues={initialValues} enableReinitialize onSubmit={() => { }}>
      {props.children}
    </Formik>

  );
};