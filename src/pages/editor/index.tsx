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
import { Stack } from '@/components/Stack';
import { cloneDeep } from 'lodash';

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

  const initialValues = useMemo(() => {
    // because redux object is not extensible
    return templateData ? cloneDeep(templateData) : null;
  }, [templateData]);

  if (!initialValues) return null;
  console.log('initialValues', initialValues);
  return (

    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSave}
    >
      {
        ({
          handleSubmit,
        }) => (
          <div className={styles.container}>
            <Header backUrl="/" title={initialValues.title}
              extra={(
                <>
                  <Button type="primary" onClick={() => setPreview(p => !p)}> {preview ? '取消预览' : '预览'}</Button>
                  <Button loading={isSubmitting} type="primary" onClick={() => handleSubmit()}>保存</Button>
                </>
              )}
            />
            <div className={styles.wrap}>
              <Stack.Item fill>
                <Stack distribution="equalSpacing">
                  <div className={styles.leftMenu}>
                    <ToolPanel />
                  </div>
                  <Stack.Item fill>

                    <Stack alignment="center" distribution="center">
                      <div className={styles.content}>
                        {preview ? <Renderer /> : <VisualEditor />}
                      </div>
                    </Stack>
                  </Stack.Item>
                  <div className={styles.rightMenu}>
                    <ConfigurationPanel />
                  </div>
                </Stack>
              </Stack.Item>
            </div>

          </div>
        )
      }
    </Formik>

  );
}
