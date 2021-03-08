import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@example/store/template';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import { Formik } from 'formik';
import { useQuery } from '@example/hooks/useQuery';
import { Loading } from '@example/components/loading';
import { TemplateContent } from './components/TemplateContent';

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

    return templateData ? JSON.parse((JSON.stringify(templateData))) : null;
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
