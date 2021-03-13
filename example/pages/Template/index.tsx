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

const pageWidth = 375;
const pageMaxWidth = 480;
export default function Template() {
  const dispatch = useDispatch();
  const templateData = useAppSelector('template');
  const { id } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  useEffect(() => {
    if (id) {
      dispatch(template.actions.fetchById(+id));
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

  }, [dispatch, id]);

  useEffect(() => {

    const standard = 100 * 100 / pageWidth;

    if (window.innerWidth > pageMaxWidth) {
      document.documentElement.style.fontSize = standard * pageMaxWidth / window.innerWidth + 'vw';
    } else {
      document.documentElement.style.fontSize = standard + 'vw';
    }

    return () => {
      document.documentElement.style.fontSize = 'normal';
    };
  }, []);

  const initialValues: { title: string; picture: string, content: IPage[]; } | null = useMemo(() => {
    if (!templateData) return null;
    // because redux object is not extensible

    const content = templateData ? JSON.parse(unitConver((JSON.stringify(templateData.content)), {
      originUnit: 'px',
      replaceUnit: 'rem',
      precision: 2,
      times: 0.01
    })) : [];

    return {
      title: templateData.title,
      picture: templateData.picture,
      content: content,
    };
  }, [templateData]);

  if (!initialValues) return null;

  return (

    <div style={{ height: '100vh', width: '100%', backgroundColor: '#555', margin: '0 auto' }}>
      <Loading loading={loading}>
        <TemplateRenderProvider
          data={initialValues}
        >
          <Renderer />
        </TemplateRenderProvider>
      </Loading>
    </div>

  );
}
