import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik } from 'formik';
import { useQuery } from '@/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { Loading } from '@/components/loading';
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

  if (!templateData) return null;

  return (

    <Loading loading={loading}>
      <Formik
        initialValues={templateData}
        enableReinitialize
        onSubmit={() => { }}
      >
        <TemplateContent />
      </Formik>
    </Loading>

  );
}
