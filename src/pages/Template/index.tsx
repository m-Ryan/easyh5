import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik } from 'formik';
import { useQuery } from '@/hooks/useQuery';
import { Loading } from '@/components/loading';
import { TemplateContent } from './components/TemplateContent';
import { unitConver } from '@/../VisualEditor/utils/unitConver';

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

  const initialValues = useMemo(() => {

    return templateData ? JSON.parse(unitConver((JSON.stringify(templateData)), {
      originUnit: 'px',
      replaceUnit: 'rem',
      precision: 2,
      times: 0.01
    })) : null;
  }, [templateData]);

  if (!initialValues) return null;

  return (

    <Loading loading={loading}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={() => { }}
      >
        <TemplateContent />
      </Formik>
    </Loading>

  );
}
