import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@example/store/template';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import { useQuery } from '@example/hooks/useQuery';
import { Loading } from '@example/components/loading';
import { IPage } from '@/components/core/blocks/basic/Page';
import { TemplateRenderProvider } from '@/components/TemplateRenderProvider';
import { Renderer } from '@/index';
import { unitConver } from '@/utils/unitConver';
import { message } from 'antd';
import { CommonEffect } from './CommonEffect';

const BasicTemplate: React.FC = (props) => {
  const dispatch = useDispatch();
  const templateData = useAppSelector('template');
  const { id } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  useEffect(() => {
    if (id) {
      dispatch(template.actions.fetchById(+id));
    } else {
      message.error('缺少id');
    }
  }, [dispatch, id]);

  // 转换px为rem
  const initialValues: {
    title: string;
    picture: string;
    content: IPage[];
  } | null = useMemo(() => {
    if (!templateData) return null;

    const content = templateData
      ? JSON.parse(
          unitConver(JSON.stringify(templateData.content), {
            originUnit: 'px',
            replaceUnit: 'rem',
            precision: 2,
            times: 0.01,
          })
        )
      : [];

    return {
      title: templateData.title,
      picture: templateData.picture,
      content: content,
    };
  }, [templateData]);

  if (!initialValues) return null;

  if (loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundColor: '#555',
          margin: '0 auto',
        }}
      >
        <TemplateRenderProvider data={initialValues}>
          <>
            <Renderer />
            <CommonEffect />
            {props.children}
          </>
        </TemplateRenderProvider>
      </div>
    </>
  );
};

export default function withTemplate(Com: React.FC) {
  return (props: any) => {
    return (
      <BasicTemplate>
        <Com {...props} />
      </BasicTemplate>
    );
  };
}
