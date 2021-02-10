import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Header } from '@/components/Header';
import { useDispatch } from 'react-redux';
import template, { ITemplate } from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik, FormikHelpers } from 'formik';
import { ConfigurationPanel } from '@VisualEditor/components/ConfigurationPanel';
import { ToolPanel } from '@VisualEditor/components/ToolPanel';
import { Button, message, Radio } from 'antd';
import { APP_EDITOR_CONTAINER_ID } from '@/constants';
import { Editor as VisualEditor, Renderer } from '@VisualEditor';
import { useQuery } from '@/hooks/useQuery';
import { useHistory } from 'react-router-dom';

export default function Editor() {
  const [preview, setPreview] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const { id } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const isSubmitting = useLoading([template.loadings.create, template.loadings.updateById]);

  useEffect(() => {
    if (id) {
      dispatch(template.actions.fetchById(+id));
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

  }, [dispatch, id]);

  const onSave = useCallback((values: ITemplate, formikHelpers: FormikHelpers<ITemplate>) => {
    if (id) {
      dispatch(template.actions.updateById({
        id: +id,
        template: values,
        success() {
          message.success('更新成功');
        }
      }));
    } else {
      dispatch(template.actions.create({
        template: values,
        success(templateId) {
          history.replace(`/editor?id=${templateId}`);
          message.success('创建成功');
        }
      }));
    }
  }, [dispatch, history, id]);

  if (!templateData) return null;

  return (

    <Formik
      initialValues={templateData}
      enableReinitialize
      onSubmit={onSave}
    >
      {({
        handleSubmit,
      }) => (
        <div className={styles.container}>
          <Header backUrl="/" title={templateData.title}
            extra={(
              <>
                <Button type="primary" onClick={() => setPreview(p => !p)}> {preview ? '取消预览' : '预览'}</Button>
                <Button loading={isSubmitting} type="primary" onClick={() => handleSubmit()}>保存</Button>
              </>
            )}
          />
          <div className={styles.wrap}>
            <div className={styles.leftMenu}>
              <ToolPanel />
            </div>
            <div className={styles.contentWrap}>
              <div
                className={styles.content}
              >
                <div className={styles.container}>

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
