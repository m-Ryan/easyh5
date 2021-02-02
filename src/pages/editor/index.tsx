import React, { useCallback, useEffect } from 'react';
import styles from './index.module.scss';
import { Header } from '@/pages/editor/components/header';
import { AppContainer } from '@VisualEditor';
import { useDispatch } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik } from 'formik';
import { ConfigurationPanel } from '@VisualEditor/components/ConfigurationPanel';
import { ToolPanel } from '@VisualEditor/components/ToolPanel';

export default function Editor() {
  const dispatch = useDispatch();

  const templateData = useAppSelector('template');
  const loading = useLoading(template.loadings.fetchById);

  useEffect(() => {
    dispatch(template.actions.fetchById(420));
  }, [dispatch]);

  if (!templateData) return null;

  return (
    <Formik
      initialValues={templateData}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <div className={styles.container}>
          <Header />
          <div className={styles.wrap}>
            <div className={styles.leftMenu}>
              <ToolPanel />
            </div>
            <div className={styles.contentWrap} >
              <div className={styles.content} onClick={e => e.stopPropagation()}>
                {<AppContainer loading={loading} />}
              </div>
            </div>
            <div className={styles.rightMenu}>
              <ConfigurationPanel />
            </div>
          </div>
        </div>

      )}
    </Formik>

  );


}

