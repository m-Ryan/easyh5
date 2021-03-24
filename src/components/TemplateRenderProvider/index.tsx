import { ITemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { Formik } from 'formik';
import React, { ReactNode, useMemo } from 'react';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { IPage } from '../core/blocks/basic/Page';

export interface TemplateRenderProviderProps<T extends ITemplate = ITemplate> {
  data: T;
  children:
    | ((params: {
        handleSubmit: (
          e?: React.FormEvent<HTMLFormElement> | undefined
        ) => void;
      }) => ReactNode)
    | ReactNode;
}

export interface TemplateRenderProps {
  title: string;
  picture: string;
  pages: IPage[];
  pageIndex: number;
  focusIdx: string;
  dialogUid: string;
  variableMap: { [key: string]: any };
  actionMap: { [key: string]: any };
  props: {};
  temporary: { [key: string]: any };
}

export const TemplateRenderProvider = (props: TemplateRenderProviderProps) => {
  // 设置响应式
  useResponsiveSize();

  const { data } = props;

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
      props: {},
      temporary: {},
    };
  }, [data]);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <Formik<TemplateRenderProps>
        initialValues={initialValues}
        enableReinitialize
        onSubmit={() => {}}
      >
        {props.children}
      </Formik>
    </div>
  );
};
