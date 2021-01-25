import React, { useCallback, useEffect } from 'react';
import styles from './index.module.scss';
import { Header } from '@/pages/editor/components/header';
import { ComponentMenu } from '@/pages/editor/components/component-menu';
import { ConfigMenu } from '@/pages/editor/components/config-menu';
import { getLocationParamValue } from '@/util/utils';
// import { useSelector } from '@/modal';
import { useTemplete } from '@/components/react-use/useTemplete';
import { AppContainer } from '@/components/templete';
import { useSetEditorDocumentSize } from '@/components/react-use/useSetEditorDocumentSize';
import { useDispatch, useSelector } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik } from 'formik';

export default function Editor() {
  const dispatch = useDispatch();

  const templateData = useAppSelector('template');
  const loading = useLoading(template.loadings.fetchById);
  console.log(templateData);

  // const { setTarget, focusElement, focusId, initData } = useSelector('article');

  // useSetEditorDocumentSize();

  // useTemplete(getLocationParamValue('id'), true);

  // const onSetBulr = useCallback(async () => {
  //   setTarget('')
  // }, [setTarget]);

  useEffect(() => {
    dispatch(template.actions.fetchById(420));
  }, []);

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
              <ComponentMenu />
            </div>
            <div className={styles.contentWrap} >
              <div className={styles.content} onClick={e => e.stopPropagation()}>
                {<AppContainer loading={loading} />}
              </div>
            </div>
            <div className={styles.rightMenu}>
              {/* {focusElement && <ConfigMenu target={focusElement} key={focusId} />} */}
            </div>
          </div>
        </div>

      )}
    </Formik>

  );


}

