import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Header } from '@/pages/editor/components/header';
import { useDispatch } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik } from 'formik';
import { ConfigurationPanel } from '@VisualEditor/components/ConfigurationPanel';
import { ToolPanel } from '@VisualEditor/components/ToolPanel';
import { Button, Radio } from 'antd';
import { APP_EDITOR_CONTAINER_ID } from '@/constants';
import { Editor as VisualEditor, Renderer } from '@VisualEditor';

export default function Editor() {
  const [preview, setPreview] = useState(false);
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
            <div className={styles.contentWrap}>
              <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.container}>
                  <div className={styles.switchTab}>
                    <Radio.Group
                      value={preview}
                      onChange={(e) => setPreview(e.target.value)}
                    >
                      <Radio.Button value={false}>编辑</Radio.Button>
                      <Radio.Button value={true}>预览</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className={styles.appWrap}>
                    <div className={styles.appWrapBorder}>
                      <div id={APP_EDITOR_CONTAINER_ID} className={styles.app}>
                        {preview ? <Renderer /> : <VisualEditor />}
                      </div>
                    </div>
                    {/* <SideBar /> */}
                    {/* <DialogBar /> */}
                  </div>
                </div>
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
